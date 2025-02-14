package com.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class JobsRespDTO extends BaseDTO {
	private Long companyId;
	private String jobsTitle;
	private String description;
	private String requirements;
	private String location;
	private String jobType;
	private String salary;
	private String experience;
	private Integer position;
	 private String companyName;
}
