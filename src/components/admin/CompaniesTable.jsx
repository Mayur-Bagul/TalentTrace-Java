

// import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// import { Edit2, MoreHorizontal } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const CompaniesTable = () => {
//   const [companies, setCompanies] = useState([]);
//   const [filteredCompanies, setFilteredCompanies] = useState([]);
//   const [searchCompanyByText, setSearchCompanyByText] = useState(""); // Local state for search term
//   const navigate = useNavigate();

//   // Fetch companies from the API
//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const response = await axios.get('http://localhost:8081/companies/all'); // Replace with your actual endpoint
//         console.log("Fetched companies:", response.data);  // Debugging: Check the structure of the response
//         setCompanies(response.data); // Store the fetched companies
//       } catch (error) {
//         console.error("Failed to fetch companies", error);
//       }
//     };

//     fetchCompanies();
//   }, []);

//   // Filter companies based on search term
//   useEffect(() => {
//     const filteredCompany = companies.filter((company) => {
//       if (!searchCompanyByText) {
//         return true; // If no search term, show all companies
//       }
//       return company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase());
//     });
//     setFilteredCompanies(filteredCompany);
//   }, [companies, searchCompanyByText]);

//   return (
//     <div>
//       <div className="flex justify-between my-4">
//         <input
//           type="text"
//           placeholder="Search by company name"
//           value={searchCompanyByText}
//           onChange={(e) => setSearchCompanyByText(e.target.value)}
//           className="input input-bordered w-1/3"
//         />
//       </div>
//       <Table>
//         <TableCaption>A list of your recent registered companies</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Website</TableHead>
//             <TableHead>Location</TableHead> {/* Replaced Date with Location */}
//             <TableHead>Description</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filteredCompanies?.map((company) => (
//             <TableRow key={company.id}>
//               <TableCell>{company.companyName}</TableCell>
//               <TableCell>{company.website}</TableCell>
//               <TableCell>
//                 {/* Ensure location exists and display it properly */}
//                 {company.location || "Location Not Available"} {/* Default text in case location is missing */}
//               </TableCell>
//               <TableCell>{company.description}</TableCell>
//               <TableCell className="text-right cursor-pointer">
//                 <Popover>
//                   <PopoverTrigger>
//                     <MoreHorizontal />
//                   </PopoverTrigger>
//                   <PopoverContent className="w-32">
//                     <div
//                       onClick={() => navigate(`/setCompanies/${company.id}`)}
//                       className="flex items-center gap-2 w-fit cursor-pointer"
//                     >
//                       <Edit2 className="w-4" />
//                       <span>Edit</span>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default CompaniesTable;






















// import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const CompaniesTable = () => {
//   const [companies, setCompanies] = useState([]);
//   const [filteredCompanies, setFilteredCompanies] = useState([]);
//   const [searchCompanyByText, setSearchCompanyByText] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const response = await axios.get('http://localhost:8081/companies/all');
//         setCompanies(response.data);
//       } catch (error) {
//         console.error("Failed to fetch companies", error);
//       }
//     };
//     fetchCompanies();
//   }, []);

//   useEffect(() => {
//     const filteredCompany = companies.filter((company) =>
//       searchCompanyByText
//         ? company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase())
//         : true
//     );
//     setFilteredCompanies(filteredCompany);
//   }, [companies, searchCompanyByText]);

//   const handleDelete = (id) => {
//     // Add delete functionality here
//     console.log("Delete company with ID:", id);
//   };

