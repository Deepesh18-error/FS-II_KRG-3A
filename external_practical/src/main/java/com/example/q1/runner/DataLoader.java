package com.example.external_practical.runner;

import com.example.external_practical.entity.Department;
import com.example.external_practical.entity.Employee;
import com.example.external_practical.repository.DepartmentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {

    private final DepartmentRepository departmentRepository;

    public DataLoader(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public void run(String... args) {
        Department dept = new Department();
        dept.setName("IT");

        Employee e1 = new Employee();
        e1.setName("Alice");
        e1.setDepartment(dept);

        Employee e2 = new Employee();
        e2.setName("Bob");
        e2.setDepartment(dept);

        dept.setEmployees(Arrays.asList(e1, e2));

        departmentRepository.save(dept);
    }
}