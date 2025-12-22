import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import {
  getExamsRequest,
  createExamRequest,
  updateExamRequest,
  deleteExamRequest,
  getExamByIdRequest,
} from "../services/exam.services"

// Get all exams with filters
export const useGetExams = (filters = {}) => {
  return useQuery({
    queryKey: ["exams", filters],
    queryFn: () => getExamsRequest(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })
}

// Get single exam by ID
export const useGetExamById = (id) => {
  return useQuery({
    queryKey: ["exam", id],
    queryFn: () => getExamByIdRequest(id),
    enabled: !!id,
  })
}

// Create new exam
export const useCreateExam = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createExamRequest,
    onSuccess: (data) => {
      toast.success(data.message || "Exam created successfully! ")
      queryClient.invalidateQueries({ queryKey: ["exams"] })
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create exam"
      toast.error(errorMessage)
    },
  })

  return {
    createExam: mutation.mutate,
    createExamAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  }
}

// Update exam
export const useUpdateExam = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateExamRequest,
    onSuccess: (data) => {
      toast.success(data.message || "Exam updated successfully! ")
      queryClient.invalidateQueries({ queryKey: ["exams"] })
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update exam"
      toast.error(errorMessage)
    },
  })

  return {
    updateExam: mutation.mutate,
    updateExamAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  }
}

// Delete exam
export const useDeleteExam = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteExamRequest,
    onSuccess: (data) => {
      toast.success(data.message || "Exam deleted successfully! ")
      queryClient.invalidateQueries({ queryKey: ["exams"] })
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete exam"
      toast.error(errorMessage)
    },
  })

  return {
    deleteExam: mutation.mutate,
    deletExamAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  }
}