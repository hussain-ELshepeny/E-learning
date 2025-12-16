import { useForm } from "react-hook-form"
import { FaArrowRight, FaCheck, FaLock } from "react-icons/fa6"
import { MdMail } from "react-icons/md"
import { useLogin } from "../../hooks/useLogin"

export default function LoginForm() {
  const { mutate: login, isPending, isError, error } = useLogin()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    login({
      email: data.email,
      password: data.password,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Email Input */}
      <div className="flex flex-col gap-2">
        <label className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">
          Email Address
        </label>
        <div className="group relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 z-10 text-gray-400 transition-colors group-focus-within:text-primary">
            <MdMail />
          </span>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="h-14 w-full rounded-full border-2 border-gray-200 bg-gray-50 px-4 pl-12 text-base font-medium text-gray-900 placeholder-gray-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-0 dark:border-[#264532] dark:bg-surface-darker dark:text-white dark:placeholder-[#4a6b5a] dark:focus:border-primary dark:focus:bg-[#15261d]"
            placeholder="name@example.com"
            type="email"
          />
        </div>
        {errors.email && (
          <span className="ml-2 text-sm text-red-500">
            {errors.email.message}
          </span>
        )}
      </div>

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
            {...register("password", {
              required: "Password is required",
            })}
            className="h-14 w-full rounded-full border-2 border-gray-200 bg-gray-50 px-4 pl-12 text-base font-medium text-gray-900 placeholder-gray-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-0 dark:border-[#264532] dark:bg-surface-darker dark:text-white dark:placeholder-[#4a6b5a] dark:focus:border-primary dark:focus:bg-[#15261d]"
            placeholder="Enter your password"
            type="password"
          />
        </div>
        {errors.password && (
          <span className="ml-2 text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* API Error Message */}
      {isError && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 dark:bg-red-900/20 dark:border-red-800">
          <span className="text-sm text-red-600 dark:text-red-400">
            {error?.response?.data?.message || "Invalid email or password"}
          </span>
        </div>
      )}

      {/* Actions Row */}
      <div className="flex items-center justify-between px-2">
        <label className="flex cursor-pointer items-center gap-2">
          <div className="relative flex items-center">
            <input
              {...register("rememberMe")}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-gray-50 transition-all checked:border-primary checked:bg-primary dark:border-[#366348] dark:bg-surface-darker dark:checked:border-primary dark:checked:bg-primary"
              type="checkbox"
            />
            <span className="material-symbols-outlined pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] text-background-dark opacity-0 peer-checked:opacity-100">
              <FaCheck />
            </span>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Remember me
          </span>
        </label>
        <a
          className="text-sm font-semibold text-gray-900 hover:underline dark:text-white"
          href="#"
        >
          Forgot Password?
        </a>
      </div>

      {/* Submit Button */}
      <button
        className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-bold text-[#122118] transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Start Learning"}
        <span className="material-symbols-outlined text-[20px]">
          <FaArrowRight />
        </span>
      </button>
    </form>
  )
}