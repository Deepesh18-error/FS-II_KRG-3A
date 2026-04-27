package com.example.est2.controller;



import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class AuthController {

    private static final String USERNAME = "admin";
    private static final String PASSWORD = "admin123";
    public static final String TOKEN = "my-hardcoded-jwt-token";

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {

        String username = body.get("username");
        String password = body.get("password");

        if (USERNAME.equals(username) && PASSWORD.equals(password)) {
            return ResponseEntity.ok(Map.of("token", TOKEN));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid credentials");
    }

    // test endpoint
    @GetMapping("/hello")
    public String hello() {
        return "Hello, authenticated user!";
    }
}