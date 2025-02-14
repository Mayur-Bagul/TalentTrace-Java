package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class CompanyDTO extends BaseDTO {

	private String companyName;
	private String description;
	private String website;
	private String location;
	
}
