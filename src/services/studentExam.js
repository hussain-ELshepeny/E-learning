import instance from "../api/axios";

export const startExam = (examId) =>
  instance.post(`/studentExams/start/${examId}`);

export const getExamQuestions = (examId) =>
  instance.get(`/studentExams/${examId}/questions`);

export const getRemainingTime = (examId) =>
  instance.get(`/studentExams/exams/remaining-time/${examId}`);

export const submitExam = (examId, answers) =>
  instance.post(`/studentExams/submit/${examId}`, { answers });

export const getExamScore = (examId) =>
  instance.get(`/studentExams/exams/score/${examId}`);
