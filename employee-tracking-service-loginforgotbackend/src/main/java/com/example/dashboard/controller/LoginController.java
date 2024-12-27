package com.example.dashboard.controller;

import com.example.dashboard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.POST})
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping
    public String login(@RequestParam String email, @RequestParam String password) {
        return userService.login(email, password);
    }
}
