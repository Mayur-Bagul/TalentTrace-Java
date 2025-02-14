package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="companies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = "jobs")
public class Company extends BaseEntity { 
    @Column(length=50, unique = true)
    private String companyName;
    @Column(length=50, nullable=false)
    private String description;
    @Column(length=50, nullable=false)
    private String website;
    @Column(length=50, nullable=false)
    private String location;
    
    @OneToMany(mappedBy = "selectedCompany", cascade = CascadeType.ALL, orphanRemoval = true )
    private List<Jobs> jobs = new ArrayList<>();

//	public Company(String companyName, String description, String website, String location) {
//		super();
//		this.companyName = companyName;
//		this.description = description;
//		this.website = website;
//		this.location = location;
//	}
	
	// add helper method in the entity layer to establish bi-dir association between company and jobs
	
	
	public void addJob(Jobs job) {
		// establish company --> job (parent --> child)
		this.jobs.add(job);
		// establish job --> company (child -> parent)
		job.setSelectedCompany(this);
	}
	
	public void removeJob(Jobs job) {
		// establish company --> job (parent --> child)
		this.jobs.remove(job);
		// establish job --> company (child -> parent)
		job.setSelectedCompany(null);
	}
    
    
    
    
}
