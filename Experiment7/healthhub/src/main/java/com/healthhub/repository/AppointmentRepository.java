package com.healthhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.healthhub.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}