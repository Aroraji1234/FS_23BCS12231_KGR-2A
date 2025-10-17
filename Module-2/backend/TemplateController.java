package com.project.certificate_genrator.controller;

import com.project.certificate_genrator.model.CertificateTemplate;
import com.project.certificate_genrator.repository.CertificateTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/templates")
@CrossOrigin(origins = "http://localhost:3000")
public class TemplateController {

    @Autowired
    private CertificateTemplateRepository templateRepository;

    @PostMapping
    public CertificateTemplate createTemplate(@RequestBody CertificateTemplate template) {
        return templateRepository.save(template);
    }

    @GetMapping
    public List<CertificateTemplate> getAllTemplates() {
        return templateRepository.findAll();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTemplate(@PathVariable Long id) {
        templateRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}