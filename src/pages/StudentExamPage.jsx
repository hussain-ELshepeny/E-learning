import ExamHeader from "../components/student-exam/ExamHeader";
import ExamSidebar from "../components/student-exam/ExamSidebar";
import QuestionCard from "../components/student-exam/QuestionCard";
import useStudentExam from "../hooks/useStudentExam";

export default function StudentExamPage({ examId }) {
    const {
        // status,
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
    } = useStudentExam(examId);

    const status = "In progress";
    if (status === "loading") return <p>Loading exam...</p>;
    if (status === "error") return <p>Something went wrong</p>;

    return (
        <main className="flex h-screen w-full max-w-[1200px] flex-col pt-24 lg:pt-32 pb-10">
            <ExamHeader
                title="JavaScript Fundamentals Exam"
                description="Answer all questions within the given time."
            />
            <section className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
                <QuestionCard
                    question={currentQuestion}
                    index={currentIndex}
                    total={questions.length}
                    answer={answers[currentQuestion._id]}
                    onAnswer={answerQuestion}
                    disabled={isLocked}
                />
                <ExamSidebar
                    timeLeft={timeLeft}
                    total={questions.length}
                    current={currentIndex}
                    onPrev={() => setCurrentIndex((i) => i - 1)}
                    onNext={() => setCurrentIndex((i) => i + 1)}
                    onSubmit={submitManually}
                    disabled={isLocked}
                    status={status}
                    answered={Object.keys(answers).length}
                />
            </section>

            {score && (
                <div>
                    Score: {score.score} / {score.total}
                </div>
            )}
        </main>
    );
}