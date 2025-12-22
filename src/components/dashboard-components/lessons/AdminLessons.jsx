import { useState } from "react"
import { Plus, Pencil, Trash2, Video, ExternalLink } from "lucide-react"
import {
  useGetLessons,
  useCreateLesson,
  useUpdateLesson,
  useDeleteLesson,
} from "../../../hooks/useLessons"
import DataTable from "../../ui/DataTable"
import LessonForm from "../../ui/LessonForm"
import DeleteModal from "../../ui/DeleteModal"
import LessonFilters from "../lessons/LessonFilters"

const AdminLessons = () => {
  //  State Management
  const [filters, setFilters] = useState({
    classLevel: "",
    isPaid: "",
    title: "",
    sortBy: "",
    sortOrder: "",
  })

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [formMode, setFormMode] = useState("create")

  //  Hooks
  const { data: lessonsData, isLoading, error } = useGetLessons(filters)
  const { createLesson, isLoading: isCreating } = useCreateLesson()
  const { updateLesson, isLoading: isUpdating } = useUpdateLesson()
  const { deleteLesson, isLoading: isDeleting } = useDeleteLesson()

  //  Table Columns Configuration
  const columns = [
    {
      header: "Title",
      accessor: "title",
      render: (value) => (
        <span className="font-medium text-white">{value}</span>
      ),
    },
    {
      header: "Class Level",
      accessor: "classLevel",
      render: (value) => (
        <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
          {value}
        </span>
      ),
    },
    {
      header: "Price",
      accessor: "price",
      render: (value) => (
        <span className={value > 0 ? "text-primary" : "text-text-secondary"}>
          {value > 0 ? `${value} EGP` : "Free"}
        </span>
      ),
    },
    {
      header: "Video",
      accessor: "video",
      sortable: false,
      render: (value) =>
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            <Video className="w-4 h-4" />
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-text-secondary">No video</span>
        ),
    },
    {
      header: "Status",
      accessor: "isPaid",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium
                     ${
                       value
                         ? "bg-green-500/20 text-green-400"
                         : "bg-yellow-500/20 text-yellow-400"
                     }`}
        >
          {value ? "Paid" : "Free"}
        </span>
      ),
    },
    {
      header: "Scheduled Date",
      accessor: "scheduledDate",
      render: (value) =>
        value ? (
          <span className="text-text-secondary">
            {new Date(value).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        ) : (
          <span className="text-text-secondary">-</span>
        ),
    },
  ]

  //  Handlers
  const handleOpenCreateForm = () => {
    setSelectedLesson(null)
    setFormMode("create")
    setIsFormOpen(true)
  }

  const handleOpenEditForm = (lesson) => {
    setSelectedLesson(lesson)
    setFormMode("edit")
    setIsFormOpen(true)
  }

  const handleOpenDeleteModal = (lesson) => {
    setSelectedLesson(lesson)
    setIsDeleteModalOpen(true)
  }

  const handleFormSubmit = async (data) => {
    try {
      if (formMode === "create") {
        await createLesson(data)
      } else {
        await updateLesson({ id: selectedLesson._id, data })
      }
      setIsFormOpen(false)
      setSelectedLesson(null)
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteLesson(selectedLesson._id)
      setIsDeleteModalOpen(false)
      setSelectedLesson(null)
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  const handleResetFilters = () => {
    setFilters({
      classLevel: "",
      isPaid: "",
      title: "",
      sortBy: "",
      sortOrder: "",
    })
  }

  //  Actions renderer
  const renderActions = (row) => (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleOpenEditForm(row)
        }}
        className="p-2 rounded-lg text-text-secondary hover:text-primary
                  hover:bg-primary/10 transition-all duration-200"
        title="Edit lesson"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleOpenDeleteModal(row)
        }}
        className="p-2 rounded-lg text-text-secondary hover:text-red-500
                  hover:bg-red-500/10 transition-all duration-200"
        title="Delete lesson"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </>
  )

  return (
    <div className="min-h-screen bg-background-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Lessons Management
            </h1>
            <p className="text-text-secondary">
              Manage and organize your lessons
            </p>
          </div>

          <div className="flex items-center gap-3">
            <LessonFilters
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
            />

            <button
              onClick={handleOpenCreateForm}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg
                        bg-primary text-background-dark font-semibold
                        hover:bg-primary/90 transition-all duration-200
                        shadow-lg shadow-primary/25"
            >
              <Plus className="w-5 h-5" />
              Add Lesson
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-panel rounded-xl p-5">
            <p className="text-text-secondary text-sm mb-1">Total Lessons</p>
            <p className="text-3xl font-bold text-white">
              {lessonsData?.data?.length || 0}
            </p>
          </div>
          <div className="glass-panel rounded-xl p-5">
            <p className="text-text-secondary text-sm mb-1">Paid Lessons</p>
            <p className="text-3xl font-bold text-primary">
              {lessonsData?.data?.filter((l) => l.isPaid).length || 0}
            </p>
          </div>
          <div className="glass-panel rounded-xl p-5">
            <p className="text-text-secondary text-sm mb-1">Free Lessons</p>
            <p className="text-3xl font-bold text-yellow-400">
              {lessonsData?.data?.filter((l) => !l.isPaid).length || 0}
            </p>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={lessonsData?.data || []}
          isLoading={isLoading}
          error={error}
          actions={renderActions}
          searchPlaceholder="Search lessons..."
          emptyMessage="No lessons found. Create your first lesson!"
          pageSize={10}
        />

        {/* Lesson Form Modal */}
        <LessonForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false)
            setSelectedLesson(null)
          }}
          onSubmit={handleFormSubmit}
          initialData={selectedLesson}
          isLoading={isCreating || isUpdating}
          mode={formMode}
        />

        {/* Delete Confirmation Modal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedLesson(null)
          }}
          onConfirm={handleDelete}
          isLoading={isDeleting}
          title="Delete Lesson"
          message="Are you sure you want to delete this lesson? This action cannot be undone."
          itemName={selectedLesson?.title}
        />
      </div>
    </div>
  )
}

export default AdminLessons
