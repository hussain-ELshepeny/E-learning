// src/components/FormSection.jsx
import { useState } from "react"
import AuthToggle from "./AuthToggle"

import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { GiGraduateCap } from "react-icons/gi"

const FormSection = () => {
  const [authMode, setAuthMode] = useState("login")

  return (
    <div className="flex w-full flex-col justify-center bg-surface-light dark:bg-surface-dark p-6 md:w-1/2 lg:w-7/12 md:p-10 lg:p-15 relative">
      {/* Mobile Logo */}
      <div className="mb-8 flex items-center justify-center gap-2 md:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-background-dark">
          <span className="material-symbols-outlined text-[20px]">
            <GiGraduateCap />
          </span>
        </div>
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          E-Learn Pro
        </span>
      </div>

      <div className="mx-auto w-full max-w-[490px]">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Toggle Switch */}
        <AuthToggle activeMode={authMode} onChange={setAuthMode} />

        {/* Form */}

        {authMode === "login" ? <LoginForm /> : <RegisterForm />}

        {/* Terms Link */}
        <p className="mt-8 text-center text-xs text-gray-500 dark:text-text-secondary">
          By continuing, you agree to our{" "}
          <a className="underline hover:text-primary" href="#">
            Terms of Service
          </a>{" "}
          and{" "}
          <a className="underline hover:text-primary" href="#">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default FormSection
