import { useState, useRef, useEffect } from "react";
import { Filter, X, ChevronDown } from "lucide-react";

const ExamFilters = ({ filters, onFilterChange, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  const classLevels = [
    { value: "", label: "All Levels" },
    { value: "1", label: "Grade 1" },
    { value: "2", label: "Grade 2" },
    { value: "3", label: "Grade 3" },
  ];

  const examTypes = [
    { value: "", label: "All Types" },
    { value: "quiz", label: "Quiz" },
    { value: "midterm", label: "Midterm" },
    { value: "final", label: "Final" },
    { value: "practice", label: "Practice" },
  ];

  const statuses = [
    { value: "", label: "All Status" },
    { value: "draft", label: "Draft" },
    { value: "active", label: "Active" },
    { value: "scheduled", label: "Scheduled" },
    { value: "completed", label: "Completed" },
  ];

  const sortOptions = [
    { value: "", label: "Default" },
    { value: "title", label: "Title" },
    { value: "createdAt", label: "Created Date" },
    { value: "startDate", label: "Start Date" },
    { value: "duration", label: "Duration" },
    { value: "totalMarks", label: "Total Marks" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border 
                   transition-all duration-200
                   ${
                     hasActiveFilters
                       ? "border-primary bg-primary/10 text-primary"
                       : "border-border-dark bg-background-card text-text-secondary hover:text-white hover:border-primary/50"
                   }`}
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-background-dark text-xs font-bold">
            {Object.values(filters).filter((v) => v !== "").length}
          </span>
        )}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-80 p-4 rounded-xl 
                       bg-background-card border border-border-dark shadow-xl z-50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Filter Exams</h3>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  onReset();
                  setIsOpen(false);
                }}
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Class Level */}
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">
                Class Level
              </label>
              <select
                value={filters.classLevel}
                onChange={(e) =>
                  onFilterChange({ ...filters, classLevel: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-background-dark border border-border-dark
                          text-white focus:border-primary focus:outline-none transition-colors"
              >
                {classLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Exam Type */}
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">
                Exam Type
              </label>
              <select
                value={filters.examType}
                onChange={(e) =>
                  onFilterChange({ ...filters, examType: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-background-dark border border-border-dark
                          text-white focus:border-primary focus:outline-none transition-colors"
              >
                {examTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  onFilterChange({ ...filters, status: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-background-dark border border-border-dark
                          text-white focus:border-primary focus:outline-none transition-colors"
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    onFilterChange({ ...filters, sortBy: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-background-dark border border-border-dark
                            text-white focus:border-primary focus:outline-none transition-colors"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  Order
                </label>
                <select
                  value={filters.sortOrder}
                  onChange={(e) =>
                    onFilterChange({ ...filters, sortOrder: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-background-dark border border-border-dark
                            text-white focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Default</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 py-2 rounded-lg bg-primary text-background-dark font-semibold
                      hover:bg-primary/90 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamFilters;
