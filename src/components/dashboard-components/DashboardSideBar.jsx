import DashboardNavLink from "./DashboardNavLink";
import {
  MdOutlineDashboard,
  MdOutlineSchool,
  MdOutlineMenuBook,
  MdOutlinePeople,
  MdOutlineQuiz,
  MdOutlinePlayLesson,
} from "react-icons/md";

const DashboardSidebar = () => {
  const navItems = [
    // {
    //   icon: <MdOutlineDashboard />,
    //   label: "Dashboard",
    //   route: "", // index route
    // },
    {
      icon: <MdOutlineMenuBook />,
      label: "Questions",
      route: "questions",
    },
    {
      icon: <MdOutlineQuiz />,
      label: "Exams",
      route: "exams",
    },
    {
      icon: <MdOutlinePlayLesson />,
      label: "Lessons",
      route: "lessons",
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 h-full border-r border-slate-200 dark:border-white/10 bg-surface-light dark:bg-surface-dark/50 backdrop-blur-md">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="relative flex items-center justify-center size-10 rounded-xl bg-primary/20 text-primary">
            <span className="material-symbols-outlined text-3xl">
              <MdOutlineSchool />
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-primary dark:text-white">
              EduAdmin
            </h1>
            <p className="text-xs font-medium text-slate-500 dark:text-primary/80 uppercase tracking-wider">
              Platform
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item, index) => (
            <DashboardNavLink
              key={index}
              icon={item.icon}
              label={item.label}
              active={item.active}
              filled={item.filled}
              route={item.route}
            />
          ))}
        </nav>
      </div>

      {/* User Section */}
      <div className="mt-auto p-6 border-t border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 dark:bg-white/5 mb-4">
          <div
            className="size-10 rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSNsXHGmpSoCZKksfNMFQ84g0312-F2JK0KI2FBJQ55Q8yre2wOjHoxxhbaiBNM_N_-y72KmNdiQELTOIl5k5eKaOZK42i6l9oY6YoUBBlNk3-a6dYbZfX72nHzIyucJMcqQhu1onG6qoIIGq7cxPjrxIAHyFCLHnKQKMHUn9RXInr0iJ-bE69O65h_tNPXkAqmESf3fvY5N5LTQIZMMh7Tu8Copn4_WLaNHsfV6GoDhvNH5dNiVURY8DHsVol6GRFCRoHRs-rZn40')",
            }}
            aria-label="Portrait of admin user"
          />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
              Jane Admin
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              jane@eduadmin.com
            </span>
          </div>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-xl h-12 border border-slate-200 dark:border-white/10 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 text-slate-500 dark:text-slate-400 font-bold transition-all">
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="text-sm">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
