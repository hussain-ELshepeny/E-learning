import { CheckCircle } from "lucide-react";

export default function ExamProgress ({ answers, totalQuestions, currentIndex }) {
  const answeredCount = answers.filter(
    (a) => a.value !== null && a.value !== ""
  ).length;

  const progressPercent = totalQuestions ? (answeredCount / totalQuestions) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="text-foreground font-medium">
          {answeredCount} / {totalQuestions}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question indicators */}
      <div className="flex flex-wrap gap-2 mt-4">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const answer = answers.find((a) => a.questionId === i + 1);
          const isAnswered =
            answer && answer.value !== null && answer.value !== "";

          const isCurrent = i === currentIndex;

          return (
            <div
              key={i}
              className={`
                w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium
                transition-all duration-200
                ${
                  isCurrent
                    ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : isAnswered
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground"
                }
              `}
            >
              {isAnswered ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                i + 1
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
