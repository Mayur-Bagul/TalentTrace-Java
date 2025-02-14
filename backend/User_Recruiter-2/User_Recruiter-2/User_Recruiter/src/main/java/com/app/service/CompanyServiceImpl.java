package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.CompanyDao;
import com.app.dto.ApiResponse;
import com.app.dto.CompanyDTO;
import com.app.dto.CompanyJobsDTO;
import com.app.entities.Company;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
@Service
@Transactional
public class CompanyServiceImpl implements CompanyService { 
	
	
	@Autowired 
	CompanyDao companyDao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	
	/*
	@Override
	public String addCompany(CompanyDTO companyDTO) {
		Company comp = modelMapper.map(companyDTO, Company.class);
		companyRepository.save(comp);
		return new ApiResponse("company added successfully");
	}*/
	
	 @Override
	    public ApiResponse addCompany(CompanyDTO companyDTO) {
		 Company comp = modelMapper.map(companyDTO, Company.class);
		 companyDao.save(comp);
	        return new ApiResponse("Company added successfully!");
	    }

	@Override
	public List<CompanyDTO> getAllCompanies() {
		
		return companyDao.findAll()
				.stream()
				.map(comp -> modelMapper.map(comp, CompanyDTO.class))
				.collect(Collectors.toList());
	
	}

	@Override
	public CompanyDTO getCompanyDetails(@Min(1) @Max(10) Long id) {
		 Company comp = companyDao.findById(id)
		            .orElseThrow(() -> new ResourceNotFoundException("Company not found with id: " + id));

		    // Map the Company entity to CompanyDTO
		    return modelMapper.map(comp, CompanyDTO.class);
	}

	@Override
	public ApiResponse updateCompany(Long id, CompanyDTO companyDTO) {
		//Company com = companyDao.findById(id)
		Company com = companyDao.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("company not found with id:" +id));
		
		com.setCompanyName(companyDTO.getCompanyName());
		com.setDescription(companyDTO.getDescription());
		com.setLocation(companyDTO.getLocation());
		com.setWebsite(companyDTO.getWebsite());
		
		return new ApiResponse("company updated successfully");
	}

	@Override
	public ApiResponse deleteCompany(Long id) {
		if (companyDao.existsById(id)) {
			companyDao.deleteById(id);
			return new ApiResponse("company deleted successfully");
		}
		throw new ResourceNotFoundException("company not found with id" +id);
	}

	@Override
	public CompanyJobsDTO getCompanyAndJobDetail(Long compId) {
		
		// return company + job dtls
		Company companyEnt = companyDao.getCompanyAndJobs(compId)
				.orElseThrow(() -> new ResourceNotFoundException("invalid company id"));
		//CompanyJobsDTO cmp = new CompanyJobsDTO();
		return modelMapper.map(companyEnt, CompanyJobsDTO.class);
		
	}

}
