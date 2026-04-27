package com.example.external_practical.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Employee> employees;

    public Department() {}

    public Department(String name, List<Employee> employees) {
        this.name = name;
        this.employees = employees;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public List<Employee> getEmployees() { return employees; }

    public void setName(String name) { this.name = name; }
    public void setEmployees(List<Employee> employees) { this.employees = employees; }
}