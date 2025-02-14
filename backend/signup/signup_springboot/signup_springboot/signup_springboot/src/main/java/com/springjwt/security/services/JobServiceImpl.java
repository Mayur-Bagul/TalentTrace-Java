package com.springjwt.security.services;


import com.springjwt.payload.response.ApiResponse;
import com.springjwt.repository.JobRepository;
import com.springjwt.custom_exceptions.ResourceNotFoundException;
import com.springjwt.models.Job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Job not found"));
    }

    @Override
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    public Job updateJob(Long id, Job jobDetails) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        job.setTitle(jobDetails.getTitle());
        job.setCategory(jobDetails.getCategory());
        job.setLocation(jobDetails.getLocation());
        job.setSalary(jobDetails.getSalary());
        job.setApplicants(jobDetails.getApplicants());
        return jobRepository.save(job);
    }

    @Override
    public ApiResponse deleteJob(Long id) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        jobRepository.delete(job);
        return new ApiResponse("Job deleted successfully");
    }
}
