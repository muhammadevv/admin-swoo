import axios from "axios";

const Axios = axios.create({
  baseURL: 'https://blogsites.pythonanywhere.com/api'
})
export default Axios


