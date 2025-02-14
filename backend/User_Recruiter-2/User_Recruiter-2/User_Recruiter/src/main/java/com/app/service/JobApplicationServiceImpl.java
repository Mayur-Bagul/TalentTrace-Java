package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.JobApplicationDao;
import com.app.dao.JobsDao;
import com.app.dto.ApiResponse;
import com.app.dto.JobApplicationDTO;
import com.app.entities.JobApplication;
import com.app.entities.JobApplicationStatus;
import com.app.entities.Jobs;


@Service
@Transactional
public class JobApplicationServiceImpl implements JobApplicationService {

   
    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private JobsDao jobsDao;
    
    @Autowired
    private JobApplicationDao jobApplicationDao;

   /* @Override
    public ApiResponse addJobApplication(JobApplicationDTO jobApplicationDTO) {
        JobApplication application = modelMapper.map(jobApplicationDTO, JobApplication.class);
        jobApplicationDao.save(application);
        return new ApiResponse("Job application added successfully!");
    } */
    
    @Override
    public ApiResponse addJobApplication(JobApplicationDTO jobApplicationDTO) {
    	
    	System.out.println("in add job appolication"+jobApplicationDTO);
    	System.out.println("in jobId"+jobApplicationDTO.getJobId());
    	Jobs job = jobsDao.findById(jobApplicationDTO.getJobId())
    			.orElseThrow(() -> new ResourceNotFoundException("invalid job id"));
    	
    	System.out.println("job app" + job);
    	//JobApplication jobApp = modelMapper.map(jobApplicationDTO, JobApplication.class);
    	//System.out.println("job app found etity"+jobApp);
    	
    	//job.addJobApplication(jobApp);
    	
    	//jobApp.setId(jobApplicationDTO.getJobId());
    	
    	JobApplication jobApp = modelMapper.map(jobApplicationDTO, JobApplication.class); System.out.println("Job Application entity: ");
    	jobApp.setSelectedJob(job);
    	jobApp.setStatus(JobApplicationStatus.APPLIED);
    	
    	System.out.println("job app to save " + jobApp);
    	try {
    		
    	
    	JobApplication persistentJobApp = jobApplicationDao.save(jobApp);
    	return new ApiResponse("New job application added with id " + persistentJobApp.getId());

    	}catch(OptimisticLockingFailureException e) {
        	return new ApiResponse("Failed to add job application ");

    	}
    	
    	
    }

   /* @Override
    public List<JobApplicationDTO> getAllJobApplications() {
        return jobApplicationDao.findAll()
                .stream()
                .map(application -> modelMapper.map(application, JobApplicationDTO.class))
                .collect(Collectors.toList());
    }*/
    
    
    @Override
    public JobApplicationDTO getJobApplicationsById(Long id) {
    	JobApplication jat = jobApplicationDao.findById(id).orElseThrow(()-> new ResourceNotFoundException("job Application not Found"));
    	
    	JobApplicationDTO jad = modelMapper.map(jat, JobApplicationDTO.class);
    	jad.setJobId(jat.getSelectedJob().getId());
    	jad.setStatus(jat.getStatus());
    	return jad;
    			
    	
    }

  /*  @Override
    public ApiResponse updateJobApplication(Long id, JobApplicationDTO jobApplicationDTO) {
        JobApplication application = jobApplicationDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found with ID: " + id));

        application.setName(jobApplicationDTO.getName());
        application.setEmail(jobApplicationDTO.getEmail());
        application.setJobTitle(jobApplicationDTO.getJobTitle());
        application.setCoverLetter(jobApplicationDTO.getCoverLetter());

        jobApplicationDao.save(application);
        return new ApiResponse("Job application updated successfully!");
    } */
    
    @Override
    public JobApplicationDTO updateJobApplication(Long id, JobApplicationDTO jobApplicationDTO) {
    	
    	JobApplication jobApp = modelMapper.map(jobApplicationDTO, JobApplication.class);
    	
    	Jobs job = jobsDao.findById(jobApplicationDTO.getJobId())
    			.orElseThrow(() -> new RuntimeException("job not found"));
    	
    	jobApp.setSelectedJob(job);
    	
    	jobApp = jobApplicationDao.save(jobApp);
    	
    	return modelMapper.map(jobApp, JobApplicationDTO.class);
    	
    			
    }

    @Override
    public ApiResponse deleteJobApplication(Long id) {
        if (jobApplicationDao.existsById(id)) {
        	jobApplicationDao.deleteById(id);
            return new ApiResponse("Job application deleted successfully!");
        }
        throw new ResourceNotFoundException("Job application not found with ID: " + id);
    }

	/*@Override
	public JobApplicationDTO getApplicationById(Long appId) {
		JobApplication jobAppEnt = jobApplicationDao.findById(appId)
				.orElseThrow(() -> new ResourceNotFoundException("Job application not found with ID: "));

		return null;
	}*/

	
    @Override
    public Optional<JobApplication> findById(Long id) {
        return jobApplicationDao.findById(id);
    }

    // Implementing save for JobApplication
	@Override
	public JobApplication save(JobApplication jobApp) {
	    return jobApplicationDao.save(jobApp); // Ensure jobApplicationDao is correctly injected
	}

	@Override
	public List<JobApplicationDTO> getAllJobApplications() {
		return jobApplicationDao.findAll().stream()
				.map( application -> {JobApplicationDTO jad = modelMapper.map(application, JobApplicationDTO.class);
				if(application.getSelectedJob()!=null) {
                    jad.setJobId(application.getSelectedJob().getId());
                    jad.setStatus(application.getStatus());
                   
				}
				return jad;
				})
				.collect(Collectors.toList());
				
	}


	
	

	
}

