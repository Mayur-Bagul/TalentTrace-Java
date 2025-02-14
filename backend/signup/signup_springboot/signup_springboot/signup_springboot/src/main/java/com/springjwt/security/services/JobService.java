package com.springjwt.security.services;


import com.springjwt.payload.response.ApiResponse;
import com.springjwt.models.Job;

import java.util.List;

public interface JobService {
    List<Job> getAllJobs();
    Job getJobById(Long id);
    Job createJob(Job job);
    Job updateJob(Long id, Job jobDetails);
    ApiResponse deleteJob(Long id);
}
