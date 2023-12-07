import axios from 'axios';

// Create an baseURL of Axios with a base URL
const backendURL = axios.create({
  baseURL: 'http://34.227.53.7/api', 
});

export default backendURL;