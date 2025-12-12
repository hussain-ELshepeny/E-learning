// src/components/AuthToggle.jsx
const AuthToggle = ({ activeMode, onChange }) => {
  return (
    <div className="mb-8 flex justify-center">
      <div className="flex h-12 w-full max-w-[300px] items-center justify-center rounded-full bg-gray-100 dark:bg-background-dark p-1 shadow-inner">
        <label className="relative flex h-full flex-1 cursor-pointer items-center justify-center rounded-full dark:text-text-secondary transition-all duration-200 ease-in-out has-[:checked]:bg-white dark:has-[:checked]:bg-[#264532] has-[:checked]:text-gray-900 dark:has-[:checked]:text-white has-[:checked]:shadow-sm">
          <span className="z-10 text-sm font-semibold">Log In</span>
          <input
            checked={activeMode === "login"}
            onChange={() => onChange("login")}
            className="hidden"
            name="auth-mode"
            type="radio"
            value="login"
          />
        </label>
        <label className="relative flex h-full flex-1 cursor-pointer items-center justify-center rounded-full text-gray-500 dark:text-text-secondary transition-all duration-200 ease-in-out hover:text-gray-700 dark:hover:text-gray-300 has-[:checked]:bg-white dark:has-[:checked]:bg-[#264532] has-[:checked]:text-gray-900 dark:has-[:checked]:text-white has-[:checked]:shadow-sm">
          <span className="z-10 text-sm font-semibold">Sign Up</span>
          <input
            checked={activeMode === "signup"}
            onChange={() => onChange("signup")}
            className="hidden"
            name="auth-mode"
            type="radio"
            value="signup"
          />
        </label>
      </div>
    </div>
  )
}

export default AuthToggle
