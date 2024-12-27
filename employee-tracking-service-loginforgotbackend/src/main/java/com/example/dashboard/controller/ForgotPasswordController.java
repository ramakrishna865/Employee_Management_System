

package com.example.dashboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dashboard.model.User;
import com.example.dashboard.repository.UserRepository;
import com.example.dashboard.service.ForgotPasswordService;

@RestController
@RequestMapping("/api/forgot-password")
public class ForgotPasswordController {

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @Autowired
    private UserRepository userRepository;

    // Existing endpoint for requesting OTP
    @PostMapping("/request-otp")
    public String requestOtp(@RequestParam("email") String email) {
        return forgotPasswordService.requestOtp(email);
    }

    // New endpoint for verifying OTP
    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestParam("email") String email, @RequestParam("otp") String otp) {
        return forgotPasswordService.verifyOtp(email, otp);
    }

    // New endpoint for resetting the password
    @PostMapping("/reset-password")
    public String resetPassword(
            @RequestParam("email") String email,
            @RequestParam("newPassword") String newPassword) {

        // Verify the user exists
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return "User not found!";
        }

        // Update the user's password
        user.setPassword(newPassword); // Password is stored as plain text
        userRepository.save(user);

        return "Password reset successfully!";
    }
}
