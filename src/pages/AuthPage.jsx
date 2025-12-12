import BrandSection from "../components/auth-components/BrandSection"
import FormSection from "../components/auth-components/FormSection"

const AuthPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 md:p-6 lg:p-8 bg-background-dark">
      <div className="flex w-full max-w-[1200px] flex-col overflow-hidden rounded-lg bg-surface-light dark:bg-surface-dark shadow-2xl md:flex-row min-h-[808px]">
        <BrandSection />
        <FormSection />
      </div>
    </div>
  )
}

export default AuthPage
