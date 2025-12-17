import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { registerRequest } from "../services/auth.services"
// API Function

// Custom Hook
export const useRegister = () => {
  const navigate = useNavigate()

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      toast.success(data.message || "Account created successfully! 🎉")
      // Navigate to login page after successful registration
      navigate("/auth")
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again."
      toast.error(errorMessage)
    },
  })

  return {
    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isLoading: registerMutation.isPending,
    isSuccess: registerMutation.isSuccess,
    isError: registerMutation.isError,
    error: registerMutation.error,
    reset: registerMutation.reset,
  }
}
