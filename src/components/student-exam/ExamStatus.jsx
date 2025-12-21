import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export default function ExamStatusBadge({ status }) {
  const statusConfig = {
    "in-progress": {
      label: "In Progress",
      icon: Clock,
      className: "in-progress",
    },
    submitted: {
      label: "Submitted",
      icon: CheckCircle2,
      className: "submitted",
    },
    expired: {
      label: "Time Expired",
      icon: AlertTriangle,
      className: "expired",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`status-badge ${config.className} flex items-center gap-2`}>
      <Icon className="w-4 h-4" />
      <span>{config.label}</span>
    </div>
  );
};
