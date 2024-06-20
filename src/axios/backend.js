import axios from 'axios';

const backendURL = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://54.225.3.62/api",
});

backendURL.interceptors.request.use(
  (config) => {
    let lang;
    try {
      lang = localStorage.getItem("lang_api");
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }

    if (lang) {
      config.headers.lang = lang;
    } else {
      delete config.headers.lang;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default backendURL;
