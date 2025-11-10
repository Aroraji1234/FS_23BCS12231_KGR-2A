package com.project.certificate_genrator.repository;

import com.project.certificate_genrator.model.CertificateLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificateLogRepository extends JpaRepository<CertificateLog, Long> {
}