package com.example.livepoll.dto;

import java.time.LocalDateTime;
import java.util.List;

public class PollResponse {
    private Long id;
    private String question;
    private boolean active;
    private String createdBy;
    private LocalDateTime createdAt;
    private List<PollOptionResponse> options;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public List<PollOptionResponse> getOptions() { return options; }
    public void setOptions(List<PollOptionResponse> options) { this.options = options; }
}
