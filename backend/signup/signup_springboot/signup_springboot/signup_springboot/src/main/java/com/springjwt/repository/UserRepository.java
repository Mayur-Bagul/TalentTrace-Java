package com.springjwt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springjwt.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
//  Optional<User> findByUsername(String username);
  Optional<User> findByEmail(String email);
 // make name to email for uq
  
  List<User> findAll();
  
  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);
  
  Optional<User> findByPhoneNumber(String phoneNumber);
  
	
}
