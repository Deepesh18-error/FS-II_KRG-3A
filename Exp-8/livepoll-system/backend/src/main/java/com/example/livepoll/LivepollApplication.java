package com.example.livepoll;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableMethodSecurity
public class LivepollApplication {

    public static void main(String[] args) {
        SpringApplication.run(LivepollApplication.class, args);
    }
}
