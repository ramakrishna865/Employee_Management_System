package com.example.dashboard.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
@Data
public class Dashboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String position;
    private String department;
    private double salary;

    private LocalDate dateOfBirth;
    private LocalDate dateOfJoining;

    private boolean active;
    private String gender;

    @Column(nullable = true)
    private Integer performanceScore;
}
