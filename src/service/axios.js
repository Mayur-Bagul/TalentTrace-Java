import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/applications', // Adjust the baseURL to your Spring Boot endpoint
});

export default instance;
