package com.app.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobAppDTO extends BaseDTO{

	private String jobsTitle;
	private String description;
	private String requirements;
	private String location;
	private String jobType;
	private String salary;
	private String experience;
	private Integer position;
	
	List<JobApplicationDTO> jobApp;
}
