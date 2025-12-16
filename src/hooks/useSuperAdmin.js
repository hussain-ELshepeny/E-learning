import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

// API Function
const createAdmin = async (data) => {
  const token = localStorage.getItem("token")

  const response = await axios.post(
    "https://edu-master-psi.vercel.app/admin/create-admin",
    data,
    {
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  )
  console.log(response.data) // why isn't working 
  return response.data
}

// Custom Hook
export const useSuperAdmin = () => {
  const createAdminMutation = useMutation({
    mutationFn: createAdmin,
    onSuccess: (data) => {
      toast.success(data.message || "Admin created successfully! 🎉")
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create admin. Please try again."
      toast.error(errorMessage)
    },
  })

  return {
    createAdmin: createAdminMutation.mutate,
    createAdminAsync: createAdminMutation.mutateAsync,
    isLoading: createAdminMutation.isPending,
    isSuccess: createAdminMutation.isSuccess,
    isError: createAdminMutation.isError,
    error: createAdminMutation.error,
    reset: createAdminMutation.reset,
  }
}
