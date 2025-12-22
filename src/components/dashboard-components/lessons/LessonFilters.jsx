import { useState } from "react"
import { Filter, X, RotateCcw } from "lucide-react"

const CLASS_LEVELS = [
  "Grade 1 Primary",
  "Grade 2 Primary",
  "Grade 3 Primary",
  "Grade 4 Primary",
  "Grade 5 Primary",
  "Grade 6 Primary",
  "Grade 1 Preparatory",
  "Grade 2 Preparatory",
  "Grade 3 Preparatory",
  "Grade 1 Secondary",
  "Grade 2 Secondary",
  "Grade 3 Secondary",
]

const LessonFilters = ({ filters, onFilterChange, onReset }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const activeFiltersCount = Object.values(filters).filter(
    (v) => v !== "" && v !== undefined
  ).length

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg
                  bg-surface-darker text-white border border-surface-dark
                  hover:border-primary transition-all duration-200"
      >
        <Filter className="w-5 h-5" />
        Filters
        {activeFiltersCount > 0 && (
          <span
            className="w-5 h-5 rounded-full bg-primary text-background-dark
                          text-xs font-semibold flex items-center justify-center"
          >
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Filter Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div
            className="absolute right-0 top-full mt-2 w-80 glass-panel rounded-xl
                         border border-surface-dark shadow-2xl z-20
                         animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="flex items-center justify-between p-4 border-b border-surface-dark">
              <h3 className="font-semibold text-white">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-surface-darker transition-colors"
              >
                <X className="w-4 h-4 text-text-secondary" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Class Level */}
              <div>
                <label className="text-sm text-text-secondary mb-2 block">
                  Class Level
                </label>
                <select
                  value={filters.classLevel || ""}
                  onChange={(e) => handleChange("classLevel", e.target.value)}
                  className="w-full px-3 py-2 bg-surface-darker rounded-lg
                            text-white border border-surface-dark
                            focus:border-primary focus:outline-none
                            transition-all duration-200"
                >
                  <option value="">All Levels</option>
                  {CLASS_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Status */}
              <div>
                <label className="text-sm text-text-secondary mb-2 block">
                  Payment Status
                </label>
                <select
                  value={filters.isPaid ?? ""}
                  onChange={(e) => handleChange("isPaid", e.target.value)}
                  className="w-full px-3 py-2 bg-surface-darker rounded-lg
                            text-white border border-surface-dark
                            focus:border-primary focus:outline-none
                            transition-all duration-200"
                >
                  <option value="">All</option>
                  <option value="true">Paid</option>
                  <option value="false">Free</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="text-sm text-text-secondary mb-2 block">
                  Sort By
                </label>
                <select
                  value={filters.sortBy || ""}
                  onChange={(e) => handleChange("sortBy", e.target.value)}
                  className="w-full px-3 py-2 bg-surface-darker rounded-lg
                            text-white border border-surface-dark
                            focus:border-primary focus:outline-none
                            transition-all duration-200"
                >
                  <option value="">Default</option>
                  <option value="title">Title</option>
                  <option value="price">Price</option>
                  <option value="scheduledDate">Scheduled Date</option>
                  <option value="createdAt">Created Date</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="text-sm text-text-secondary mb-2 block">
                  Sort Order
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleChange("sortOrder", "asc")}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium
                               transition-all duration-200
                               ${
                                 filters.sortOrder === "asc"
                                   ? "bg-primary text-background-dark"
                                   : "bg-surface-darker text-white hover:bg-primary/20"
                               }`}
                  >
                    Ascending
                  </button>
                  <button
                    onClick={() => handleChange("sortOrder", "desc")}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium
                               transition-all duration-200
                               ${
                                 filters.sortOrder === "desc"
                                   ? "bg-primary text-background-dark"
                                   : "bg-surface-darker text-white hover:bg-primary/20"
                               }`}
                  >
                    Descending
                  </button>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="p-4 border-t border-surface-dark">
              <button
                onClick={() => {
                  onReset()
                  setIsOpen(false)
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5
                          rounded-lg bg-surface-darker text-text-secondary
                          hover:text-white hover:bg-red-500/20
                          transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Filters
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default LessonFilters
