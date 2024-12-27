package com.example.dashboard.repository;

import com.example.dashboard.model.Dashboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface EmployeeRepository extends JpaRepository<Dashboard, Long> {

    // Method to count active employees
    long countByActive(boolean active);

    // Custom query to get department-wise employee count
    @Query("SELECT e.department AS department, COUNT(e) AS count FROM Dashboard e GROUP BY e.department")
    List<Map<String, Object>> getDepartmentWiseCount();

    // Custom query to get gender ratio
    @Query("SELECT e.gender AS gender, COUNT(e) AS value FROM Dashboard e GROUP BY e.gender")
    List<Map<String, Object>> getGenderRatio();
}
