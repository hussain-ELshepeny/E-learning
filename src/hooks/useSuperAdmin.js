import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import api from "../lib/axios"

// API Function
const createAdmin = async (data) => {
  const response = await api.post("/admin/create-admin", data)
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
