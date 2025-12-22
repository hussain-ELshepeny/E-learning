import { Trophy, CheckCircle, XCircle, Award } from "lucide-react";

export const ScoreSummary = ({
  score,
  totalQuestions,
  answers,
  questions,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { label: "Excellent", color: "text-primary" };
    if (percentage >= 80) return { label: "Great", color: "text-primary" };
    if (percentage >= 70) return { label: "Good", color: "text-warning" };
    if (percentage >= 60) return { label: "Passing", color: "text-warning" };
    return {
      label: "Needs Improvement",
      color: "text-destructive",
    };
  };

  const grade = getGrade();

  return (
    <div className="glass-panel rounded-2xl p-8 max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
          Exam Completed!
        </h2>
        <p className="text-muted-foreground">
          Here's your performance summary
        </p>
      </div>

      {/* Score display */}
      <div className="bg-secondary/50 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-6xl font-heading font-bold text-primary mb-2">
              {score}/{totalQuestions}
            </div>
            <p className="text-muted-foreground">Correct Answers</p>
          </div>

          <div className="h-20 w-px bg-border/50" />

          <div className="text-center">
            <div className="text-6xl font-heading font-bold text-foreground mb-2">
              {percentage}%
            </div>
            <p className={`font-medium ${grade.color}`}>
              {grade.label}
            </p>
          </div>
        </div>
      </div>

      {/* Question breakdown */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Question Breakdown
        </h3>

        {questions.map((question, index) => {
          const answer = answers.find(
            (a) => a.questionId === question.id
          );

          const isCorrect =
            question.type === "short-answer"
              ? String(answer?.value || "")
                  .toLowerCase()
                  .trim() ===
                String(question.correctAnswer || "")
                  .toLowerCase()
                  .trim()
              : answer?.value === question.correctAnswer;

          return (
            <div
              key={question.id}
              className={`
                flex items-center gap-3 p-3 rounded-xl
                ${isCorrect ? "bg-primary/10" : "bg-destructive/10"}
              `}
            >
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              )}

              <span className="text-sm text-foreground/80 line-clamp-1 flex-1">
                Q{index + 1}: {question.text}
              </span>

              <span
                className={`text-sm font-medium ${
                  isCorrect ? "text-primary" : "text-destructive"
                }`}
              >
                {isCorrect ? "Correct" : "Incorrect"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
