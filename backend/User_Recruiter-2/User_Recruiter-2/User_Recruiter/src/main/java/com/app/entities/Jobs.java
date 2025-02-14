package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@EqualsAndHashCode(of = "jobsTitle", callSuper = false)
@ToString(callSuper = true, exclude = "selectedCompany" )


public class Jobs extends BaseEntity { 
    // @Column(name="jobs_name",unique=true,length=30)
	
    @Column(unique=true, length=50, nullable=false)
    private String jobsTitle;
    
    @Column(length=50, nullable=false)
    private String description;
    
    @Column(length=50, nullable=false)
    private String requirements;
    
    @Column(length=50, nullable=false)
    private String location;
    
    @Column(length=50, nullable=false)
    private String salary;
    
    @Column(length=50, nullable=false)
    private String jobType;
    
    @Column(length=50, nullable=false)
    private String experience;
    
    @Column(length=50, nullable=false)
    private String position;
  //add available flag : for soft delete operation
  	private boolean available;
  	//Jobs * -----> 1 Company
  	//Jobs - many , child , owning side
  	//(=the side containing physical mapping of the association : FK)
    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company selectedCompany;
    
  /*  @Column(name="jobId", nullable= false)
    private Long jobId;*/
    
    @OneToMany(mappedBy = "selectedJob", cascade = CascadeType.ALL, orphanRemoval = true )
    private List<JobApplication> jobApp = new ArrayList<>();

	public Jobs(String jobsTitle, String description, String requirements, String location, String salary,
			String jobType, String experience, String position) {
		super();
		this.jobsTitle = jobsTitle;
		this.description = description;
		this.requirements = requirements;
		this.location = location;
		this.salary = salary;
		this.jobType = jobType;
		this.experience = experience;
		this.position = position;
		
	}
	
    
    
    
	// add helper method in the entity layer to establish bi-dir association between Job and jobApp
	
	
	
		public void addJobApplication(JobApplication app) {
			try {
			// establish job --> jobApp (parent --> child)
			this.jobApp.add(app);
			// establish jobApp --> job (child -> parent)
			app.setSelectedJob(this);
			}catch(RuntimeException e) {
				System.out.println(e);
			}
		}
		
		
		public void removeJobApplication(JobApplication app) {
			try {
			// establish job --> jobApp (parent --> child)
			this.jobApp.remove(app);
			// establish jobApp --> job (child -> parent)
			app.setSelectedJob(null);
			}catch(RuntimeException e) {
				System.out.println(e);
			}
		}
		
    
    
    
    
    
    
    
}


