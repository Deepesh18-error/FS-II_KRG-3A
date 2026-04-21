package com.example.livepoll.controller;

import com.example.livepoll.dto.AuthRequest;
import com.example.livepoll.dto.AuthResponse;
import com.example.livepoll.dto.RegisterRequest;
import com.example.livepoll.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/google")
    public ResponseEntity<Map<String, String>> googleLoginHint() {
        return ResponseEntity.ok(Map.of(
                "message", "Open /oauth2/authorization/google in the browser to start Google login"
        ));
    }
}
