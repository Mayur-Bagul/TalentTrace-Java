package com.app.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyJobsDTO extends BaseDTO {

	private String companyName;
	private String description;
	private String website;
	private String location;
	
	private List<JobsReqDTO> jobs;
}
