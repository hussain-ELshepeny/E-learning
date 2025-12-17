import { NavLink } from "react-router-dom"

const DashboardNavLink = ({ icon, label, route }) => {
  return (
    <NavLink
      to={`/dashboard${route ? `/${route}` : ""}`}
      end={!route} // مهم علشان الـ index route يشتغل صح
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          isActive
            ? "bg-primary text-background-dark font-semibold shadow-lg shadow-primary/20"
            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 group"
        }`
      }
    >
      <span
        className={`text-xl ${
          // لو مش active، هنضيف الـ hover effect
          "group-hover:text-primary transition-colors"
        }`}
      >
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </NavLink>
  )
}

export default DashboardNavLink
