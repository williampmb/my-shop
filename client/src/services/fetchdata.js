import axios from "axios";

axios.defaults.withCredentials = true;

const abortCont = new AbortController();
const proxy = "http://localhost:3000";

const getRequest = (path, token) => {
  let headers = {};
  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return fetch(`${proxy}${path}`, {
    method: "GET",
    headers,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      console.log(response);
      throw Error(response);
    })
    .then((response) => {
      console.log("Getting data from server", response);

      return response.result;
    })
    .catch((err) => {
      console.log(err);
    });
};

const postRequest = (path, data) => {
  console.log("POST DATA", data);
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

const deleteRequest = (path, data) => {
  return axios
    .post(proxy + path, { ...data })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
    });
};
export { postRequest, getRequest, deleteRequest };
