package com.example.livepoll.controller;

import com.example.livepoll.dto.PollCreateRequest;
import com.example.livepoll.dto.PollResponse;
import com.example.livepoll.service.PollService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/polls")
@PreAuthorize("hasRole('ADMIN')")
public class AdminPollController {

    private final PollService pollService;

    public AdminPollController(PollService pollService) {
        this.pollService = pollService;
    }

    @PostMapping
    public ResponseEntity<PollResponse> createPoll(@Valid @RequestBody PollCreateRequest request,
                                                   Authentication authentication) {
        return ResponseEntity.ok(pollService.createPoll(request, authentication.getName()));
    }

    @PostMapping("/{pollId}/toggle")
    public ResponseEntity<PollResponse> togglePoll(@PathVariable Long pollId) {
        return ResponseEntity.ok(pollService.togglePoll(pollId));
    }
}
