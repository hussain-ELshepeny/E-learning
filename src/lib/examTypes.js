// Question types (بدل union type)
const QuestionType = {
  MULTIPLE_CHOICE: "multiple-choice",
  TRUE_FALSE: "true-false",
  SHORT_ANSWER: "short-answer",
};

// Exam status
const ExamStatus = {
  IN_PROGRESS: "in-progress",
  SUBMITTED: "submitted",
  EXPIRED: "expired",
};

// Question example
const question = {
  id: 1,
  type: QuestionType.MULTIPLE_CHOICE,
  text: "What is HTML?",
  options: ["Programming Language", "Markup Language"],
  correctAnswer: "Markup Language",
};

// Answer example
const answer = {
  questionId: 1,
  value: "Markup Language", // string | boolean | null
};

// Exam state example
const examState = {
  status: ExamStatus.IN_PROGRESS,
  currentQuestionIndex: 0,
  answers: [],
  score: null,
  totalQuestions: 10,
  startTime: Date.now(),
  duration: 1800, // seconds
};
