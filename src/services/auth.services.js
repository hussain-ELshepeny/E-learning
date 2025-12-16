import api from "../lib/axios"

export const loginRequest = async (data) => {
  const response = await api.post("/auth/login", data)
  return response.data
}
