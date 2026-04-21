package com.example.livepoll.repository;

import com.example.livepoll.entity.Poll;
import com.example.livepoll.entity.User;
import com.example.livepoll.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByPollAndUser(Poll poll, User user);
}
