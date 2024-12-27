package com.example.dashboard;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;
//import org.springframework.context.annotation.ComponentScan;
@SpringBootApplication
//@ComponentScan(basePackages="com.example.dashboard.controller");
@EnableJpaRepositories("com.example.dashboard.repository") // Ensure the package is correct
@EntityScan(basePackages = "com.example.dashboard.model")
public class DashboardApplication {
    public static void main(String[] args) {
        SpringApplication.run(DashboardApplication.class, args);
    }
}











