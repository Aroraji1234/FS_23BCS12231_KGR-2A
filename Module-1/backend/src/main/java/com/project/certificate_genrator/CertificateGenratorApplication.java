package com.project.certificate_genrator;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class CertificateGenratorApplication {

    public static void main(String[] args) {
        SpringApplication.run(CertificateGenratorApplication.class, args);
    }

    // ADD THIS BEAN
    @Bean
    public CommandLineRunner commandLineRunner(PasswordEncoder passwordEncoder) {
        return args -> {
            System.out.println("\n--- PASSWORD HASH FOR DATABASE ---");
            System.out.println("For password 'password', use this hash:");
            System.out.println(passwordEncoder.encode("password"));
            System.out.println("------------------------------------\n");
        };
    }
}