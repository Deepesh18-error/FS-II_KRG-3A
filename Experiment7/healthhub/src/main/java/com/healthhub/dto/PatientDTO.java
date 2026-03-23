package com.healthhub.dto;

import java.util.List;

public class PatientDTO {
    private Long id;
    private String name;
    private String email;
    private int age;
    private List<AppointmentDTO> appointments;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public List<AppointmentDTO> getAppointments() { return appointments; }
    public void setAppointments(List<AppointmentDTO> appointments) { this.appointments = appointments; }
}