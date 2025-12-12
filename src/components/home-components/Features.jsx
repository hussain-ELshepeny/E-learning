import { FaCode, FaRocket } from "react-icons/fa"
import { SlBadge } from "react-icons/sl"

const Features = () => {
  return (
    <section className="w-full px-4 lg:px-8 mb-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            Why Choose EduLearn?
          </h2>
          <p className="text-lg text-slate-600 dark:text-text-secondary max-w-2xl mx-auto">
            We focus on outcomes. Our platform is designed to help you acquire
            skills effectively and efficiently.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="group p-8 rounded-2xl bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-[#20362b] transition-all duration-300 border border-transparent dark:border-[#264532] hover:border-primary/20 hover:shadow-lg dark:hover:shadow-none">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">
                <FaRocket />
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">
              Interactive Lessons
            </h3>
            <p className="text-slate-600 dark:text-text-secondary leading-relaxed">
              Forget boring lectures. Learn by doing with interactive quizzes,
              coding environments, and design challenges directly in your
              browser.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="group p-8 rounded-2xl bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-[#20362b] transition-all duration-300 border border-transparent dark:border-[#264532] hover:border-primary/20 hover:shadow-lg dark:hover:shadow-none">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">
                <FaCode />
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">
              Real-world Projects
            </h3>
            <p className="text-slate-600 dark:text-text-secondary leading-relaxed">
              Build a portfolio that gets you hired. Every course ends with a
              capstone project that solves a real business problem.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="group p-8 rounded-2xl bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-[#20362b] transition-all duration-300 border border-transparent dark:border-[#264532] hover:border-primary/20 hover:shadow-lg dark:hover:shadow-none">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 dark:bg-purple-400/10 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">
                <SlBadge />
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">
              Expert Feedback
            </h3>
            <p className="text-slate-600 dark:text-text-secondary leading-relaxed">
              Don't learn in a vacuum. Get personalized code reviews, design
              critiques, and career advice from industry veterans.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
