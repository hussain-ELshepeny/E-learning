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
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl 
                   bg-background-card border border-border-dark shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between p-6 
                       bg-background-card border-b border-border-dark"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {mode === "create" ? "Create New Exam" : "Edit Exam"}
              </h2>
              <p className="text-sm text-text-secondary">
                {mode === "create"
                  ? "Set up a new exam"
                  : "Update exam details"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-lg text-text-secondary hover:text-white 
                      hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Exam Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter exam title..."
              className={`w-full px-4 py-3 rounded-lg bg-background-dark border 
                        text-white placeholder-text-secondary/50
                        focus:outline-none focus:border-primary transition-colors
                        ${
                          errors.title ? "border-red-500" : "border-border-dark"
                        }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter exam description..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-background-dark border border-border-dark
                        text-white placeholder-text-secondary/50
                        focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          {/* Class Level & Exam Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Class Level *
              </label>
              <select
                name="classLevel"
                value={formData.classLevel}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-background-dark border 
                          text-white focus:outline-none focus:border-primary transition-colors
                          ${
                            errors.classLevel
                              ? "border-red-500"
                              : "border-border-dark"
                          }`}
              >
                <option value="">Select class level</option>
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
                <option value="3">Grade 3</option>
              </select>
              {errors.classLevel && (
                <p className="mt-1 text-sm text-red-500">{errors.classLevel}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Exam Type
              </label>
              <select
                name="examType"
                value={formData.examType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-background-dark border border-border-dark
                          text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="quiz">Quiz</option>
                <option value="midterm">Midterm</option>
                <option value="final">Final</option>
                <option value="practice">Practice</option>
              </select>
            </div>
          </div>

          {/* Duration & Marks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Duration (mins) *
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-3 rounded-lg bg-background-dark border 
                          text-white focus:outline-none focus:border-primary transition-colors
                          ${
                            errors.duration
                              ? "border-red-500"
                              : "border-border-dark"
                          }`}
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-500">{errors.duration}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                <Award className="w-4 h-4 inline mr-1" />
                Total Marks *
              </label>
              <input
                type="number"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-3 rounded-lg bg-background-dark border 
                          text-white focus:outline-none focus:border-primary transition-colors
                          ${
                            errors.totalMarks
                              ? "border-red-500"
                              : "border-border-dark"
                          }`}
              />
              {errors.totalMarks && (
                <p className="mt-1 text-sm text-red-500">{errors.totalMarks}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Passing Marks
              </label>
              <input
                type="number"
                name="passingMarks"
                value={formData.passingMarks}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-3 rounded-lg bg-background-dark border 
                          text-white focus:outline-none focus:border-primary transition-colors
                          ${
                            errors.passingMarks
                              ? "border-red-500"
                              : "border-border-dark"
                          }`}
              />
              {errors.passingMarks && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.passingMarks}
                </p>
              )}
            </div>
          </div>

          {/* Start & End Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-background-dark border border-border-dark
                          text-white focus:outline-none focus:border-primary transition-colors
                          [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                End Date & Time
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-background-dark border border-border-dark
                          text-white focus:outline-none focus:border-primary transition-colors
                          [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-background-dark border border-border-dark
                        text-white focus:outline-none focus:border-primary transition-colors"
            >
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Exam Instructions
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Enter instructions for students..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-background-dark border border-border-dark
                        text-white placeholder-text-secondary/50
                        focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          {/* Options */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                name="shuffleQuestions"
                checked={formData.shuffleQuestions}
                onChange={handleChange}
                className="w-5 h-5 rounded border-border-dark bg-background-dark 
                          text-primary focus:ring-primary focus:ring-offset-0
                          cursor-pointer"
              />
              <span className="text-text-secondary group-hover:text-white transition-colors">
                Shuffle Questions
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                name="showResults"
                checked={formData.showResults}
                onChange={handleChange}
                className="w-5 h-5 rounded border-border-dark bg-background-dark 
                          text-primary focus:ring-primary focus:ring-offset-0
                          cursor-pointer"
              />
              <span className="text-text-secondary group-hover:text-white transition-colors">
                Show Results After Submission
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-dark">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-lg border border-border-dark
                        text-text-secondary hover:text-white hover:border-white/30
                        transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-lg bg-primary text-background-dark font-semibold
                        hover:bg-primary/90 transition-colors disabled:opacity-50 
                        disabled:cursor-not-allowed flex items-center gap-2 min-w-[140px] justify-center"
            >
              {isLoading ? (
                <>
                  <div
                    className="w-4 h-4 border-2 border-background-dark/30 
                                 border-t-background-dark rounded-full animate-spin"
                  />
                  <span>
                    {mode === "create" ? "Creating..." : "Updating..."}
                  </span>
                </>
              ) : (
                <span>{mode === "create" ? "Create Exam" : "Update Exam"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamForm;
