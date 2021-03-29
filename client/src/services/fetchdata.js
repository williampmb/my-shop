import axios from "axios";

axios.defaults.withCredentials = true;

const abortCont = new AbortController();
const proxy = "http://localhost:3000";

const getRequest = (path) => {
  return axios
    .get(`${proxy}${path}`)
    .then((response) => {
      localStorage.setItem("csrfToken", response.data.csrfToken);
      return response.data.result;
    })
    .catch((err) => console.log(err));
};

const postRequest = (path, data) => {
  const csrfToken = localStorage.getItem("csrfToken");

  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
  return axios
    .post(`${proxy}${path}`, { ...data, signal: abortCont.signal })
    .then((res) => {
      console.log(`Calling: ${proxy}${path}`);
      return res.data;
    })
    .catch((err) => {
      console.log("ERROR CALLING: ", proxy + path);
      if (err.name === "AbortError") {
        console.log("fetch abort");
      } else {
        console.log(err);
        throw new Error(err);
      }
    });
};
export { postRequest, getRequest };
