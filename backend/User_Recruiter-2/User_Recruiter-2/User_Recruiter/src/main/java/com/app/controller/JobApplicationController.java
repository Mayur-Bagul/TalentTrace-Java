package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ApiResponse;
import com.app.dto.JobApplicationDTO;
import com.app.entities.JobApplication;
import com.app.service.JobApplicationService;
import com.app.service.JobsService;



import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/applications")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class JobApplicationController {
	
	@Autowired
	private JobsService jobService;
	
	
	@Autowired
	private JobApplicationService jobApplicationService;

    @PostMapping("/add")
    public ResponseEntity<?> addJobApplication(@RequestBody JobApplicationDTO jobApplicationDTO) {
     System.out.println("at jobbap  control "+jobApplicationDTO);
    	try {
    	  
    	return ResponseEntity.status(HttpStatus.CREATED) 
                .body(jobApplicationService.addJobApplication(jobApplicationDTO));
      } catch(RuntimeException e) {
    	  System.out.println(e);
    	  return ResponseEntity.status(HttpStatus.BAD_REQUEST)
    			  .body(new ApiResponse(e.getMessage()));
    			  
      }
    }
	

	@GetMapping("/get/{id}")
	public ResponseEntity<?> getJobApplicationsById(Long id) {
		return ResponseEntity.ok(jobApplicationService.getJobApplicationsById(id));
	}

	/*@GetMapping("/app/{appId}")
	public ResponseEntity<?> getApplicationById(@PathVariable Long appId) {
		return ResponseEntity.ok(jobApplicationService.getApplicationById(appId));
	}*/
	
//	@GetMapping("/all")
//	public ResponseEntity<?> getAllJobApplications(JobApplicationDTO jobApplicationDTO) {
//		return ResponseEntity.ok(jobApplicationService.getAllJobApplications(jobApplicationDTO));
//	}
	
	@GetMapping("/all")
	public ResponseEntity<List<JobApplicationDTO>> getAllJobApplications() {
		List<JobApplicationDTO> jobApplications = jobApplicationService.getAllJobApplications();
		return ResponseEntity.ok(jobApplications);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateJobApplication(@PathVariable Long id,
			@RequestBody JobApplicationDTO jobApplicationDTO) {

		jobApplicationDTO.setId(id);

		JobApplicationDTO updateJobApp = jobApplicationService.updateJobApplication(id, jobApplicationDTO);

		return ResponseEntity.ok(new ApiResponse("Job Application Updated Successfully"));

	}
	
	@PutMapping("/update/status/{id}")
	public ResponseEntity<?> updateJobApplicationStatus(@PathVariable Long id, @RequestBody JobApplicationDTO jobApplicationDTO) {
	    // Fetch job application
	    JobApplication jobApp = jobApplicationService.findById(id)
	        .orElseThrow(() -> new ResourceNotFoundException("Job Application not found"));

	    // Update status
	    jobApp.setStatus(jobApplicationDTO.getStatus());

	    // Save updated job application
	    jobApplicationService.save(jobApp);

	    return ResponseEntity.ok(new ApiResponse("Job Application Status Updated Successfully"));
	}




	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteJobApplication(@PathVariable Long id) {
		try {
			jobApplicationService.deleteJobApplication(id);
			return ResponseEntity.ok(new ApiResponse("Job Application Deleted Successfully"));
		} catch (RuntimeException e) {
			return ResponseEntity.status(500).body(new ApiResponse("error deleting job app" + e.getMessage()));
		}

	}

}
