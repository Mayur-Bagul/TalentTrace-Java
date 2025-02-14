package com.springjwt.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.util.Random;

@Service
public class TwilioService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;
    
    @Autowired
    private OtpStorageService otpStorageService;

    private final WebClient.Builder webClientBuilder;

    public TwilioService(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    // Generate a random OTP
    public String generateOtp() {
        Random rand = new Random();
        int otp = rand.nextInt(999999); // Generates a random number between 0 and 999999
        return String.format("%06d", otp); // Ensure the OTP is 6 digits
    }

    // Generate and send OTP
    public Mono<String> sendOtpToPhoneNumber(String toPhoneNumber) {
        String otp = generateOtp(); // Generate OTP internally
        otpStorageService.saveOtp(toPhoneNumber, otp); // Save OTP
        String messageBody = "Your OTP code is: " + otp;
        return sendSms(toPhoneNumber, messageBody);
    }



    // Send SMS using WebClient
    public Mono<String> sendSms(String toPhoneNumber, String messageBody) {
        return webClientBuilder.baseUrl("https://api.twilio.com/2010-04-01/Accounts/" + accountSid + "/Messages.json")
                .defaultHeader("Content-Type", "application/x-www-form-urlencoded")
                .build()
                .post()
                .headers(headers -> headers.setBasicAuth(accountSid, authToken))
                .bodyValue("To=" + toPhoneNumber + "&From=" + twilioPhoneNumber + "&Body=" + messageBody)
                .retrieve()
                .bodyToMono(String.class)
                .onErrorResume(WebClientResponseException.class, e -> Mono.just("Error sending SMS: " + e.getResponseBodyAsString()));
    }
}

