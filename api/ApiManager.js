import axios from "axios";

const ApiManager = axios.create({
  baseURL: "https://app.tseh85.com/Service/api",
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;
