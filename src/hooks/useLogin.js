import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { loginRequest } from "../services/auth.services"
import toast from "react-hot-toast"

export function useLogin() {
  function redirect(role) {
    if (role === "super-admin") {
      navigate("/super")
    } else if (role === "admin") {
      navigate("/dashboard")
    } else if (role === "user") navigate("/")
  }
  const navigate = useNavigate()

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      toast.success("Login success")
      // Store token if needed
      localStorage.setItem("token", data.token)
      // Redirect to dashboard
      redirect(data.role)
    },
    onError: (error) => {
      toast.error("Login error:", error.response?.data)
    },
  })
}
