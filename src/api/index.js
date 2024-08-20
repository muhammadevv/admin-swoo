import axios from "axios";

const Axios = axios.create({
  baseURL: 'https://construction.pyco.uz/api/v1'
})

export default Axios


