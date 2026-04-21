package com.example.livepoll.security;

import com.example.livepoll.entity.Role;
import com.example.livepoll.entity.User;
import com.example.livepoll.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Set;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public OAuth2LoginSuccessHandler(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String email = oauth2User.getAttribute("email");
        String name = oauth2User.getAttribute("name");

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name == null ? email : name);
            newUser.setProvider("GOOGLE");
            newUser.setRoles(Set.of(Role.ROLE_USER));
            return userRepository.save(newUser);
        });

        org.springframework.security.core.userdetails.UserDetails principal =
                org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                        .password(user.getPassword() == null ? "oauth-user" : user.getPassword())
                        .authorities(user.getRoles().stream().map(Enum::name).toArray(String[]::new))
                        .build();

        String token = jwtService.generateToken(principal);

        String redirectUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/oauth-success")
                .queryParam("token", token)
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
