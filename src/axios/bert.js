import axios from "axios";

// Create an baseURL of Axios with a base URL
const bertURL = axios.create({
  baseURL: " http://127.0.0.1:8000",
});

export default bertURL;
