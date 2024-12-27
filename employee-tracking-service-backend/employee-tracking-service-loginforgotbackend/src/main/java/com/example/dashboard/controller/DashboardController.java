package com.example.dashboard.controller;

import com.example.dashboard.model.Dashboard;
import com.example.dashboard.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
public class DashboardController {

    private final EmployeeService employeeService;

    public DashboardController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<Dashboard> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dashboard> getEmployeeById(@PathVariable Long id) {
        Dashboard employee = employeeService.getEmployeeById(id);
        if (employee != null) {
            return ResponseEntity.ok(employee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Dashboard createEmployee(@RequestBody Dashboard employee) {
        return employeeService.createEmployee(employee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dashboard> updateEmployee(@PathVariable Long id, @RequestBody Dashboard updatedEmployee) {
        try {
            return ResponseEntity.ok(employeeService.updateEmployee(id, updatedEmployee));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    // New endpoint for insights
    @GetMapping("/insights")
    public Map<String, Object> getInsights() {
        return employeeService.getEmployeeInsights();
    }
}
