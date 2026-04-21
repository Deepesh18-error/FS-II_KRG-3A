package com.example.livepoll.controller;

import com.example.livepoll.dto.PollResponse;
import com.example.livepoll.dto.VoteRequest;
import com.example.livepoll.service.PollService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/polls")
public class PollController {

    private final PollService pollService;

    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

    @GetMapping
    public ResponseEntity<List<PollResponse>> listPolls() {
        return ResponseEntity.ok(pollService.getAllPolls());
    }

    @GetMapping("/{pollId}")
    public ResponseEntity<PollResponse> getPoll(@PathVariable Long pollId) {
        return ResponseEntity.ok(pollService.getPoll(pollId));
    }

    @PostMapping("/{pollId}/vote")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<PollResponse> vote(@PathVariable Long pollId,
                                             @Valid @RequestBody VoteRequest request,
                                             Authentication authentication) {
        return ResponseEntity.ok(pollService.vote(pollId, request, authentication.getName()));
    }
}
