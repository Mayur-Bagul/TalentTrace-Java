package com.springjwt.payload.request;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequest {
	private String phoneNumber;
    private String password;
}
