package com.springjwt.controllers;


import com.springjwt.security.services.TwilioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/sms")
public class SmsController {

    private final TwilioService twilioService;

    @Autowired
    public SmsController(TwilioService twilioService) {
        this.twilioService = twilioService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendSms(@RequestParam String toPhoneNumber, @RequestParam String messageBody) {
        String response = twilioService.sendSms(toPhoneNumber, messageBody)
                .block();  // Use block() to wait for the response synchronously
        return ResponseEntity.ok(response);
    }
}

