

const Stats = () => {
  return (
    <section className="w-full px-4 mb-20">
      <div className="max-w-[1200px] mx-auto border-y border-slate-200 dark:border-[#264532] py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center justify-center text-center gap-1">
            <p className="text-3xl md:text-4xl font-bold dark:text-white">
              10k+
            </p>
            <p className="text-sm font-medium text-slate-500 dark:text-text-secondary">
              Active Learners
            </p>
          </div>
          <div className="flex flex-col items-center justify-center text-center gap-1">
            <p className="text-3xl md:text-4xl font-bold dark:text-white">
              500+
            </p>
            <p className="text-sm font-medium text-slate-500 dark:text-text-secondary">
              Premium Courses
            </p>
          </div>
          <div className="flex flex-col items-center justify-center text-center gap-1">
            <p className="text-3xl md:text-4xl font-bold dark:text-white">
              120+
            </p>
            <p className="text-sm font-medium text-slate-500 dark:text-text-secondary">
              Expert Mentors
            </p>
          </div>
          <div className="flex flex-col items-center justify-center text-center gap-1">
            <p className="text-3xl md:text-4xl font-bold dark:text-white">
              4.9
            </p>
            <p className="text-sm font-medium text-slate-500 dark:text-text-secondary">
              Average Rating
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats
