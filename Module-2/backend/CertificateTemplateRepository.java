package com.project.certificate_genrator.repository;

import com.project.certificate_genrator.model.CertificateTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificateTemplateRepository extends JpaRepository<CertificateTemplate, Long> {
}