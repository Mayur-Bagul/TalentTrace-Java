package com.app.dto;

import com.app.entities.JobApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class JobApplicationDTO extends BaseDTO{

	private Long jobId;
    private String name;
    private String email;
    
    private String coverLetter;
    private JobApplicationStatus status;
    
}
