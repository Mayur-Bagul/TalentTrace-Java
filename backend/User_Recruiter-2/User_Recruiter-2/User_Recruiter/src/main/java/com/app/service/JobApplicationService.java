package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.ApiResponse;
import com.app.dto.JobAppDTO;
import com.app.dto.JobApplicationDTO;
import com.app.entities.JobApplication;

public interface JobApplicationService {
	ApiResponse addJobApplication(JobApplicationDTO jobApplicationDTO);
    JobApplicationDTO getJobApplicationsById(Long id);
    JobApplicationDTO updateJobApplication(Long id, JobApplicationDTO jobApplicationDTO);
    ApiResponse deleteJobApplication(Long id);
	//JobApplicationDTO getApplicationById(Long appId);
    Optional<JobApplication> findById(Long id); 
	JobApplication save(JobApplication jobApp);
	List <JobApplicationDTO> getAllJobApplications();
	
	
}
