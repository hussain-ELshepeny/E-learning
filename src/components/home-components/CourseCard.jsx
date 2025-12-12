import { CiClock1 } from "react-icons/ci"
import { FaStar } from "react-icons/fa6"
import { MdBarChart } from "react-icons/md"
export default function CourseCard({
  imageUrl,
  category,
  rate,
  reviews,
  title,
  desc,
  duration,
  level,
}) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-surface-dark border border-gray-100 dark:border-[#264532] hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer group h-full">
      <div className="relative aspect-video w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          data-alt="Laptop screen showing code editor with colorful syntax highlighting"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-yellow-400 text-lg">
            <FaStar />
          </span>
          <span className="text-sm font-bold dark:text-white">{rate}</span>
          <span className="text-xs text-slate-500 dark:text-text-secondary">
            (`${reviews}`k reviews)
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2 dark:text-white group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-text-secondary line-clamp-2 mb-4 flex-1">
          {desc}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5 mt-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-400 text-lg">
              <CiClock1 />
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-text-secondary">
              {`${duration?.hours}h ${duration?.mins}m`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-400 text-lg">
              <MdBarChart />
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-text-secondary">
              {level}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
