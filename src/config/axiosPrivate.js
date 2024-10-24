const { BASEURL } = require("@/constant/apiUrls");

const axiosPrivateInstance = axios.create({
  baseURL: BASEURL,
  timeout: 1000,
  headers: { authenticated: "token" },
});

export default axiosPrivateInstance;
