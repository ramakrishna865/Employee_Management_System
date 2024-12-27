package com.example.dashboard.service;

import com.example.dashboard.repository.UserRepository;
import com.example.dashboard.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.logging.Logger;

@Service
public class ForgotPasswordService {

    private static final Logger logger = Logger.getLogger(ForgotPasswordService.class.getName());
    private static final String HARD_CODED_OTP = "123456"; // Hardcoded OTP for now

    @Autowired
    private UserRepository userRepository;

    // Existing method for OTP request
    public String requestOtp(String email) {
        String trimmedEmail = email.trim();
        logger.info("Received email for OTP request: " + trimmedEmail);

        Optional<User> user = userRepository.findByEmail(trimmedEmail);

        if (user.isPresent()) {
            logger.info("User found with email: " + trimmedEmail);
            return "OTP is: " + HARD_CODED_OTP;  // Return hardcoded OTP
        } else {
            logger.warning("Email not found in the database: " + trimmedEmail);
            return "Email not found in the database.";
        }
    }

    // New method for OTP verification
    public String verifyOtp(String email, String otp) {
        if (HARD_CODED_OTP.equals(otp)) {
            return "OTP verified";  // OTP matches
        } else {
            return "Invalid OTP";  // OTP does not match
        }
    }
}