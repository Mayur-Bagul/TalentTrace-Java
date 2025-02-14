package com.springjwt.payload.request;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OtpVerificationRequest {
	private String phoneNumber;
    private String otp;
}
