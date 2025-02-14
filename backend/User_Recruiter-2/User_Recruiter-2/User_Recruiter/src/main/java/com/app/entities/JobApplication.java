package com.app.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "job_Application")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = "selectedJob" )
public class JobApplication extends BaseEntity 
{
    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 50, nullable = false)
    private String email;

   

    @Column(length = 500)
    private String coverLetter;
    
   
    
  

	//add available flag : for soft delete operation
  	private boolean availableJob;
  	//Jobs * -----> 1 Company
  	//Jobs - many , child , owning side
  	//(=the side containing physical mapping of the association : FK)
    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Jobs selectedJob;
    
    private Long applicationId;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobApplicationStatus status = JobApplicationStatus.APPLIED; // Default status
    
    /*@Version
    private Long version;  // Add version field*/
    
    
    
    
    public JobApplication(String name, String email, String coverLetter, boolean availableJob) {
		super();
		this.name = name;
		this.email = email;
		
		this.coverLetter = coverLetter;
		this.availableJob = availableJob;
	}
    


}





