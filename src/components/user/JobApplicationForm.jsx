import React, { useState, useEffect } from 'react';
import '@/App.css';
import axios from 'axios';
import { toast } from 'react-toastify'; // If you want to display success/error notifications

const JobApplicationForm = ({ job, onSubmit, onClose, applicationData }) => {
  const [name, setName] = useState(applicationData ? applicationData.name : '');
  const [email, setEmail] = useState(applicationData ? applicationData.email : '');
  const [coverLetter, setCoverLetter] = useState(applicationData ? applicationData.coverLetter : null);
  const [jobTitle, setJobTitle] = useState(applicationData ? applicationData.jobTitle : job?.title);
  
  // Add axios for submitting the form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('coverLetter', coverLetter);  // Cover letter file
    formData.append('jobTitle', jobTitle);

    try {
      if (applicationData) {
        // If applicationData exists, it's an update request
        const response = await axios.put(`http://localhost:8081/api/applications/${applicationData.id}`, formData);
        toast.success('Application updated successfully!');
      } else {
        // If applicationData doesn't exist, it's a new application
        const response = await axios.post('http://localhost:8081/api/applications', formData);
        toast.success('Application submitted successfully!');
      }

      // After successful submission, trigger onSubmit callback (if you need to update the state elsewhere)
      onSubmit(formData, applicationData ? applicationData.id : null); 
      onClose();  // Close the modal or form after submission
    } catch (error) {
      console.error("Error submitting the application:", error);
      toast.error("Failed to submit the application.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h2>{applicationData ? `Update Application for ${jobTitle}` : `Apply for ${jobTitle}`}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="coverLetter">Cover Letter (Upload File)</label>
            <input
              id="coverLetter"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCoverLetter(e.target.files[0])}
            />
          </div>

          <button type="submit">{applicationData ? 'Update Application' : 'Submit Application'}</button>
        </form>

        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default JobApplicationForm;
