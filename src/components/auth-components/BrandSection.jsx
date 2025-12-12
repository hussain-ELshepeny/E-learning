import { FaStar } from "react-icons/fa6"
import { GiGraduateCap } from "react-icons/gi"

// src/components/BrandSection.jsx
const BrandSection = () => {
  return (
    <div className="relative hidden w-full md:flex md:w-1/2 lg:w-5/12 flex-col justify-between p-10 lg:p-16 text-white">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 h-full w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMgLldSRmX9Ry9t9cBoZi3W7eEOYl5MWy5NV4teog5KiKHVI1uRieyFEswFtWEoootmm5dFPqzwXphEu5nQSWpdPtJd4a0yczOyJUZfY9N2OgdN0uKlSF-ItbmkYsRwHslWzwgRO2TdZ2NFJNTvzv-ESFZaoUhoA9FJsx4Q-3aYpOsZVls-7IrmV7khKrwsIxX3Njy8eHJl3FUPcxXFc5mt_VNX-pyYQl1svsccibSzkzy3IPgFvBPBFYEDfqqdJib9VaTNbW9s3rL')",
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background-dark/90 via-background-dark/50 to-background-dark/30 mix-blend-multiply" />
      <div className="absolute inset-0 z-10 bg-primary/10 mix-blend-overlay" />

      {/* Brand Logo */}
      <div className="relative z-20 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-background-dark">
          <span className="material-symbols-outlined text-[24px]">
            <GiGraduateCap />
          </span>
        </div>
        <span className="text-xl font-bold tracking-tight">E-Learn Pro</span>
      </div>

      {/* Motivational Content */}
      <div className="relative z-20 mt-auto">
        <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
          Master your <br />
          <span className="text-primary">craft today.</span>
        </h1>
        <p className="mb-8 max-w-sm text-lg font-light text-gray-300">
          Join thousands of learners achieving their goals with our premium
          courses.
        </p>

        {/* Testimonial Pill */}
        <div className="flex items-center gap-4 rounded-full glass-panel p-2 pr-6 w-fit">
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary">
            <img
              alt="Portrait of a smiling student"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8n-Iq9KUlK0Cf-u9NWA98dk_S3eLVj4XFio3-7TaQX5CHEi_2nQ1XIIO8k68mxg64Q4n1EZjcwZL78TTSSHrHcT8VCNdKeDmGMtR_ZW2yrOPMKtldWXQ8RXLb0ClEaqEwqpwh3X04Mui1e_se26dNYnpq1TqwRcsXTbMJRFcufkNHBb8RfAo1dt1wuIwcvd8M2cFK9na3gEs-QSQWIv4mgj86MrbW1QefuVk8gnZedKf3uG1g0bJ1RC-8KUcq4GKAZcYSYmiLv3BL"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">Sarah Jenkins</span>
            <span className="text-[10px] text-primary">Web Developer</span>
          </div>
          <div className="ml-2 flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined text-[16px] fill-1"
              >
                <FaStar />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandSection
