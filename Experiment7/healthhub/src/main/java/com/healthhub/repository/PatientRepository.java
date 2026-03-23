
package com.healthhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.healthhub.model.Patient;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    @Query("SELECT DISTINCT p FROM Patient p LEFT JOIN FETCH p.appointments")
    List<Patient> findAllWithAppointments();

    @Query("SELECT p FROM Patient p WHERE p.id > :lastId ORDER BY p.id ASC")
    List<Patient> findPatientsAfterCursor(@Param("lastId") Long lastId, Pageable pageable);
}
