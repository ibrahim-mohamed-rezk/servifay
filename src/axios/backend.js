import axios from 'axios';

// Create an baseURL of Axios with a base URL
const backendURL = axios.create({
  baseURL: "http://54.225.3.62/api",
  headers: {
    lang: "en",
  },
});

export default backendURL;