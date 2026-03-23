package com.healthhub.service;

import com.healthhub.dto.PatientDTO;
import java.util.List;

public interface PatientService {
    PatientDTO createPatient(PatientDTO dto);
    List<PatientDTO> getAllPatients();
    List<PatientDTO> getAllPatientsWithAppointments();
    List<PatientDTO> getPatientsCursor(Long lastId, int limit);
    PatientDTO getPatient(Long id);
    PatientDTO updatePatient(Long id, PatientDTO dto);
    void deletePatient(Long id);
}