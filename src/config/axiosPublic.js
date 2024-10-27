import axios from "axios";

const { BASEURL } = require("@/constant/apiUrls");

const axiosPublicInstance = axios.create({
  baseURL: BASEURL,
  timeout: 1000,
});

export default axiosPublicInstance;
