
package com.healthhub.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patient", indexes = @Index(name = "idx_patient_email", columnList = "email"))
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private int age;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Appointment> appointments = new ArrayList<>();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }


    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }


    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public List<Appointment> getAppointments() { return appointments; }
    public void setAppointments(List<Appointment> appointments) { this.appointments = appointments; }
}
