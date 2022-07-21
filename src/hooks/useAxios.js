import axios from "axios";

const UseAxios = (url, pam, callback, method = "get", data) => {
  axios
    .request({ method, url, data })
    .then((res) => callback(pam === "" ? res.data : res.data[`${pam}`]))
    .catch((error) => console.log(error));
};
export default UseAxios;
