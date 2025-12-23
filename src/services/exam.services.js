import api from "../lib/axios"

// Get all exams with filters
export const getExamsRequest = async (filters = {}) => {
  const queryParams = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      queryParams.append(key, value)
    }
  })

  const queryString = queryParams.toString()
  const url = `/exam${queryString ? `?${queryString}` : ""}`

  const { data } = await api.get(url)
  return data
}

// Get single exam by ID
export const getExamByIdRequest = async (id) => {
  const { data } = await api.get(`/exam/${id}`)
  return data
}

// Create new exam
export const createExamRequest = async (examData) => {
  const { data } = await api.post("/exam", examData)
  return data
}

// Update exam
export const updateExamRequest = async ({ id, data: examData }) => {
  const { data } = await api.put(`/exam/${id}`, examData)
  return data
}

// Delete exam
export const deleteExamRequest = async (id) => {
  const { data } = await api.delete(`/exam/${id}`)
  return data
}