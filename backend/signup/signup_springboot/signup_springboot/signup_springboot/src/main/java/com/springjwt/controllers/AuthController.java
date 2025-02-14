package com.springjwt.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springjwt.models.ERole;
import com.springjwt.models.Role;
import com.springjwt.models.User;
import com.springjwt.payload.request.LoginRequest;
import com.springjwt.payload.request.SignupRequest;
import com.springjwt.payload.response.JwtResponse;
import com.springjwt.payload.response.MessageResponse;
import com.springjwt.repository.RoleRepository;
import com.springjwt.repository.UserRepository;
import com.springjwt.security.jwt.JwtUtils;
import com.springjwt.security.services.EmailService;
import com.springjwt.security.services.UserDetailsImpl;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "*", maxAge = 3600)
@CrossOrigin(origins = "*", allowCredentials = "true")

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;
  
  @Autowired
  EmailService emailService;

  
  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
      User user = userRepository.findByEmail(loginRequest.getEmail())
          .orElseThrow(() -> new RuntimeException("Error: User not found with email: " + loginRequest.getEmail()));
      
//      System.out.println("Encoded Password in DB: " + user.getPassword()); // Debugging

      Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

      SecurityContextHolder.getContext().setAuthentication(authentication);
      String jwt = jwtUtils.generateJwtToken(authentication);

      UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
      List<String> roles = userDetails.getAuthorities().stream()
          .map(item -> item.getAuthority())
          .collect(Collectors.toList());

      return ResponseEntity.ok(new JwtResponse(jwt, 
                           userDetails.getId(), 
                           userDetails.getUsername(), 
                           userDetails.getEmail(),
                           userDetails.getPhoneNumber(),
                           roles));
  }


  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
      if (userRepository.existsByUsername(signUpRequest.getUsername())) {
          return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: Username is already taken!"));
      }

      if (userRepository.existsByEmail(signUpRequest.getEmail())) {
          return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: Email is already in use!"));
      }

      Set<Role> roles = new HashSet<>();
      Set<String> strRoles = signUpRequest.getRole(); 
      if (strRoles != null) {
          strRoles.forEach(role -> {
              switch (role.toLowerCase()) {
              case "admin":
                  Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                      .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                  roles.add(adminRole);
                  break;
              case "recruiter":
                  Role recruiterRole = roleRepository.findByName(ERole.ROLE_RECRUITER)
                      .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                  roles.add(recruiterRole);
                  break;
              default:
                  Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                      .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                  roles.add(userRole);
              }
          });
      } else {
          // Default role if none is provided
          Role defaultRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(defaultRole);
      }

      // Create new user's account
      User user = new User(signUpRequest.getUsername(),
              signUpRequest.getEmail(), signUpRequest.getPhoneNumber(),
              encoder.encode(signUpRequest.getPassword()));

      user.setRoles(roles);
      userRepository.save(user);
      
      String subject = "Welcome to TalentTrace!";
      String body = "<h1>Dear " + signUpRequest.getUsername() + ",</h1>"
                  + "<p>Thank you for registering with us.</p>"
                  + "<p>We are excited to have you on board!</p>"
                  + "<p>Best regards,</p>"
                  + "<p>Team TalentTrace</p>";
      emailService.SendEmail(signUpRequest.getEmail(), subject, body);

      return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
}
