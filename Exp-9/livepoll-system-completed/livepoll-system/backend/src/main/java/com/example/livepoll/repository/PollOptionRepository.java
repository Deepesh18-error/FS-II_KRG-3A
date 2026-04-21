package com.example.livepoll.repository;

import com.example.livepoll.entity.PollOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PollOptionRepository extends JpaRepository<PollOption, Long> {
}
