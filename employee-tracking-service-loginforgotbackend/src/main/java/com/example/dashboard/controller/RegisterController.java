package com.example.dashboard.controller;

import com.example.dashboard.model.Register;
import com.example.dashboard.repository.RegisterRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

public class RegisterController {

    @Autowired
    private RegisterRepository userRepository;

 

    @GetMapping("/users")
    public List<Register> getAllUsers() {
        // Fetch all users from the database
        List<Register> users = userRepository.findAll();

        // Display each user in the terminal
        System.out.println("List of all users:");
        for (Register user : users) {
            System.out.println(user);
        }

        // Return the list of users as the API response
        return users;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Register user) {
        if (userRepository.existsById(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered!");
        }
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
}
}

