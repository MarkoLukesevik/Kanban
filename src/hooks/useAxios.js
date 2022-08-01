import axios from "axios";

const UseAxios = (url, callback, method = "get", data) => {
  axios
    .request({ method, url, data })
    .then((res) => callback(res.data))
    .catch((error) => console.error(error));
};
export default UseAxios;
