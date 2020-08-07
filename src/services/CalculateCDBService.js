import axios from "axios";
// const url = 'https://api-calculadora-cdb.herokuapp.com';
 const url = 'http://localhost:3000';
export default {
  calculate(dataToCalc) {
    return axios
      .post(`${url}/cdb/calculate-price`, dataToCalc)
      .then((res) => res.data)
      .catch((err) => err.response.data);
  },
};
