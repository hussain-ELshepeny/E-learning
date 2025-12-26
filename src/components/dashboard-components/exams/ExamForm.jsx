import { useState } from "react";
import { X, FileText, Clock, Calendar, Award } from "lucide-react";

const formatDateForInput = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 16);
};

const ExamForm = ({ onClose, onSubmit, initialData, isLoading, mode }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    classLevel: initialData?.classLevel || "",
    examType: initialData?.examType || "quiz",
    duration: initialData?.duration || 30,
    totalMarks: initialData?.totalMarks || 100,
    passingMarks: initialData?.passingMarks || 50,
    startDate: formatDateForInput(initialData?.startDate),
    endDate: formatDateForInput(initialData?.endDate),
    status: initialData?.status || "draft",
    instructions: initialData?.instructions || "",
    shuffleQuestions: initialData?.shuffleQuestions || false,
    showResults: initialData?.showResults ?? true,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.classLevel) {
      newErrors.classLevel = "Class level is required";
    }
    if (!formData.duration || formData.duration < 1) {
      newErrors.duration = "Duration must be at least 1 minute";
    }
    if (!formData.totalMarks || formData.totalMarks < 1) {
      newErrors.totalMarks = "Total marks is required";
    }
    if (formData.passingMarks > formData.totalMarks) {
      newErrors.passingMarks = "Passing marks cannot exceed total marks";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl shadow-2xl
                   bg-[#0a1a14] border border-emerald-900/50 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed at top */}
        <div
          className="shrink-0 flex items-center justify-between p-6 
                     bg-[#0a1a14] border-b border-emerald-900/50 rounded-t-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <FileText className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {mode === "create" ? "Create New Exam" : "Edit Exam"}
              </h2>
              <p className="text-sm text-emerald-300/60">
                {mode === "create"
                  ? "Set up a new exam"
                  : "Update exam details"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-lg text-emerald-300/60 hover:text-white 
                      hover:bg-emerald-500/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form - Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-emerald-300/80 mb-2">
                Exam Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter exam title..."
                className={`w-full px-4 py-3 rounded-lg bg-[#0d2018] border 
                          text-white placeholder-emerald-300/30
                          focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all
                          ${
                            errors.title
                              ? "border-red-500"
                              : "border-emerald-900/50"
                          }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-emerald-300/80 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter exam description..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-[#0d2018] border border-emerald-900/50
                          text-white placeholder-emerald-300/30
                          focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
              />
            </div>

            {/* Class Level & Exam Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-emerald-300/80 mb-2">
                  Class Level *
                </label>
                <select
                  name="classLevel"
                  value={formData.classLevel}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-[#0d2018] border 
                            text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all
                            ${
                              errors.classLevel
                                ? "border-red-500"
                                : "border-emerald-900/50"
                            }`}
                >
                  <option value="" className="bg-[#0d2018]">
                    Select class level
                  </option>
                  <option value="1" className="bg-[#0d2018]">
                    Grade 1
                  </option>
                  <option value="2" className="bg-[#0d2018]">
                    Grade 2
                  </option>
                  <option value="3" className="bg-[#0d2018]">
                    Grade 3
                  </option>
                </select>
                {errors.classLevel && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.classLevel}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-300/80 mb-2">
                  Exam Type
                </label>
                <select
                  name="examType"
                  value={formData.examType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#0d2018] border border-emerald-900/50
                            text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                >
                  <option value="quiz" className="bg-[#0d2018]">
                    Quiz
                  </option>
                  <option value="midterm" className="bg-[#0d2018]">
                    Midterm
                  </option>
                  <option value="final" className="bg-[#0d2018]">
                    Final
                  </option>
                  <option value="practice" className="bg-[#0d2018]">
                    Practice
                  </option>
                </select>
              </div>
            </div>

            {/* Duration & Marks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-emerald-300/80 mb-2">
                  <Clock className="w-4 h-4 inline mr-1 text-emerald-400" />
                  Duration (mins) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-4 py-3 rounded-lg bg-[#0d2018] border 
                            text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all
                            ${
                              errors.duration
                                ? "border-red-500"
                                : "border-emerald-900/50"
                            }`}
                />
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-400">{errors.duration}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-300/80 mb-2">
                  <Award className="w-4 h-4 inline mr-1 text-emerald-400" />
                  Total Marks *
                </label>
                <input
                  type="number"
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-4 py-3 rounded-lg bg-[#0d2018] border 
                            text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all
                            ${
                              errors.totalMarks
                                ? "border-red-500"
                                : "border-emerald-900/50"
                            }`}
                />
                {errors.totalMarks && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.totalMarks}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-300/80 mb-2">
                  Passing Marks
                </label>
                <input
                  type="number"
                  name="passingMarks"
                  value={formData.passingMarks}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-4 py-3 rounded-lg bg-[#0d2018] border 
                            text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all
                            ${
                              errors.passingMarks
                                ? "border-red-500"
                                : "border-emerald-900/50"
                            }`}
                />
                {errors.passingMarks && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.passingMarks}
                  </p>
                )}
              </div>
            </div>

            {/* Start & End Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-emerald-300/80 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1 text-emerald-400" />
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#0d2018] border border-emerald-900/50
                            text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all
                            scheme-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-300/80 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1 text-emerald-400" />
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#0d2018] border border-emerald-900/50
                            text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all
                            scheme-dark"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-emerald-300/80 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#0d2018] border border-emerald-900/50
                          text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              >
                <option value="draft" className="bg-[#0d2018]">
                  Draft
                </option>
                <option value="scheduled" className="bg-[#0d2018]">
                  Scheduled
                </option>
                <option value="active" className="bg-[#0d2018]">
                  Active
                </option>
                <option value="completed" className="bg-[#0d2018]">
                  Completed
                </option>
              </select>
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium text-emerald-300/80 mb-2">
                Exam Instructions
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Enter instructions for students..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-[#0d2018] border border-emerald-900/50
                          text-white placeholder-emerald-300/30
                          focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
              />
            </div>

            {/* Options */}
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="shuffleQuestions"
                    checked={formData.shuffleQuestions}
                    onChange={handleChange}
                    className="peer w-5 h-5 rounded border-emerald-900/50 bg-[#0d2018] 
                              text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0
                              focus:ring-offset-[#0a1a14] cursor-pointer
                              checked:bg-emerald-500 checked:border-emerald-500"
                  />
                </div>
                <span className="text-emerald-300/70 group-hover:text-emerald-300 transition-colors">
                  Shuffle Questions
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="showResults"
                    checked={formData.showResults}
                    onChange={handleChange}
                    className="peer w-5 h-5 rounded border-emerald-900/50 bg-[#0d2018] 
                              text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0
                              focus:ring-offset-[#0a1a14] cursor-pointer
                              checked:bg-emerald-500 checked:border-emerald-500"
                  />
                </div>
                <span className="text-emerald-300/70 group-hover:text-emerald-300 transition-colors">
                  Show Results After Submission
                </span>
              </label>
            </div>
          </form>
        </div>

        {/* Actions - Fixed at bottom */}
        <div
          className="shrink-0 flex items-center justify-end gap-3 p-6 
                       bg-[#0a1a14] border-t border-emerald-900/50 rounded-b-2xl"
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-lg border border-emerald-900/50
                      text-emerald-300/70 hover:text-white hover:border-emerald-500/50
                      hover:bg-emerald-500/10 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-2.5 rounded-lg bg-linear-to-r from-emerald-500 to-emerald-600 
                      text-white font-semibold shadow-lg shadow-emerald-500/25
                      hover:from-emerald-400 hover:to-emerald-500 hover:shadow-emerald-500/40
                      transition-all disabled:opacity-50 disabled:cursor-not-allowed 
                      flex items-center gap-2 min-w-[140px] justify-center"
          >
            {isLoading ? (
              <>
                <div
                  className="w-4 h-4 border-2 border-white/30 
                               border-t-white rounded-full animate-spin"
                />
                <span>{mode === "create" ? "Creating..." : "Updating..."}</span>
              </>
            ) : (
              <span>{mode === "create" ? "Create Exam" : "Update Exam"}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamForm;
