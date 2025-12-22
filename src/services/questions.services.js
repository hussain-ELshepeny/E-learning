import api from "../lib/axios";

const getAllQuestions = async () => {
  const response = await api.get("/question");
  return response.data;
};
const getSpecificQuestion = async (id) => {
  const response = await api.get(`/question/get/${id}`);
  return response.data;
};
const addQuestion = async (data) => {
  const response = await api.post("/question", data);
  return response.data;
};
const updateQuestion = async ({
  id,
  text,
  type,
  options,
  correctAnswer,
  exam,
  points,
}) => {
  const response = await api.put(`/question/${id}`, {
    text,
    type,
    options,
    correctAnswer,
    exam,
    points,
  });
  return response.data;
};
const deleteQuestion = async (id) => {
  const response = await api.delete(`/question/${id}`);
  return response;
};
export {
  getAllQuestions,
  getSpecificQuestion,
  addQuestion,
  updateQuestion,
  deleteQuestion,
};
