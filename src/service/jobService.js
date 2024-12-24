// src/jobService.js
import axios from './axios'; // Import the configured Axios instance

const jobService = {
  addJobApplication: (application) => {
    return axios.post('/add', application)
      .then(response => response.data);
  },
  
  getAllJobApplications: () => {
    return axios.get('/all')
      .then(response => response.data);
  },
  
  updateJobApplication: (id, application) => {
    return axios.put(`/update/${id}`, application)
      .then(response => response.data);
  },
  
  deleteJobApplication: (id) => {
    return axios.delete(`/delete/${id}`)
      .then(response => response.data);
  }
};

export default jobService;
