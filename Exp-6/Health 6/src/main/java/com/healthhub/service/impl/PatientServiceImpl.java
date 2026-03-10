
package com.healthhub.service.impl;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.healthhub.dto.PatientDTO;
import com.healthhub.model.Patient;
import com.healthhub.repository.PatientRepository;
import com.healthhub.service.PatientService;

@Service
public class PatientServiceImpl implements PatientService {

    private final PatientRepository repo;

    public PatientServiceImpl(PatientRepository repo) {
        this.repo = repo;

    }

    private PatientDTO mapToDTO(Patient p){


        PatientDTO dto = new PatientDTO();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setEmail(p.getEmail());
        dto.setAge(p.getAge());
        return dto;


    }

    private Patient mapToEntity(PatientDTO dto){
        Patient p = new Patient();
        p.setId(dto.getId());
        p.setName(dto.getName());

        p.setEmail(dto.getEmail());
        p.setAge(dto.getAge());
        return p;
    }

    public PatientDTO createPatient(PatientDTO dto){
        return mapToDTO(repo.save(mapToEntity(dto)));
    }

    public List<PatientDTO> getAllPatients(){

        return repo.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }



    public PatientDTO getPatient(Long id){
        return repo.findById(id).map(this::mapToDTO).orElseThrow();
    }

    public PatientDTO updatePatient(Long id, PatientDTO dto){


        Patient p = repo.findById(id).orElseThrow();
        p.setName(dto.getName());
        p.setEmail(dto.getEmail());
        p.setAge(dto.getAge());

        return mapToDTO(repo.save(p));



    }

    public void deletePatient(Long id){
         repo.deleteById(id);
    }
}
