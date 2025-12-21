// export default function ExamSidebar({
//     // timeLeft,
//     // status,
//     // answered,
//     // total,
//     onSubmit,
//     disabled,
// }
// ) {
//     const timeLeft = '12:45';
//     const status = 'In Progress'; // Submitted | Time Expired
//     const answered = 6;
//     const total = 10;
// function formatTime(seconds) {
//     const m = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, "0");
//     const s = (seconds % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   }

//     return (
//         <aside className=" max-h-screen bg-surfaceDark p-6 space-y-6 border-l border-[var(--color-primary)]">
//             {/* Timer */}
//             <div className="text-center">
//                 <div className="text-4xl font-bold text-primary">{formatTime(timeLeft)}</div>
//                 <span className="inline-block mt-3 px-4 py-1 rounded-full text-sm bg-primary/20 text-primary">
//                     {status}
//                 </span>
//             </div>


//             {/* Progress */}
//             <div>
//                 <div className="flex justify-between text-sm mb-1">
//                     <span className="text-textSecondary">Answered</span>
//                     <span>{answered} / {total}</span>
//                 </div>
//                 <div className="w-full h-2 bg-surfaceDarker rounded-full overflow-hidden">
//                     <div
//                         className="h-full bg-primary"
//                         style={{ width: `${(answered / total) * 100}%` }}
//                     />
//                 </div>
//             </div>


//             {/* Submit */}
//             <button
//                 onClick={onSubmit}
//                 disabled={disabled}
//                 className="w-full py-3 rounded-xl font-medium bg-primary text-bgDark disabled:opacity-40 disabled:cursor-not-allowed"
//             >
//                 Submit Exam
//             </button>
//         </aside>
//     );
// }

import ExamTimer  from "./ExamTimer";
import  ExamStatus from "./ExamStatus";
import ExamProgress  from "./ExamProgress";
import { Send } from "lucide-react";

export default function ExamSidebar({
  status,
  initialTime,
  answers,
  totalQuestions,
  currentIndex,
  onTimeExpire,
  onSubmit,
})
{
  const isActive = status === "in-progress";

  const answeredCount = answers.filter(
    (a) => a.value !== null && a.value !== ""
  ).length;

  const allAnswered = answeredCount === totalQuestions;

  return (
    <aside className="glass-panel rounded-2xl p-6 space-y-8 sticky top-8 animate-slide-in-right">
      {/* Status */}
      <div className="flex justify-center">
        <ExamStatus status={status} />
      </div>

      {/* Timer */}
      <ExamTimer
        initialTime={initialTime}
        onTimeExpire={onTimeExpire}
        isActive={isActive}
      />

      {/* Divider */}
      <div className="h-px bg-border/50" />

      {/* Progress */}
      <ExamProgress
        answers={answers}
        totalQuestions={totalQuestions}
        currentIndex={currentIndex}
      />

      {/* Divider */}
      <div className="h-px bg-border/50" />

      {/* Submit button */}
      <button
        onClick={onSubmit}
        disabled={!isActive}
        className={`
          w-full py-4 rounded-xl font-semibold text-lg
          flex items-center justify-center gap-2
          transition-all duration-200
          ${
            isActive
              ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
              : "bg-secondary text-muted-foreground cursor-not-allowed"
          }
        `}
      >
        <Send className="w-5 h-5" />
        <span>Submit Exam</span>
      </button>

      {isActive && !allAnswered && (
        <p className="text-sm text-muted-foreground text-center">
          {totalQuestions - answeredCount} question
          {totalQuestions - answeredCount !== 1 ? "s" : ""} unanswered
        </p>
      )}
    </aside>
  );
};
