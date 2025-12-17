import { IoSchool } from "react-icons/io5"

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 lg:px-8">
      <header className="flex w-full max-w-[1200px] items-center justify-between rounded-full border border-gray-200 dark:border-[#264532] bg-white/80 dark:bg-[#122118]/80 backdrop-blur-md px-6 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-8 rounded-full bg-primary/20 text-primary">
            <span className="material-symbols-outlined text-xl">
              <IoSchool />
            </span>
          </div>
          <h2 className="text-lg font-bold tracking-tight dark:text-white">
            EduLearn
          </h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-sm font-medium hover:text-primary transition-colors dark:text-gray-300"
            href="#"
          >
            Courses
          </a>
          <a
            className="text-sm font-medium hover:text-primary transition-colors dark:text-gray-300"
            href="#"
          >
            Mentors
          </a>
          <a
            className="text-sm font-medium hover:text-primary transition-colors dark:text-gray-300"
            href="#"
          >
            Community
          </a>
          <a
            className="text-sm font-medium hover:text-primary transition-colors dark:text-gray-300"
            href="#"
          >
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <a
            className="hidden sm:block text-sm font-medium hover:text-primary transition-colors dark:text-white"
            href="#"
          >
            Log in
          </a>
          <button className="flex items-center justify-center rounded-full bg-primary h-10 px-5 text-background-dark text-sm font-bold hover:bg-primary/90 transition-all">
            Get Started
          </button>
        </div>
      </header>
    </div>
  )
}

export default Navbar
