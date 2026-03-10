
package com.healthhub.service;

import java.util.List;
import com.healthhub.dto.PatientDTO;

public interface PatientService {

    PatientDTO createPatient(PatientDTO dto);
    List<PatientDTO> getAllPatients();
    PatientDTO getPatient(Long id);
    PatientDTO updatePatient(Long id, PatientDTO dto);
    void deletePatient(Long id);
}
