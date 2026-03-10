
package com.healthhub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class PatientDTO {

    private Long id;

    @NotBlank(message="Name cannot be empty")
    private String name;

    @Email(message="Invalid email")
    private String email;

    @Positive(message="Age must be positive")
    private int age;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}
