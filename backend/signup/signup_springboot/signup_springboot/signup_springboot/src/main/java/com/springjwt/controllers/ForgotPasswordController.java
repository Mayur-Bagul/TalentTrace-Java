package com.springjwt.controllers;

import com.springjwt.payload.request.ForgotPasswordRequest;
import com.springjwt.payload.response.MessageResponse;
import com.springjwt.security.services.TwilioService;
import com.springjwt.security.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class ForgotPasswordController {

    @Autowired
    private UserService userService;

    @Autowired
    private TwilioService twilioService;

    @PostMapping("/forgot-password")
    public ResponseEntity<MessageResponse> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        String phoneNumber = request.getPhoneNumber();
        if (userService.findByPhoneNumber(phoneNumber) == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Phone number not found"));
        }

      
        twilioService.sendOtpToPhoneNumber(phoneNumber);

        return ResponseEntity.ok(new MessageResponse("OTP sent to your phone"));
    }
}

