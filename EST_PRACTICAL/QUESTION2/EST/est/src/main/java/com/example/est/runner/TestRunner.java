package com.example.est.runner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.est.entity.*;
import com.example.est.repository.DepartmentRepository;

@Component
public class TestRunner implements CommandLineRunner {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public void run(String... args) {

        Department dept = new Department();
        dept.setName("IT");

        Employee e1 = new Employee();
        e1.setName("Aman");

        Employee e2 = new Employee();
        e2.setName("Rahul");

        dept.addEmployee(e1);
        dept.addEmployee(e2);

        departmentRepository.save(dept);

        System.out.println("Saved successfully (1 dept + 2 employees)");
    }
}