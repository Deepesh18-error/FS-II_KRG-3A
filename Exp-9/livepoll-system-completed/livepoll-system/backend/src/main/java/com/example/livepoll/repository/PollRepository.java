package com.example.livepoll.repository;

import com.example.livepoll.entity.Poll;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PollRepository extends JpaRepository<Poll, Long> {
    @Override
    @EntityGraph(attributePaths = {"options", "createdBy"})
    List<Poll> findAll();

    @Override
    @EntityGraph(attributePaths = {"options", "createdBy"})
    Optional<Poll> findById(Long id);
}
