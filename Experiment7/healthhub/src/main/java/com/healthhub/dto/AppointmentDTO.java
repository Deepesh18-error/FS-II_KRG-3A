package com.healthhub.dto;

import java.time.LocalDateTime;

public class AppointmentDTO {
    private Long id;
    private LocalDateTime appointmentDate;
    private String description;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDateTime getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDateTime appointmentDate) { this.appointmentDate = appointmentDate; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}