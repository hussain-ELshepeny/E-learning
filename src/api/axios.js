// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://edu-master-psi.vercel.app/api/v1/questions/get/:questionId", 
   headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
