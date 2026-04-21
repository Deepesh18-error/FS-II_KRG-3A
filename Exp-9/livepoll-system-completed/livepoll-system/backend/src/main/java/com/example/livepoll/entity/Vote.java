package com.example.livepoll.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.LocalDateTime;

@Entity
@Table(name = "votes",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"poll_id", "user_id"})
        },
        indexes = {
                @Index(name = "idx_vote_poll", columnList = "poll_id"),
                @Index(name = "idx_vote_user", columnList = "user_id")
        })
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "poll_id")
    private Poll poll;

    @ManyToOne
    @JoinColumn(name = "option_id")
    private PollOption option;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime votedAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Poll getPoll() { return poll; }
    public void setPoll(Poll poll) { this.poll = poll; }
    public PollOption getOption() { return option; }
    public void setOption(PollOption option) { this.option = option; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDateTime getVotedAt() { return votedAt; }
    public void setVotedAt(LocalDateTime votedAt) { this.votedAt = votedAt; }
}
