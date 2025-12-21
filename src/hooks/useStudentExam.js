import { useEffect, useState } from "react";
import {
  startExam,
  getExamQuestions,
  getRemainingTime,
  submitExam,
  getExamScore,
} from "../services/studentExam";

export default function useStudentExam(examId) {
  const [status, setStatus] = useState("loading");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(null);

  const currentQuestion = questions[currentIndex];
  const isLocked = status !== "inProgress";

  // INIT
  useEffect(() => {
    initExam();
  }, []);

  async function initExam() {
    try {
      await startExam(examId);

      const [qRes, tRes] = await Promise.all([
        getExamQuestions(examId),
        getRemainingTime(examId),
      ]);

      setQuestions(qRes.data);
      setTimeLeft(tRes.data.remainingTime);
      setStatus("inProgress");
    } catch (err) {
      if (err.response?.status === 409) {
        setStatus("submitted");
        fetchScore();
      } else {
        setStatus("error");
      }
    }
  }

  //  TIMER
  useEffect(() => {
    if (status !== "inProgress") return;
    if (timeLeft <= 0) {
      autoSubmit();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, status]);

  //   ANSWERS  
  function answerQuestion(questionId, value) {
    if (isLocked) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }

  //   SUBMIT  
  async function autoSubmit() {
    try {
      await submitExam(examId, answers);
      setStatus("expired");
      fetchScore();
    } catch {
      setStatus("error");
    }
  }

  async function submitManually() {
    try {
      await submitExam(examId, answers);
      setStatus("submitted");
      fetchScore();
    } catch {
      setStatus("error");
    }
  }

  //   SCORE  
  async function fetchScore() {
    const res = await getExamScore(examId);
    setScore(res.data);
  }

  return {
    status,
    questions,
    currentIndex,
    currentQuestion,
    answers,
    timeLeft,
    score,
    isLocked,
    setCurrentIndex,
    answerQuestion,
    submitManually,
  };
}
