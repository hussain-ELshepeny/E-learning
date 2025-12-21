import { useState, useEffect } from "react"
import {
  X,
  Loader2,
  Video,
  BookOpen,
  DollarSign,
  GraduationCap,
  Calendar,
} from "lucide-react"

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

const LessonForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
  mode = "create", // "create" | "edit"
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: "",
    classLevel: "",
    price: "",
    scheduledDate: "",
  })

  const [errors, setErrors] = useState({})

  // Populate form when editing
  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        video: initialData.video || "",
        classLevel: initialData.classLevel || "",
        price: initialData.price || "",
        scheduledDate: initialData.scheduledDate
          ? new Date(initialData.scheduledDate).toISOString().split("T")[0]
          : "",
      })
    } else {
      setFormData({
        title: "",
        description: "",
        video: "",
        classLevel: "",
        price: "",
        scheduledDate: "",
      })
    }
    setErrors({})
  }, [initialData, mode, isOpen])

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.classLevel) {
      newErrors.classLevel = "Class level is required"
    }

    if (formData.price && isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a number"
    }

    if (formData.video && !isValidUrl(formData.video)) {
      newErrors.video = "Please enter a valid URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    // Prepare data - only include non-empty fields
    const submitData = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        if (key === "price") {
          submitData[key] = Number(value)
        } else {
          submitData[key] = value
        }
      }
    })

    onSubmit(submitData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl mx-4 glass-panel rounded-2xl overflow-hidden
                      animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-dark">
          <h2 className="text-xl font-semibold text-white flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-primary" />
            {mode === "create" ? "Add New Lesson" : "Edit Lesson"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-darker transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
              <BookOpen className="w-4 h-4" />
              Lesson Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter lesson title"
              className={`w-full px-4 py-3 bg-surface-darker rounded-lg
                         text-white placeholder:text-text-secondary
                         border ${
                           errors.title
                             ? "border-red-500"
                             : "border-surface-dark"
                         }
                         focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                         transition-all duration-200`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-400">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter lesson description"
              rows={3}
              className="w-full px-4 py-3 bg-surface-darker rounded-lg
                        text-white placeholder:text-text-secondary
                        border border-surface-dark focus:border-primary
                        focus:outline-none focus:ring-2 focus:ring-primary/20
                        transition-all duration-200 resize-none"
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
              <Video className="w-4 h-4" />
              Video URL
            </label>
            <input
              type="url"
              name="video"
              value={formData.video}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=..."
              className={`w-full px-4 py-3 bg-surface-darker rounded-lg
                         text-white placeholder:text-text-secondary
                         border ${
                           errors.video
                             ? "border-red-500"
                             : "border-surface-dark"
                         }
                         focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                         transition-all duration-200`}
            />
            {errors.video && (
              <p className="mt-1 text-sm text-red-400">{errors.video}</p>
            )}
          </div>

          {/* Class Level & Price Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Class Level */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                <GraduationCap className="w-4 h-4" />
                Class Level *
              </label>
              <select
                name="classLevel"
                value={formData.classLevel}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-surface-darker rounded-lg
                           text-white border ${
                             errors.classLevel
                               ? "border-red-500"
                               : "border-surface-dark"
                           }
                           focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                           transition-all duration-200 appearance-none cursor-pointer`}
              >
                <option value="" className="bg-surface-darker">
                  Select class level
                </option>
                {CLASS_LEVELS.map((level) => (
                  <option
                    key={level}
                    value={level}
                    className="bg-surface-darker"
                  >
                    {level}
                  </option>
                ))}
              </select>
              {errors.classLevel && (
                <p className="mt-1 text-sm text-red-400">{errors.classLevel}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                <DollarSign className="w-4 h-4" />
                Price (EGP)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className={`w-full px-4 py-3 bg-surface-darker rounded-lg
                           text-white placeholder:text-text-secondary
                           border ${
                             errors.price
                               ? "border-red-500"
                               : "border-surface-dark"
                           }
                           focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                           transition-all duration-200`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-400">{errors.price}</p>
              )}
            </div>
          </div>

          {/* Scheduled Date */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
              <Calendar className="w-4 h-4" />
              Scheduled Date
            </label>
            <input
              type="date"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-surface-darker rounded-lg
                        text-white border border-surface-dark
                        focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                        transition-all duration-200"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-dark">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-lg text-text-secondary
                        hover:bg-surface-darker transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-lg bg-primary text-background-dark
                        font-semibold hover:bg-primary/90
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-200 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {mode === "create" ? "Creating..." : "Updating..."}
                </>
              ) : (
                <>{mode === "create" ? "Create Lesson" : "Update Lesson"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LessonForm
