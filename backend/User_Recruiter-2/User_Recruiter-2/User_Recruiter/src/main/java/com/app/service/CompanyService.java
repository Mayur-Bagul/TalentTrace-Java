package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.CompanyDTO;
import com.app.dto.CompanyJobsDTO;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public interface CompanyService {

    ApiResponse addCompany(CompanyDTO companyDTO);

    List<CompanyDTO> getAllCompanies();

    CompanyDTO getCompanyDetails(@Min(1) @Max(10) Long compId);

    ApiResponse updateCompany(Long id, CompanyDTO companyDTO);
   
    ApiResponse deleteCompany(Long id);

    CompanyJobsDTO getCompanyAndJobDetail(Long compId);
    
    
}
