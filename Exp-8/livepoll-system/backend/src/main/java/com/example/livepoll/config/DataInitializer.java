package com.example.livepoll.config;

import com.example.livepoll.entity.Poll;
import com.example.livepoll.entity.PollOption;
import com.example.livepoll.entity.Role;
import com.example.livepoll.entity.User;
import com.example.livepoll.repository.PollRepository;
import com.example.livepoll.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedData(UserRepository userRepository, PollRepository pollRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByEmail("admin@livepoll.com")) {
                User admin = new User();
                admin.setName("Admin User");
                admin.setEmail("admin@livepoll.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRoles(Set.of(Role.ROLE_ADMIN));
                userRepository.save(admin);
            }

            if (!userRepository.existsByEmail("user@livepoll.com")) {
                User user = new User();
                user.setName("Demo User");
                user.setEmail("user@livepoll.com");
                user.setPassword(passwordEncoder.encode("user123"));
                user.setRoles(Set.of(Role.ROLE_USER));
                userRepository.save(user);
            }

            if (pollRepository.count() == 0) {
                User admin = userRepository.findByEmail("admin@livepoll.com").orElseThrow();
                Poll poll = new Poll();
                poll.setQuestion("Which feature matters most in a secure polling app?");
                poll.setCreatedBy(admin);

                PollOption option1 = new PollOption();
                option1.setOptionText("JWT authentication");
                option1.setPoll(poll);

                PollOption option2 = new PollOption();
                option2.setOptionText("Google OAuth login");
                option2.setPoll(poll);

                PollOption option3 = new PollOption();
                option3.setOptionText("Role-based access control");
                option3.setPoll(poll);

                poll.setOptions(List.of(option1, option2, option3));
                pollRepository.save(poll);
            }
        };
    }
}
