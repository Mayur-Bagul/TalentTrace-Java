package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.CompanyDao;
import com.app.dao.JobApplicationDao;
import com.app.dao.JobsDao;
import com.app.dto.ApiResponse;
import com.app.dto.CompanyDTO;
import com.app.dto.JobAppDTO;
import com.app.dto.JobsReqDTO;
import com.app.dto.JobsRespDTO;
import com.app.entities.Company;
import com.app.entities.JobApplication;
import com.app.entities.Jobs;

@Service
@Transactional
public class JobsServiceImpl implements JobsService {
	
	@Autowired
	private JobsDao jobsDao;
	
	@Autowired 
	private ModelMapper mapper;
	
	@Autowired
	private CompanyDao companyDao;
	
	
	
	
	@Override
	public ApiResponse addNewJobs(JobsReqDTO reqDTO) {
		// 1.Get Company From It's Id
		Company company = companyDao.findById(reqDTO.getCompanyId())
				.orElseThrow(() -> new ResourceNotFoundException("invalid company id"));
		
		// To-DO 
		Jobs job = mapper.map(reqDTO, Jobs.class);
		// 2. company 1<--->* job (establish bi directional association) 
		company.addJob(job);
		
		job.setId(reqDTO.getId());
		
		
		
		
		//3. Save Job
		Jobs persistentJob = jobsDao.save(job);
		
		return new ApiResponse("new job added with id" + persistentJob.getId());
	}

	@Override
	public JobsRespDTO getJobsBYCompany(Long jobId) {
		//Jobs js = jobsDao.findJobsById(jobId).orElseThrow
		Jobs js = jobsDao.findById(jobId).orElseThrow(()-> new ResourceNotFoundException("job not found"));
		System.out.println("in  get jobs by Company"+js.getSelectedCompany().getId());
		JobsRespDTO jsd=mapper.map(js, JobsRespDTO.class);
		jsd.setCompanyId(js.getSelectedCompany().getId());
			

		return  jsd;
				
		
	}

	@Override
	public JobsReqDTO updateJobsBYCompany(JobsReqDTO jobDTO) {
		Jobs job = mapper.map(jobDTO, Jobs.class);
		Company company = companyDao.findById(jobDTO.getCompanyId())
				.orElseThrow(() -> new RuntimeException("company not found"));
		job.setSelectedCompany(company);
		job = jobsDao.save(job);
		return mapper.map(job, JobsReqDTO.class);
	}

	@Override
	public void deleteJobsBYCompany(Long jobId) {
		
		jobsDao.deleteById(jobId);
		
	}

	@Override
	public JobAppDTO getJobAndJobAppDetails(Long id) {
		
		//return jobs + jobAppDetails
		Jobs jobEnt = jobsDao.getJobAndJobApplications(id)
				.orElseThrow(() -> new RuntimeException("job not found"));
		return mapper.map(jobEnt, JobAppDTO.class);
	}
	
	
	
	/*
	 * Jobs js = jobsDao.findById(jobId).orElseThrow(()-> new ResourceNotFoundException("job not found"));
		System.out.println("in  get jobs by Company"+js.getSelectedCompany().getId());
		JobsRespDTO jsd=mapper.map(js, JobsRespDTO.class);
		jsd.setCompanyId(js.getSelectedCompany().getId());
	 * 
	 */

	@Override
	public List<JobsRespDTO> getAllJobs() {
	    return jobsDao.findAll().stream()
	        .map(job -> {
	            JobsRespDTO jobRespDTO = mapper.map(job, JobsRespDTO.class);

	            // Map companyId and companyName from the selectedCompany
	            if (job.getSelectedCompany() != null) {
	                jobRespDTO.setCompanyId(job.getSelectedCompany().getId());
	                jobRespDTO.setCompanyName(job.getSelectedCompany().getCompanyName());
	            }

	            return jobRespDTO;
	        })
	        .collect(Collectors.toList());
	}


	
}
