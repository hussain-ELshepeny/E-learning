import { useState } from "react";
import { Plus, Pencil, Trash2, FileText, Clock, Users } from "lucide-react";
import {
  useGetExams,
  useCreateExam,
  useUpdateExam,
  useDeleteExam,
} from "../../../hooks/useExams";
import DataTable from "../../ui/DataTable";
import ExamForm from "../exams/ExamForm";
import DeleteModal from "../../ui/DeleteModal";
import ExamFilters from "../exams/ExamFilters";

const AdminExams = () => {
  const [filters, setFilters] = useState({
    classLevel: "",
    status: "",
    examType: "",
    title: "",
    sortBy: "",
    sortOrder: "",
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [formMode, setFormMode] = useState("create");

  const { data: examsData, isLoading, error } = useGetExams(filters);
  const { createExam, isLoading: isCreating } = useCreateExam();
  const { updateExam, isLoading: isUpdating } = useUpdateExam();
  const { deleteExam, isLoading: isDeleting } = useDeleteExam();

  // Table Columns
  const columns = [
    {
      header: "Title",
      accessor: "title",
      render: (value) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <span className="font-medium text-white">{value}</span>
        </div>
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
      header: "Type",
      accessor: "examType",
      render: (value) => {
        const typeStyles = {
          quiz: "bg-blue-500/20 text-blue-400",
          midterm: "bg-purple-500/20 text-purple-400",
          final: "bg-red-500/20 text-red-400",
          practice: "bg-green-500/20 text-green-400",
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              typeStyles[value] || "bg-gray-500/20 text-gray-400"
            }`}
          >
            {value?.charAt(0).toUpperCase() + value?.slice(1)}
          </span>
        );
      },
    },
    {
      header: "Duration",
      accessor: "duration",
      render: (value) => (
        <div className="flex items-center gap-1 text-text-secondary">
          <Clock className="w-4 h-4" />
          <span>{value} mins</span>
        </div>
      ),
    },
    {
      header: "Total Marks",
      accessor: "totalMarks",
      render: (value) => (
        <span className="text-primary font-semibold">{value}</span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => {
        const statusStyles = {
          draft: "bg-gray-500/20 text-gray-400",
          active: "bg-green-500/20 text-green-400",
          completed: "bg-blue-500/20 text-blue-400",
          scheduled: "bg-yellow-500/20 text-yellow-400",
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusStyles[value] || "bg-gray-500/20 text-gray-400"
            }`}
          >
            {value?.charAt(0).toUpperCase() + value?.slice(1)}
          </span>
        );
      },
    },
  ];

  // Handlers
  const handleOpenCreateForm = () => {
    setSelectedExam(null);
    setFormMode("create");
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (exam) => {
    setSelectedExam(exam);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleOpenDeleteModal = (exam) => {
    setSelectedExam(exam);
    setIsDeleteModalOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setTimeout(() => setSelectedExam(null), 200);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (formMode === "create") {
        await createExam(data);
      } else {
        await updateExam({ id: selectedExam._id, data });
      }
      handleCloseForm();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteExam(selectedExam._id);
      setIsDeleteModalOpen(false);
      setSelectedExam(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      classLevel: "",
      status: "",
      examType: "",
      title: "",
      sortBy: "",
      sortOrder: "",
    });
  };

  const renderActions = (row) => (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleOpenEditForm(row);
        }}
        className="p-2 rounded-lg text-text-secondary hover:text-primary
                  hover:bg-primary/10 transition-all duration-200"
        title="Edit exam"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleOpenDeleteModal(row);
        }}
        className="p-2 rounded-lg text-text-secondary hover:text-red-500
                  hover:bg-red-500/10 transition-all duration-200"
        title="Delete exam"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </>
  );

  // Stats
  const totalExams = examsData?.data?.length || 0;
  const activeExams =
    examsData?.data?.filter((e) => e.status === "active").length || 0;
  const completedExams =
    examsData?.data?.filter((e) => e.status === "completed").length || 0;
  const draftExams =
    examsData?.data?.filter((e) => e.status === "draft").length || 0;

  return (
    <div className="min-h-screen bg-background-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Exams Management
            </h1>
            <p className="text-text-secondary">
              Create and manage your exams and quizzes
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ExamFilters
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
              Add Exam
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm mb-1">Total Exams</p>
                <p className="text-3xl font-bold text-white">{totalExams}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm mb-1">Active Exams</p>
                <p className="text-3xl font-bold text-green-400">
                  {activeExams}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <Clock className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm mb-1">Completed</p>
                <p className="text-3xl font-bold text-blue-400">
                  {completedExams}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm mb-1">Drafts</p>
                <p className="text-3xl font-bold text-gray-400">{draftExams}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-500/10">
                <FileText className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={examsData?.data || []}
          isLoading={isLoading}
          error={error}
          actions={renderActions}
          searchPlaceholder="Search exams..."
          emptyMessage="No exams found. Create your first exam!"
          pageSize={10}
        />

        {isFormOpen && (
          <ExamForm
            key={selectedExam?._id || "create-new"}
            onClose={handleCloseForm}
            onSubmit={handleFormSubmit}
            initialData={selectedExam}
            isLoading={isCreating || isUpdating}
            mode={formMode}
          />
        )}

        {/* Delete Confirmation Modal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedExam(null);
          }}
          onConfirm={handleDelete}
          isLoading={isDeleting}
          title="Delete Exam"
          message="Are you sure you want to delete this exam? All questions and student submissions will be permanently deleted."
          itemName={selectedExam?.title}
        />
      </div>
    </div>
  );
};

export default AdminExams;
