package com.example.est.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.est.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}