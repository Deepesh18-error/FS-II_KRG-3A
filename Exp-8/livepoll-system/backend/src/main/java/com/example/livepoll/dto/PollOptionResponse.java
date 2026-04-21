package com.example.livepoll.dto;

public class PollOptionResponse {
    private Long id;
    private String optionText;
    private long voteCount;

    public PollOptionResponse() {}

    public PollOptionResponse(Long id, String optionText, long voteCount) {
        this.id = id;
        this.optionText = optionText;
        this.voteCount = voteCount;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getOptionText() { return optionText; }
    public void setOptionText(String optionText) { this.optionText = optionText; }
    public long getVoteCount() { return voteCount; }
    public void setVoteCount(long voteCount) { this.voteCount = voteCount; }
}
