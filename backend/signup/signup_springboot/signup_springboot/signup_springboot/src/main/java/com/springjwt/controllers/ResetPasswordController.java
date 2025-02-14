package com.springjwt.controllers;

import com.springjwt.models.User;
import com.springjwt.payload.request.ResetPasswordRequest;
import com.springjwt.payload.response.MessageResponse;
import com.springjwt.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class ResetPasswordController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/reset-password")
    public ResponseEntity<MessageResponse> resetPassword(@RequestBody ResetPasswordRequest request) {
        String phone = request.getPhoneNumber();
        String newPassword = request.getPassword();

        User user = userService.findByPhoneNumber(phone);
        if (user == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Phone number not found"));
        }

        String hashedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(hashedPassword);
        userService.save(user);

        return ResponseEntity.ok(new MessageResponse("Password reset successfully"));
    }
}


