import axios from "axios";
const { BASEURL } = require("@/constant/apiUrls");

const axiosPrivateInstance = axios.create({
  baseURL: BASEURL,
  timeout: 1000,
});

export default axiosPrivateInstance;
