

const CTA = () => {
  return (
    <section className="w-full px-4 mb-10">
      <div className="max-w-[1200px] mx-auto rounded-2xl bg-linear-to-br from-[#20362b] to-background-dark border border-[#264532] px-6 py-20 text-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black dark:text-white tracking-tight">
            Ready to start your journey?
          </h2>
          <p className="text-lg text-slate-400 dark:text-text-secondary mb-4">
            Join thousands of students and start learning the skills that matter
            today. Free access to introductory courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button className="flex items-center justify-center rounded-full h-14 px-10 bg-primary text-background-dark text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20">
              Join for Free
            </button>
            <button className="flex items-center justify-center rounded-full h-14 px-10 bg-transparent border border-gray-600 text-white text-lg font-medium hover:bg-white/5 transition-colors">
              View Plans
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
