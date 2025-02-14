package com.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.app.dto.JobApplicationDTO;
import com.app.service.JobApplicationService;

import com.app.dto.ApiResponse;
import com.app.dto.CompanyDTO;
import com.app.dto.JobsReqDTO;
import com.app.dto.JobsRespDTO;
import com.app.service.JobsService;


import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/Job")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class JobsController {

	private final JobsService jobsService;
	
	private final JobApplicationService jobApplicationService;
	
	

	
	
	@PostMapping
	public ResponseEntity<?> addJob(@RequestBody JobsReqDTO dto) {
		System.out.println("In add job" + dto);
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(jobsService.addNewJobs(dto));
			
		} catch (RuntimeException e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(e.getMessage()));
			
		}
	}
	/*
	@GetMapping("/all")
	public ResponseEntity<List<JobsRespDTO>> getAllJobs() {
        return ResponseEntity.ok(jobsService.getAllJobs());
    }*/
	
	@GetMapping("/all")
	public ResponseEntity<List<JobsRespDTO>> getAllJobs() {
		List<JobsRespDTO> jobsList = jobsService.getAllJobs();
		return ResponseEntity.ok(jobsList);
	}
	
	
	@GetMapping("/jobs/{jobId}")
	public ResponseEntity<?> getJobsBYCompany (@PathVariable Long jobId) {
		return ResponseEntity.ok(jobsService.getJobsBYCompany(jobId));
	}
	
	@PutMapping("jobs/{jobId}")
	public ResponseEntity<?> updateJobsBYCompany(@PathVariable Long jobId, @RequestBody JobsReqDTO jobDTO) {
		
		jobDTO.setId(jobId);
		JobsReqDTO updateJob = jobsService.updateJobsBYCompany(jobDTO);
		
		return ResponseEntity.ok(new ApiResponse("job updated successfully")) ;
	}
	
	@DeleteMapping("/jobs/{jobId}")
	public ResponseEntity<?> deleteJobsBYCompany(@PathVariable Long jobId) {
		
		try {
			jobsService.deleteJobsBYCompany(jobId);
			return ResponseEntity.ok(new ApiResponse("Job Deleted Successfully"));
			
		} catch (RuntimeException e) {
			return ResponseEntity.status(500).body(new ApiResponse("Error Deleting Job" +e.getMessage()));
		}
	}
	
	@GetMapping("/{jobId}/app/")
    public ResponseEntity<?> getJobAndJobAppDetails(@PathVariable Long jobId) {
    	System.out.println("In Get Job and JobApps" + jobId);
    	try {
    		return ResponseEntity.ok(jobsService.getJobAndJobAppDetails(jobId));
			
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
    }
	
	
//	@PostMapping("/{id}/apply")
//	public ResponseEntity<?> applyToJob(@PathVariable Long jobId, @RequestBody JobApplicationDTO applicationRequest) {
//	    System.out.println("Applying to Job with ID: " + jobId);
//
//	    try {
//	        applicationRequest.setJobId(jobId); // Ensure job ID is set
//	        return ResponseEntity.status(HttpStatus.CREATED)
//	                .body(jobApplicationService.addJobApplication(applicationRequest));
//	    } catch (RuntimeException e) {
//	        System.out.println("Error applying to job: " + e.getMessage());
//	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//	                .body(new ApiResponse("Failed to apply to job: " + e.getMessage()));
//	    }
//	}
	
	
	
	@PostMapping("/{jobId}/apply")
	public ResponseEntity<?> applyToJob(@PathVariable("jobId") Long jobId, 
	                                    @RequestBody JobApplicationDTO applicationRequest) {
	    System.out.println("Applying to Job with ID: " + jobId);

	    try {
	        applicationRequest.setJobId(jobId); // Ensure job ID is set
	        return ResponseEntity.status(HttpStatus.CREATED)
	                .body(jobApplicationService.addJobApplication(applicationRequest));
	    } catch (RuntimeException e) {
	        System.out.println("Error applying to job: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                .body(new ApiResponse("Failed to apply to job: " + e.getMessage()));
	    }
	}


}
