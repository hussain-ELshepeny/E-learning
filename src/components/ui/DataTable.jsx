import { useState } from "react"
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Loader2,
  AlertCircle,
  Inbox,
} from "lucide-react"

const DataTable = ({
  columns,
  data = [],
  isLoading = false,
  error = null,
  onRowClick,
  actions,
  searchable = true,
  searchPlaceholder = "Search...",
  pagination = true,
  pageSize = 10,
  emptyMessage = "No data available",
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
  const [currentPage, setCurrentPage] = useState(1)

  // 🔍 Filter data based on search
  const filteredData = data.filter((item) =>
    columns.some((column) => {
      const value = item[column.accessor]
      if (value === null || value === undefined) return false
      return String(value).toLowerCase().includes(searchTerm.toLowerCase())
    })
  )

  // 🔄 Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue === null || aValue === undefined) return 1
    if (bValue === null || bValue === undefined) return -1

    if (typeof aValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
  })

  // 📄 Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData

  // Handle sort
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }))
  }

  // Render sort icon
  const renderSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronUp className="w-4 h-4 opacity-30" />
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 text-primary" />
    ) : (
      <ChevronDown className="w-4 h-4 text-primary" />
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 glass-panel rounded-xl">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-text-secondary">Loading data...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 glass-panel rounded-xl">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-red-400 mb-2">Error loading data</p>
        <p className="text-text-secondary text-sm">
          {error.message || "Something went wrong"}
        </p>
      </div>
    )
  }

  return (
    <div className={`glass-panel rounded-xl overflow-hidden ${className}`}>
      {/* Search Bar */}
      {searchable && (
        <div className="p-4 border-b border-surface-dark">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-3 bg-surface-darker rounded-lg
                         text-white placeholder:text-text-secondary
                         border border-surface-dark focus:border-primary
                         focus:outline-none focus:ring-2 focus:ring-primary/20
                         transition-all duration-200"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-darker">
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  onClick={() =>
                    column.sortable !== false && handleSort(column.accessor)
                  }
                  className={`px-6 py-4 text-left text-sm font-semibold text-text-secondary
                             ${
                               column.sortable !== false
                                 ? "cursor-pointer hover:text-primary"
                                 : ""
                             }
                             transition-colors duration-200`}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable !== false &&
                      renderSortIcon(column.accessor)}
                  </div>
                </th>
              ))}
              {actions && (
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-dark">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-16 text-center"
                >
                  <div className="flex flex-col items-center">
                    <Inbox className="w-12 h-12 text-text-secondary mb-4" />
                    <p className="text-text-secondary">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={row._id || row.id || rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={`hover:bg-surface-darker/50 transition-colors duration-200
                             ${onRowClick ? "cursor-pointer" : ""}`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      className="px-6 py-4 text-sm text-white"
                    >
                      {column.render
                        ? column.render(row[column.accessor], row)
                        : row[column.accessor] ?? "-"}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {actions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-surface-dark">
          <p className="text-sm text-text-secondary">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
            {sortedData.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-surface-darker text-white
                        hover:bg-primary hover:text-background-dark
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-200
                             ${
                               currentPage === pageNum
                                 ? "bg-primary text-background-dark"
                                 : "bg-surface-darker text-white hover:bg-primary/20"
                             }`}
                >
                  {pageNum}
                </button>
              )
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-surface-darker text-white
                        hover:bg-primary hover:text-background-dark
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataTable
