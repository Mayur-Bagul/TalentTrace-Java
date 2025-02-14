package com.springjwt.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springjwt.models.Role;
import com.springjwt.models.User;
import com.springjwt.security.jwt.JwtUtils;
import com.springjwt.security.services.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	
	@Autowired
    private UserService userService;
	
	@Autowired
    private JwtUtils jwtUtils;

	
  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/user")
  @PreAuthorize("hasRole('USER') or hasRole('RECRUITER') or hasRole('ADMIN')")
  public String userAccess() {
    return "User Content.";
  }

  @GetMapping("/recruiter")
  @PreAuthorize("hasRole('RECRUITER')")
  public String moderatorAccess() {
    return "RECRUITER Board.";
  }

  @GetMapping("/admin")
  @PreAuthorize("hasRole('ADMIN')")
  public String adminAccess() {
    return "Admin Board.";
  }
  
  @GetMapping("/role")
  public ResponseEntity<Map<String, Object>> getUserRoles(@RequestHeader("Authorization") String token) {
      String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
      String username = jwtUtils.getUserNameFromJwtToken(jwtToken); 

     
      User user = userService.findByUsername(username); 
      
      Set<Role> roles = user.getRoles();

  
      Map<String, Object> response = new HashMap<>();
      response.put("roles", roles);

      return ResponseEntity.ok(response); 
  }

}