//   return (
//     <div className="p-4 shadow-lg border border-gray-300 rounded-lg bg-white">
//       <h2 className="text-lg font-semibold text-center mb-4">List of Registered Companies</h2>
//       <div className="flex justify-between my-4">
//         <input
//           type="text"
//           placeholder="Search by company name"
//           value={searchCompanyByText}
//           onChange={(e) => setSearchCompanyByText(e.target.value)}
//           className="input input-bordered w-1/3 p-2 border border-gray-300 rounded-md"
//         />
//       </div>
//       <Table className="border border-gray-300 shadow-md rounded-lg overflow-hidden">
//         <TableHeader className="bg-gray-100">
//           <TableRow>
//             <TableHead className="text-center border-b">Name</TableHead>
//             <TableHead className="text-center border-b">Location</TableHead>
//             <TableHead className="text-center border-b">Website</TableHead>
//             <TableHead className="text-center border-b">Description</TableHead>
//             <TableHead className="text-center border-b">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filteredCompanies?.map((company, index) => (
//             <TableRow key={company.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
//               <TableCell className="text-center border-b">{company.companyName}</TableCell>
//               <TableCell className="text-center border-b">{company.location || "Not Available"}</TableCell>
//               <TableCell className="text-center border-b">
//                 {company.website ? (
//                   <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
//                     {company.website}
//                   </a>
//                 ) : (
//                   "Not Available"
//                 )}
//               </TableCell>
//               <TableCell className="text-center border-b">{company.description || "No Description Available"}</TableCell>
//               <TableCell className="text-center border-b cursor-pointer">
//                 <Popover>
//                   <PopoverTrigger>
//                     <MoreHorizontal />
//                   </PopoverTrigger>
//                   <PopoverContent className="w-32">
//                     <div
//                       onClick={() => navigate(`/setCompanies/${company.id}`)}
//                       className="flex items-center gap-2 w-fit cursor-pointer text-blue-500"
//                     >
//                       <Edit2 className="w-4" />
//                       <span>Edit</span>
//                     </div>
//                     <div
//                       onClick={() => handleDelete(company.id)}
//                       className="flex items-center gap-2 w-fit cursor-pointer text-red-500 mt-2"
//                     >
//                       <Trash2 className="w-4" />
//                       <span>Delete</span>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default CompaniesTable;







































import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchCompanyByText, setSearchCompanyByText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8081/companies/all');
        setCompanies(response.data);
      } catch (error) {
        console.error("Failed to fetch companies", error);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    const filteredCompany = companies.filter((company) =>
      searchCompanyByText
        ? company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        : true
    );
    setFilteredCompanies(filteredCompany);
  }, [companies, searchCompanyByText]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/companies/delete/${id}`);
      setCompanies(companies.filter(company => company.id !== id));
    } catch (error) {
      console.error("Failed to delete company", error);
    }
  };

  return (
    <div className="p-4 shadow-lg border border-gray-300 rounded-lg bg-white">
      <h2 className="text-lg font-semibold text-center mb-4">List of Registered Companies</h2>
      <div className="flex justify-between my-4">
        <input
          type="text"
          placeholder="Search by company name"
          value={searchCompanyByText}
          onChange={(e) => setSearchCompanyByText(e.target.value)}
          className="input input-bordered w-1/3 p-2 border border-gray-300 rounded-md"
        />
      </div>
      <Table className="border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-center border-b">Name</TableHead>
            <TableHead className="text-center border-b">Location</TableHead>
            <TableHead className="text-center border-b">Website</TableHead>
            <TableHead className="text-center border-b">Description</TableHead>
            <TableHead className="text-center border-b">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies?.map((company, index) => (
            <TableRow key={company.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <TableCell className="text-center border-b">{company.companyName}</TableCell>
              <TableCell className="text-center border-b">{company.location || "Not Available"}</TableCell>
              <TableCell className="text-center border-b">
                {company.website ? (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {company.website}
                  </a>
                ) : (
                  "Not Available"
                )}
              </TableCell>
              <TableCell className="text-center border-b">{company.description || "No Description Available"}</TableCell>
              <TableCell className="text-center border-b cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/setCompanies/${company.id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer text-blue-500"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => handleDelete(company.id)}
                      className="flex items-center gap-2 w-fit cursor-pointer text-red-500 mt-2"
                    >
                      <Trash2 className="w-4" />
                      <span>Delete</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
