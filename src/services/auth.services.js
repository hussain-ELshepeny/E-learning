import api from "../lib/axios"

const loginRequest = async (data) => {
  const response = await api.post("/auth/login", data)
  return response.data
}
const registerRequest = async (data) => {
  const response = await api.post("/auth/signup", data)
  return response.data
}

export { loginRequest, registerRequest }
