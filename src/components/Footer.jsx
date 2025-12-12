import { GraduationCap } from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-[#264532] bg-white dark:bg-[#0e1a13] pt-16 pb-8 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-6 rounded-full bg-primary text-background-dark">
                <span className="material-symbols-outlined text-sm">
                  <GraduationCap />
                </span>
              </div>
              <h3 className="text-xl font-bold dark:text-white">EduLearn</h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
              Empowering the next generation of creators, developers, and
              leaders through accessible, high-quality education.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Platform
            </h4>
            <a
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              Browse Courses
            </a>
            <a
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              Mentorship
            </a>
            <a
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              Pricing
            </a>
            <a
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              For Business
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Company
            </h4>
            <a
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              About Us
            </a>
            <a
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              Careers
            </a>
            <a
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              Blog
            </a>
            <a
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              Contact
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal
            </h4>
            <a
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              Terms
            </a>
            <a
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              Privacy
            </a>
            <a
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              Cookies
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200 dark:border-[#264532]">
          <p className="text-xs text-slate-400">
            © 2023 EduLearn Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              className="text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              className="text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a
              className="text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.409-.06 3.809-.06h.63zm1.673 5.378c-3.283 0-5.945 2.662-5.945 5.945 0 3.283 2.662 5.945 5.945 5.945 3.283 0 5.945-2.662 5.945-5.945 0-3.283-2.662-5.945-5.945-5.945zm0 10.768a4.823 4.823 0 110-9.646 4.823 4.823 0 010 9.646zM17.204 8c-.628 0-1.14.508-1.14 1.138 0 .629.512 1.138 1.14 1.138.627 0 1.138-.509 1.138-1.138 0-.63-.511-1.138-1.138-1.138z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
