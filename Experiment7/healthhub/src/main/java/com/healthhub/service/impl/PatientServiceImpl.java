
package com.healthhub.service.impl;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.healthhub.dto.PatientDTO;
import com.healthhub.dto.AppointmentDTO;
import com.healthhub.model.Patient;
import com.healthhub.repository.PatientRepository;
import com.healthhub.service.PatientService;
import org.springframework.data.domain.PageRequest;

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

        if (p.getAppointments() != null) {
            List<AppointmentDTO> apptDtos = p.getAppointments().stream().map(appt -> {
                AppointmentDTO apptDto = new AppointmentDTO();
                apptDto.setId(appt.getId());
                apptDto.setAppointmentDate(appt.getAppointmentDate());
                apptDto.setDescription(appt.getDescription());
                return apptDto;
            }).collect(Collectors.toList());
            dto.setAppointments(apptDtos);
        }
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

    // Uses JOIN FETCH to avoid N+1 problem
    public List<PatientDTO> getAllPatientsWithAppointments(){
        return repo.findAllWithAppointments().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Cursor-based pagination implementation
    public List<PatientDTO> getPatientsCursor(Long lastId, int limit){
        return repo.findPatientsAfterCursor(lastId, PageRequest.of(0, limit))
                   .stream().map(this::mapToDTO).collect(Collectors.toList());
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
