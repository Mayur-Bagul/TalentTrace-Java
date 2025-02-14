package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.ApiResponse;
import com.app.dto.JobAppDTO;
import com.app.dto.JobsReqDTO;
import com.app.dto.JobsRespDTO;
import com.app.entities.JobApplication;

public interface JobsService {
	
	ApiResponse addNewJobs(JobsReqDTO dto);

    JobsRespDTO getJobsBYCompany(Long jobId);

	JobsReqDTO updateJobsBYCompany(JobsReqDTO jobDTO);

	void deleteJobsBYCompany(Long jobId);

	JobAppDTO getJobAndJobAppDetails(Long jobAppId);

	List<JobsRespDTO> getAllJobs();
	
	

	
}
