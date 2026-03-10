
package com.healthhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.healthhub.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
