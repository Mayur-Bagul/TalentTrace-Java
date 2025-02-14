package com.springjwt.security.services;

import com.springjwt.models.User;
import com.springjwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findByPhoneNumber(String phoneNumber) {
        final String cleanedPhoneNumber;
        if (phoneNumber.startsWith("+91")) {
            cleanedPhoneNumber = phoneNumber.substring(3); // Strip the +91 prefix
        } else {
            cleanedPhoneNumber = phoneNumber; 
        }
        
        return userRepository.findByPhoneNumber(cleanedPhoneNumber)
                .orElseThrow(() -> new RuntimeException("User not found with phone number: " + cleanedPhoneNumber));
    }

    public User findByUsername(String username) {
        return userRepository.findByEmail(username).orElse(null);
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}



