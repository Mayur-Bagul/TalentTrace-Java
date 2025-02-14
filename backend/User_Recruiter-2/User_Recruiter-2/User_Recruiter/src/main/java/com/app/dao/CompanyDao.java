package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Company;

public interface CompanyDao extends JpaRepository<Company, Long> {
	//Get Company + Job Details Custom Query 
	@Query("select c from Company c left join fetch c.jobs where c.id=:id")
	Optional<Company> getCompanyAndJobs(Long id);

}
