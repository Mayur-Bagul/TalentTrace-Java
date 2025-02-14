










// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const AddJobForm = () => {
//   const {id: jobId } = useParams(); // Get jobId from URL
//   const [job, setJob] = useState(null);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [coverLetter, setCoverLetter] = useState('');

//   useEffect(() => {
//     // Fetch job details if needed
//     axios.get(`http://localhost:8081/Job/${jobId}`)
//       .then(response => setJob(response.data))
//       .catch(error => console.error("Error fetching job:", error));
//   }, [jobId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!jobId) {
//       toast.error("⚠️ Job ID is missing!");
//       return;
//     }

//     try {
//       const response = await axios.post(`http://localhost:8081/Job/${jobId}/apply`, {
//         name,
//         email,
//         coverLetter,
//       });
//       toast.success('✅ Application submitted successfully!');
//       console.log("✅ API Response:", response.data);
//     } catch (error) {
//       console.error("❌ Error submitting application:", error.response?.data || error.message);
//       toast.error("Failed to submit the application.");
//     }
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-form">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Your Name</label>
//             <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Your Email</label>
//             <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="coverLetter">Cover Letter</label>
//             <textarea id="coverLetter" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} required />
//           </div>
//           <button type="submit" className="submit-button">Submit Application</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddJobForm;










import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import UNavbar from '../shared/UserNav';

const AddJobForm = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8081/Job/${jobId}`)
      .then(response => setJob(response.data))
      .catch(error => console.error("Error fetching job:", error));
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobId) {
      toast.error("⚠️ Job ID is missing!");
      return;
    }

    try {
      await axios.post(`http://localhost:8081/Job/${jobId}/apply`, {
        name,
        email,
        coverLetter,
      });

      toast.success('✅ Application submitted successfully!', 
       
      );

      navigate('/user/JobTable'); // Navigate immediately after success

    } catch (error) {
      console.error("❌ Error submitting application:", error.response?.data || error.message);
      toast.error("❌ Failed to submit the application.");
    }
  };

  return (
    <div>
            <UNavbar />
    <div className="popup-overlay">
      <div className="popup-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="coverLetter">LinkedIn URL</label>
            <textarea id="coverLetter" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} required />
          </div>
          <button type="submit" className="submit-button">Submit Application</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddJobForm;
