package com.project.certificate_genrator.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    private String username;
    private String password;
    
    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }
}