package com.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class JobsReqDTO extends BaseDTO{
	private Long companyId;
//	private Long jobId;
	private String jobsTitle;
	private String description;
	private String requirements;
	private String location;
	private String jobType;
	private String salary;
	private String experience;
	private Integer position;
}
