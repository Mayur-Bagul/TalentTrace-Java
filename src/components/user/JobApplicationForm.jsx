// import React, { useState, useEffect } from 'react';
// import '@/App.css';
// import axios from 'axios';
// import { toast } from 'react-toastify'; // If you want to display success/error notifications

// const JobApplicationForm = ({ job, onSubmit, onClose, applicationData }) => {
//   const [name, setName] = useState(applicationData ? applicationData.name : '');
//   const [email, setEmail] = useState(applicationData ? applicationData.email : '');
//   const [coverLetter, setCoverLetter] = useState(applicationData ? applicationData.coverLetter : null);
  
//   // Add axios for submitting the form data
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('coverLetter', coverLetter);  // Cover letter file
    

//     try {
//       if (applicationData) {
//         // If applicationData exists, it's an update request
//         const response = await axios.put(`http://localhost:8081/api/applications/update/${applicationData.id}`, formData);
//         toast.success('Application updated successfully!');
//       } else {
//         // If applicationData doesn't exist, it's a new application
//         const response = await axios.post('http://localhost:8081/api/applications', formData);
//         toast.success('Application submitted successfully!');
//       }

//       // After successful submission, trigger onSubmit callback (if you need to update the state elsewhere)
//       onSubmit(formData, applicationData ? applicationData.id : null); 
//       onClose();  // Close the modal or form after submission
//     } catch (error) {
//       console.error("Error submitting the application:", error);
//       toast.error("Failed to submit the application.");
//     }
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-form">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Your Name</label>
//             <input
//               id="name"
//               type="text"
//               placeholder="Your Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Your Email</label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Your Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="coverLetter">Cover Letter</label>
//             <textarea
//               id="coverLetter"
//               placeholder="Write your cover letter here..."
//               value={coverLetter}
//               onChange={(e) => setCoverLetter(e.target.value)}
//               rows="5"
//               required
//             />
//           </div>

//           <button type="submit">{applicationData ? 'Update Application' : 'Submit Application'}</button>
//         </form>

//         <button className="close-button" onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default JobApplicationForm;





















































































// import React, { useState, useEffect } from 'react';
// import '@/App.css';
// import axios from 'axios';
// import { toast } from 'react-toastify'; 

// const JobApplicationForm = ({ job, onSubmit, onClose, applicationData }) => {
//   const [name, setName] = useState(applicationData ? applicationData.name : '');
//   const [email, setEmail] = useState(applicationData ? applicationData.email : '');
//   const [coverLetter, setCoverLetter] = useState(applicationData ? applicationData.coverLetter : '');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const applicationPayload = {
//       name,
//       email,
//       coverLetter,
//     };
  
//     try {
//       let response;
//       if (applicationData) {
//         response = await axios.put(
//           `http://localhost:8081/api/applications/update/${applicationData.id}`, 
//           applicationPayload, 
//           { headers: { 'Content-Type': 'application/json' } }
//         );
//         toast.success('✅ Application updated successfully!');
//       } else {
//         response = await axios.post(
//           'http://localhost:8081/api/applications', 
//           applicationPayload,
//           { headers: { 'Content-Type': 'application/json' } }
//         );
//         toast.success('✅ Application submitted successfully!');
//       }
  
//       console.log("📩 API Response:", response.data);
//       onSubmit(applicationPayload, applicationData ? applicationData.id : null); 
//       onClose();
//     } catch (error) {
//       console.error("❌ API Error:", error.response?.data || error.message);
//       toast.error(`❌ Failed to submit: ${error.response?.data?.message || 'Unknown error'}`);
//     }
//   };
  

//   return (
//     <div className="popup-overlay">
//       <div className="popup-form">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Your Name</label>
//             <input
//               id="name"
//               type="text"
//               placeholder="Your Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Your Email</label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Your Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="coverLetter">Cover Letter</label>
//             <textarea
//               id="coverLetter"
//               placeholder="Write your cover letter here..."
//               value={coverLetter}
//               onChange={(e) => setCoverLetter(e.target.value)}
//               rows="5"
//               required
//             />
//           </div>

//           <button type="submit">
//             {applicationData ? 'Update Application' : 'Submit Application'}
//           </button>
//         </form>

//         <button className="close-button" onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default JobApplicationForm;












































import React, { useState, useEffect } from 'react';
import '@/App.css';
import axios from 'axios';
import { toast } from 'react-toastify'; 

const JobApplicationForm = ({ job, onSubmit, onClose, applicationData }) => {
  const [name, setName] = useState(applicationData?.name || '');
  const [email, setEmail] = useState(applicationData?.email || '');
  const [coverLetter, setCoverLetter] = useState(applicationData?.coverLetter || '');
  const [jobId, setJobId] = useState(applicationData?.jobId || job?.id || null);

  useEffect(() => {
    if (!jobId) {
      console.error("🚨 Job ID is missing!");
      toast.error("Job ID is required to submit the application.");
    }
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobId) {
      toast.error("Job ID is required.");
      return;
    }

    const applicationPayload = {
      name,
      email,
      coverLetter,
      jobId, // ✅ Ensure jobId is included
    };

    try {
      let response;
      if (applicationData) {
        response = await axios.put(
          `http://localhost:8081/api/applications/update/${applicationData.id}`, 
          applicationPayload, 
          { headers: { 'Content-Type': 'application/json' } }
        );
        toast.success('✅ Application updated successfully!');
      } else {
        response = await axios.post(
          'http://localhost:8081/api/applications', 
          applicationPayload,
          { headers: { 'Content-Type': 'application/json' } }
        );
        toast.success('✅ Application submitted successfully!');
      }

      console.log("📩 API Response:", response.data);
      onSubmit(applicationPayload, applicationData ? applicationData.id : null); 
      onClose();
    } catch (error) {
      console.error("❌ API Error:", error.response?.data || error.message);
      toast.error(`❌ Failed to submit: ${error.response?.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="coverLetter">LinkedIn URL</label>
            <textarea
              id="coverLetter"
              placeholder="Write your cover letter here..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows="5"
              required
            />
          </div>

          <button type="submit">
            {applicationData ? 'Update Application' : 'Submit Application'}
          </button>
        </form>

        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default JobApplicationForm;

























