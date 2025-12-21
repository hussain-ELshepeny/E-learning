import api from "../lib/axios"

// Get all lessons with filters
export const getLessonsRequest = async (params = {}) => {
  const { classLevel, isPaid, title, sortBy, sortOrder } = params

  const queryParams = new URLSearchParams()

  if (classLevel) queryParams.append("classLevel", classLevel)
  if (isPaid !== undefined) queryParams.append("isPaid", isPaid)
  if (title) queryParams.append("title", title)
  if (sortBy) queryParams.append("sortBy", sortBy)
  if (sortOrder) queryParams.append("sortOrder", sortOrder)

  const queryString = queryParams.toString()

  const url = `/lesson${queryString ? `?${queryString}` : ""}`

  const response = await api.get(url)
  return response.data
}

// Create new lesson
export const createLessonRequest = async (lessonData) => {
  const response = await api.post("/lesson", lessonData)
  return response.data
}

// Update lesson
export const updateLessonRequest = async ({ id, data }) => {
  const response = await api.put(`/lesson/${id}`, data)
  return response.data
}

// Delete lesson
export const deleteLessonRequest = async (id) => {
  const response = await api.delete(`/lesson/${id}`)
  return response.data
}

// Get single lesson
export const getLessonByIdRequest = async (id) => {
  const response = await api.get(`/lesson/${id}`)
  return response.data
}
