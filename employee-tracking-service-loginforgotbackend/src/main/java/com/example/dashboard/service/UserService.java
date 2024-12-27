package com.example.dashboard.service;

import com.example.dashboard.model.User;
import com.example.dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

public String login(String email, String password) {
    email = email.trim();
    password = password.trim();
    Optional<User> user = userRepository.findByEmail(email);
    if (user.isPresent() && user.get().getPassword().equals(password)) {
        return "Login successful!";
    } else {
        return "Invalid username or password.";
    }
}
}