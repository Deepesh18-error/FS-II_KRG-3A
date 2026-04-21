package com.example.livepoll.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public class PollCreateRequest {
    @NotBlank
    private String question;

    @Size(min = 2, message = "At least two options are required")
    private List<String> options;

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }
    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }
}
