import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import {
    getLessonsRequest,
    createLessonRequest,
    updateLessonRequest,
    deleteLessonRequest,
    getLessonByIdRequest, getMyPurchasedLessons,PayLesson
} from "../services/lesson.services"


export const useGetLessons = (filters = {}) => {
  return useQuery({
    queryKey: ["lessons", filters], // t-p // p-jacket
    queryFn: () => getLessonsRequest(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })
}

export const useGetMyPurchasedLessons = () => {
    return useQuery({
        queryKey: ["PurchasedLessons"],
        queryFn: () => getMyPurchasedLessons(),
    })
}

export const useGetLessonById = (id) => {
  return useQuery({
    queryKey: ["lesson", id],
    queryFn: () => getLessonByIdRequest(id),
    enabled: !!id,
  })
}


export const useCreateLesson = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createLessonRequest,
    onSuccess: (data) => {
      toast.success(data.message || "Lesson created successfully! 🎉")
      queryClient.invalidateQueries({ queryKey: ["lessons"] })
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create lesson"
      toast.error(errorMessage)
    },
  })

  return {
    createLesson: mutation.mutate,
    createLessonAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  }
}


export const useUpdateLesson = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateLessonRequest,
    onSuccess: (data) => {
      toast.success(data.message || "Lesson updated successfully! ✨")
      queryClient.invalidateQueries({ queryKey: ["lessons"] })
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update lesson"
      toast.error(errorMessage)
    },
  })

  return {
    updateLesson: mutation.mutate,
    updateLessonAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  }
}


export const useDeleteLesson = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteLessonRequest,
    onSuccess: (data) => {
      toast.success(data.message || "Lesson deleted successfully! 🗑️")
      queryClient.invalidateQueries({ queryKey: ["lessons"] })
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete lesson"
      toast.error(errorMessage)
    },
  })

  return {
    deleteLesson: mutation.mutate,
    deleteLessonAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  }
}

export const usePayLesson = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: PayLesson,
        onSuccess: (data) => {
            toast.success(data.message || "Redirecting to payment…");
            if (data.url) {
                window.location.href = data.url;
            }
            queryClient.invalidateQueries({ queryKey: ["lessons"] });
        },
        onError: (error) => {
            const errorMessage =
                error.response?.data?.message || "Failed to initiate payment";
            toast.error(errorMessage);
        },
    });

    return {
        payLesson: mutation.mutate,
        payLessonAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
        reset: mutation.reset,
    };
};