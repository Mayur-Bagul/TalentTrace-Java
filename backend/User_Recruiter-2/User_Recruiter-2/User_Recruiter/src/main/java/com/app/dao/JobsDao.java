package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Jobs;

public interface JobsDao extends JpaRepository<Jobs, Long> {
	// Derived Finder 
    //Jobs findJobsById(Long id);
	
	//Get Company + Job Details Custom Query 
	@Query("SELECT j FROM Jobs j JOIN FETCH j.jobApp WHERE j.id = :id")
	Optional<Jobs> getJobAndJobApplications( Long id);

}
