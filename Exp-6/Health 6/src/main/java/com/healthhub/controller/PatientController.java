
package com.healthhub.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.healthhub.dto.PatientDTO;
import com.healthhub.service.PatientService;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService service;

    public PatientController(PatientService service){
        this.service = service;
    }

    @PostMapping
    public PatientDTO create(@Validated @RequestBody PatientDTO dto){
        return service.createPatient(dto);
            // return ResponseEntity
            // .status(HttpStatus.CREATED)
            // .body(savedPatient)
    }

    @GetMapping
    public List<PatientDTO> getAll(){
        return service.getAllPatients();
    }

    @GetMapping("/{id}")
    public PatientDTO getOne(@PathVariable Long id){
        return service.getPatient(id);
    }

    @PutMapping("/{id}")
    public PatientDTO update(@PathVariable Long id, @RequestBody PatientDTO dto){
        return service.updatePatient(id,dto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        service.deletePatient(id);
        return "Deleted successfully";
    }
}
