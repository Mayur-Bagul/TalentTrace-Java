package com.springjwt.security.services;

import org.springframework.stereotype.Service;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpStorageService {

    // In-memory OTP storage
    private final ConcurrentHashMap<String, String> otpStore = new ConcurrentHashMap<>();

    // Save OTP with phone number as key
    public void saveOtp(String phoneNumber, String otp) {
        otpStore.put(phoneNumber, otp);
    }

    // Retrieve OTP for verification
    public String getOtp(String phoneNumber) {
        return otpStore.get(phoneNumber);
    }

    // Optionally clear OTP after verification
    public void clearOtp(String phoneNumber) {
        otpStore.remove(phoneNumber);
    }
}
