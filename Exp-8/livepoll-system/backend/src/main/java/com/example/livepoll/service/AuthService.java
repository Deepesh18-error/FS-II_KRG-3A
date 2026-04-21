package com.example.livepoll.service;

import com.example.livepoll.dto.AuthRequest;
import com.example.livepoll.dto.AuthResponse;
import com.example.livepoll.dto.RegisterRequest;
import com.example.livepoll.entity.Role;
import com.example.livepoll.entity.User;
import com.example.livepoll.exception.BadRequestException;
import com.example.livepoll.repository.UserRepository;
import com.example.livepoll.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }

        Role role = "ADMIN".equalsIgnoreCase(request.getRequestedRole()) ? Role.ROLE_ADMIN : Role.ROLE_USER;

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles(Set.of(role));

        userRepository.save(user);

        var principal = org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(user.getRoles().stream().map(Enum::name).toArray(String[]::new))
                .build();

        String token = jwtService.generateToken(principal);
        return new AuthResponse(token, user.getName(), user.getEmail(), mapRoles(user));
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        var principal = org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                .password(user.getPassword() == null ? "" : user.getPassword())
                .authorities(user.getRoles().stream().map(Enum::name).toArray(String[]::new))
                .build();

        String token = jwtService.generateToken(principal);
        return new AuthResponse(token, user.getName(), user.getEmail(), mapRoles(user));
    }

    private Set<String> mapRoles(User user) {
        return user.getRoles().stream().map(Enum::name).collect(Collectors.toSet());
    }
}
