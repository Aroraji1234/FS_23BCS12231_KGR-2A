package com.project.certificate_genrator.repository;

import com.project.certificate_genrator.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}