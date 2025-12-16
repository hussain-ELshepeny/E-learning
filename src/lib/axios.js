import axios from "axios"

const api = axios.create({
  baseURL: "https://edu-master-psi.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
})

export default api
