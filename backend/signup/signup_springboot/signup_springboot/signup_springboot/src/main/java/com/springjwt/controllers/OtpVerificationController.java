 package com.springjwt.controllers;

 import com.springjwt.payload.request.OtpVerificationRequest;
 import com.springjwt.payload.response.MessageResponse;
 import com.springjwt.security.services.OtpStorageService;
 import com.springjwt.security.services.TwilioService;
 import org.springframework.http.ResponseEntity;
 import reactor.core.publisher.Mono;
 import org.springframework.web.bind.annotation.*;

 @CrossOrigin(origins = "*", maxAge = 3600)
 @RestController
 @RequestMapping("/api/auth")
 public class OtpVerificationController {

     private final OtpStorageService otpStorageService;
     private final TwilioService twilioService;

     public OtpVerificationController(OtpStorageService otpStorageService, TwilioService twilioService) {
         this.otpStorageService = otpStorageService;
         this.twilioService = twilioService; 
     }

     @PostMapping("/verify-otp")
     public ResponseEntity<MessageResponse> verifyOtp(@RequestBody OtpVerificationRequest request) {
         String storedOtp = otpStorageService.getOtp(request.getPhoneNumber());
          
         if (storedOtp == null) {
             return ResponseEntity.badRequest().body(new MessageResponse("OTP not found"));
         }
         
         if (request.getOtp().equals(storedOtp)) {
             otpStorageService.clearOtp(request.getPhoneNumber());  // Clear OTP after success
             return ResponseEntity.ok(new MessageResponse("OTP verified successfully"));
         } else {
             return ResponseEntity.badRequest().body(new MessageResponse("Invalid OTP"));
         }
     }
     
     @PostMapping("/send-otp")
     public Mono<ResponseEntity<MessageResponse>> sendOtp(@RequestBody OtpVerificationRequest request) {
         return twilioService.sendOtpToPhoneNumber(request.getPhoneNumber())
                 .map(response -> ResponseEntity.ok(new MessageResponse("OTP sent successfully")))
                 .onErrorResume(e -> Mono.just(ResponseEntity.badRequest().body(new MessageResponse("Error sending OTP: " + e.getMessage()))));
     }
 }




