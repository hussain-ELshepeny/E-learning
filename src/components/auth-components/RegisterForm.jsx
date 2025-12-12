import { FaPhoneAlt, FaUserAlt } from "react-icons/fa"
import { FaArrowRight, FaSchool } from "react-icons/fa6"
import { MdMail } from "react-icons/md"
import { FaLock } from "react-icons/fa6"

export default function RegisterForm() {
  return (
    <form className="flex flex-col gap-5">
      {/* Full Name Input */}
      <div className="flex flex-col gap-2">
        <label className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">
          Full Name
        </label>
        <div className="group relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 z-10 text-gray-400 transition-colors group-focus-within:text-primary">
            <FaUserAlt />
          </span>
          <input
            className="h-14 w-full rounded-full border-2 border-gray-200 bg-gray-50 px-4 pl-12 text-base font-medium text-gray-900 placeholder-gray-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-0 dark:border-[#264532] dark:bg-surface-darker dark:text-white dark:placeholder-[#4a6b5a] dark:focus:border-primary dark:focus:bg-[#15261d]"
            placeholder={"Hussain Abdelkawy"}
            type="text"
          />
        </div>
      </div>
      {/* Email Input  */}
      <div className="flex flex-col gap-2">
        <label className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">
          Email Address
        </label>
        <div className="group relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 z-10 text-gray-400 transition-colors group-focus-within:text-primary">
            <MdMail />
          </span>
          <input
            className="h-14 w-full rounded-full border-2 border-gray-200 bg-gray-50 px-4 pl-12 text-base font-medium text-gray-900 placeholder-gray-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-0 dark:border-[#264532] dark:bg-surface-darker dark:text-white dark:placeholder-[#4a6b5a] dark:focus:border-primary dark:focus:bg-[#15261d]"
            placeholder={"name@example.com"}
            type="email"
          />
        </div>
      </div>
      <div className="flex gap-5 sm:gap-2  flex-col sm:flex-row">
        {/* Password Input */}
        <div className="flex flex-col gap-2">
          <label className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">
            Password
          </label>
          <div className="group relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 z-10 text-gray-400 transition-colors group-focus-within:text-primary">
              <FaLock />
            </span>
            <input
              className="h-14 w-full rounded-full border-2 border-gray-200 bg-gray-50 px-4 pl-12 text-base font-medium text-gray-900 placeholder-gray-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-0 dark:border-[#264532] dark:bg-surface-darker dark:text-white dark:placeholder-[#4a6b5a] dark:focus:border-primary dark:focus:bg-[#15261d]"
              placeholder={"1H@@_dsads21(32(*"}
              type="password"
            />
          </div>
        </div>
        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">
            Confirm Password
          </label>
          <div className="group relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 z-10 text-gray-400 transition-colors group-focus-within:text-primary">
              <FaLock />
            </span>
            <input
              className="h-14 w-full rounded-full border-2 border-gray-200 bg-gray-50 px-4 pl-12 text-base font-medium text-gray-900 placeholder-gray-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-0 dark:border-[#264532] dark:bg-surface-darker dark:text-white dark:placeholder-[#4a6b5a] dark:focus:border-primary dark:focus:bg-[#15261d]"
              placeholder={"1H@@_dsads21(32(*"}
              type="password"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-5 sm:gap-2  flex-col sm:flex-row ">
        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">
            Phone Number
          </label>
          <div className="group relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 z-10 text-gray-400 transition-colors group-focus-within:text-primary">
              <FaPhoneAlt />
            </span>
            <input
              className="h-14 w-full rounded-full border-2 border-gray-200 bg-gray-50 px-4 pl-12 text-base font-medium text-gray-900 placeholder-gray-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-0 dark:border-[#264532] dark:bg-surface-darker dark:text-white dark:placeholder-[#4a6b5a] dark:focus:border-primary dark:focus:bg-[#15261d]"
              placeholder={"+201022519970"}
              type="text"
            />
          </div>
        </div>
        {/* Class Level */}
        <div className="flex flex-col gap-2">
          <label className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">
            Class Level
          </label>
          <div className="group relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 z-10 text-gray-400 transition-colors group-focus-within:text-primary">
              <FaSchool />
            </span>
            <input
              className="h-14 w-full rounded-full border-2 border-gray-200 bg-gray-50 px-4 pl-12 text-base font-medium text-gray-900 placeholder-gray-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-0 dark:border-[#264532] dark:bg-surface-darker dark:text-white dark:placeholder-[#4a6b5a] dark:focus:border-primary dark:focus:bg-[#15261d]"
              placeholder={"Grade 1 Secondary"}
              type="text"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-bold text-[#122118] transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
        type="submit"
      >
        Register Now
        <span className="material-symbols-outlined text-[20px]">
          <FaArrowRight />
        </span>
      </button>
    </form>
  )
}
