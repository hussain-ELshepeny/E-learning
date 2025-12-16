import { useForm } from "react-hook-form"
import { FaPhoneAlt, FaUserAlt } from "react-icons/fa"
import { FaArrowRight, FaLock } from "react-icons/fa6"
import { MdMail } from "react-icons/md"
import { useSuperAdmin } from "../../hooks/useSuperAdmin"
import ErrorMessage from "./ErrorMessage"

export default function Super() {
  const { createAdmin, isLoading } = useSuperAdmin()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      cpassword: "",
    },
  })

  // Watch password for confirmation validation
  const password = watch("password")

  const onSubmit = (data) => {
    createAdmin(data, {
      onSuccess: () => {
        reset() // Reset form on success
      },
    })
  }

  // Dynamic input class based on error state
  const getInputClass = (hasError) => {
    const baseClass =
      "h-14 w-full rounded-full border-2 bg-gray-50 px-4 pl-12 text-base font-medium text-gray-900 placeholder-gray-400 transition-all focus:bg-white focus:outline-none focus:ring-0 dark:bg-surface-darker dark:text-white dark:placeholder-[#4a6b5a] dark:focus:bg-[#15261d]"

    const normalBorder =
      "border-gray-200 focus:border-primary dark:border-[#264532] dark:focus:border-primary"

    const errorBorder =
      "border-red-400 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500"

    return `${baseClass} ${hasError ? errorBorder : normalBorder}`
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Create Admin
      </h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name Input */}
        <div className="flex flex-col gap-2">
          <label className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">
            Full Name
          </label>
          <div className="group relative flex items-center">
            <span className="absolute left-4 z-10 text-gray-400 transition-colors group-focus-within:text-primary">
              <FaUserAlt />
            </span>
            <input
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Full name must be at least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Full name must not exceed 50 characters",
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Full name can only contain letters and spaces",
                },
              })}
              className={getInputClass(!!errors.fullName)}
              placeholder="Hussain Abdelkawy"
              type="text"
            />
          </div>
          <ErrorMessage message={errors.fullName?.message} />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <label className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">
            Email Address
          </label>
          <div className="group relative flex items-center">
            <span className="absolute left-4 z-10 text-gray-400 transition-colors group-focus-within:text-primary">
              <MdMail />
            </span>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
              className={getInputClass(!!errors.email)}
              placeholder="name@example.com"
              type="email"
            />
          </div>
          <ErrorMessage message={errors.email?.message} />
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:gap-2">
          {/* Password Input */}
          <div className="flex flex-1 flex-col gap-2">
            <label className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">
              Password
            </label>
            <div className="group relative flex items-center">
              <span className="absolute left-4 z-10 text-gray-400 transition-colors group-focus-within:text-primary">
                <FaLock />
              </span>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain uppercase, lowercase, number, and special character",
                  },
                })}
                className={getInputClass(!!errors.password)}
                placeholder="••••••••"
                type="password"
              />
            </div>
            <ErrorMessage message={errors.password?.message} />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-1 flex-col gap-2">
            <label className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">
              Confirm Password
            </label>
            <div className="group relative flex items-center">
              <span className="absolute left-4 z-10 text-gray-400 transition-colors group-focus-within:text-primary">
                <FaLock />
              </span>
              <input
                {...register("cpassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={getInputClass(!!errors.cpassword)}
                placeholder="••••••••"
                type="password"
              />
            </div>
            <ErrorMessage message={errors.cpassword?.message} />
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-text-secondary">
            Phone Number
          </label>
          <div className="group relative flex items-center">
            <span className="absolute left-4 z-10 text-gray-400 transition-colors group-focus-within:text-primary">
              <FaPhoneAlt />
            </span>
            <input
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^(\+?20)?01[0125]\d{8}$/,
                  message: "Please enter a valid Egyptian phone number",
                },
              })}
              className={getInputClass(!!errors.phoneNumber)}
              placeholder="+201022519970"
              type="text"
            />
          </div>
          <ErrorMessage message={errors.phoneNumber?.message} />
        </div>

        {/* Submit Button */}
        <button
          className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-bold text-[#122118] shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Admin...
            </>
          ) : (
            <>
              Create Admin
              <FaArrowRight className="text-[16px]" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
