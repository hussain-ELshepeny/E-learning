import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function ExamTimer ({ initialTime, onTimeExpire, isActive }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft <= 60;
  const isCritical = timeLeft <= 30;

  const progress = (timeLeft / initialTime) * 100;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="w-5 h-5" />
        <span className="text-sm font-medium uppercase tracking-wide">
          Time Remaining
        </span>
      </div>

      <div className="relative">
        {/* Circular progress background */}
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="hsl(var(--border))"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={
              isCritical
                ? "hsl(var(--destructive))"
                : isLowTime
                ? "hsl(var(--warning))"
                : "hsl(var(--primary))"
            }
            strokeWidth="6"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="progress-ring transition-all duration-1000"
          />
        </svg>

        {/* Timer display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`timer-display ${
              isCritical
                ? "text-destructive animate-countdown-pulse"
                : isLowTime
                ? "text-warning"
                : "text-primary"
            }`}
          >
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </span>
        </div>
      </div>

      {isLowTime && (
        <p
          className={`text-sm font-medium ${
            isCritical ? "text-destructive" : "text-warning"
          }`}
        >
          {isCritical ? "Hurry! Time almost up!" : "Less than 1 minute left"}
        </p>
      )}
    </div>
  );
};
