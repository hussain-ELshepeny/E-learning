import { FaBell } from "react-icons/fa"
import { IoIosSearch } from "react-icons/io"

const DashboardHeader = () => {
  return (
    <header className="flex items-center justify-between px-8 py-6 pb-2 shrink-0 z-10">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">
          Dashboard Overview
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome back, here's what's happening today.
        </p>
      </div>
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="hidden md:flex w-80 lg:w-96 items-center bg-white dark:bg-surface-dark rounded-full px-4 h-12 shadow-sm border border-slate-200 dark:border-white/5 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
          <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 mr-2 text-2xl">
            <IoIosSearch />
          </span>
          <input
            className="bg-transparent border-none text-sm w-full text-slate-900 dark:text-white placeholder-slate-400 focus:ring-0 p-0"
            placeholder="Search lessons, users..."
            type="text"
          />
        </div>

        {/* Notifications */}
        <button className="size-12 rounded-full flex items-center justify-center bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-600 dark:text-white relative transition-all shadow-sm">
          <span className="material-symbols-outlined text-2xl">
            <FaBell />
          </span>
          <span className="absolute top-3 right-3 size-2 bg-primary rounded-full border-2 border-white dark:border-surface-dark"></span>
        </button>

        {/* Mobile Menu Trigger */}
        <button className="lg:hidden size-12 rounded-full flex items-center justify-center bg-primary text-background-dark">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  )
}

export default DashboardHeader
