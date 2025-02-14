package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.JobApplication;

public interface JobApplicationDao extends JpaRepository<JobApplication, Long> {
	
	List<JobApplication> findByApplicationId(Long id);
	
	

}
