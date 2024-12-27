package com.example.dashboard.repository;

import com.example.dashboard.model.Register;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegisterRepository extends JpaRepository<Register, String> {
    // Add custom queries if needed
}
