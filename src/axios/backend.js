import axios from 'axios';

// Create an baseURL of Axios with a base URL
const backendURL = axios.create({
  baseURL: "http://54.196.133.53/api",
});

export default backendURL;