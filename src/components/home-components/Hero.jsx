import { MdPlayArrow } from "react-icons/md"
import { FaArrowRight } from "react-icons/fa6"

const Hero = () => {
  return (
    <section className="w-full flex justify-center px-4 lg:px-8 mb-16 lg:mb-24">
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
            <span className="flex size-2 rounded-full bg-primary"></span>
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">
              New Courses Available
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-black leading-[1.1] tracking-tight">
            Master New Skills at Your Own{" "}
            <span className="text-primary">Pace</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-text-secondary max-w-lg leading-relaxed">
            Join a community of lifelong learners and access premium education
            designed for your career growth. No strict deadlines, just pure
            learning.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="flex items-center justify-center rounded-full h-12 px-8 bg-primary text-background-dark text-base font-bold hover:scale-105 transition-transform">
              Start Learning Now
            </button>
            <button className=" text-white flex items-center gap-2 justify-center rounded-full h-12 px-8 border border-slate-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary bg-transparent text-base font-medium transition-colors group">
              <span>Explore Courses</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                <FaArrowRight />
              </span>
            </button>
          </div>
          <div className="flex items-center gap-4 pt-4 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex -space-x-2">
              <div
                className="size-8 rounded-full border-2 border-background-light dark:border-background-dark bg-gray-300 bg-cover bg-center"
                data-alt="User Avatar 1"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2spFHB9AS0-8KzlzomREP-tasCrX2edAenq6aoySw-hQFcthJmu9XR9SVfet9nfKKVcFZXTj8d2Q6GyGOSZ93UpIuNSeMiCyxzMcQCcxxjWQVtFvre-z8bqlC7YLxsjG7oiRyaP0oIHFzic1sz8G4_3pZGbB1VLkmKtrnPaCqlWJrZYZqJ8giAfrhIgFG4y9ft-nkOwbQVq3KnCpuJX3YAeO3oqcNgEtAbK92Xc7pvU3dOelz8q9NwMepTHYKCLxfbLcayVAXQuuh')",
                }}
              ></div>
              <div
                className="size-8 rounded-full border-2 border-background-light dark:border-background-dark bg-gray-400 bg-cover bg-center"
                data-alt="User Avatar 2"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBjXCEzZzuxymRkQqrxvhzXZ8jquFVRT6k31DazvPG-6_n_JKTrU3QT-mV59Vn_cOPSDXLQMJ5cus1f8cQ8pftdr6xSTp1GY6-fxZhfjRyDOqM9hmgGeIgFd27CVNePfyfjLXYNc35uRbZCxV3nAgz0nSy_Re3HOenqWjRjuGIkoFPMa3BH2cBJmWFLL408oCxlor_R8cXI3PKHumWy29Px0xnvHVHmETH3QDm4R50nvNzz_Oj3r751nJaIsPWuswX0B2czE_MARsxm')",
                }}
              ></div>
              <div
                className="size-8 rounded-full border-2 border-background-light dark:border-background-dark bg-gray-500 bg-cover bg-center"
                data-alt="User Avatar 3"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD62nAzpn3bzHY8mzyG1kWJ70cIQwnyxrCeowyAC2nFNGrKAHpc9BLLU5CmxsVBj60Ink4XSWjL48vWiqLnKiaT4tlsCAbT5TBDmBP3GZ3M5aHPZ5awRX5GQVK8R6ENL1kS3HRke-ficRd4nJCB8Z4-U08HCmsWS5avI2ZZ1GX1cyw0zJaWrkQJ15z4hPvc6mLwhGYJn7hK0nCEiY7Pc97AeNtL63UwwpK_lCmGYIQIyECTEo9atDVIpbxoOYsg_Hw2vbhrnBWoQkvx')",
                }}
              ></div>
              <div className="flex items-center justify-center size-8 rounded-full border-2 border-background-light dark:border-background-dark bg-surface-dark text-[10px] font-bold text-white">
                +2k
              </div>
            </div>
            <p>Trusted by 10,000+ students</p>
          </div>
        </div>
        <div className="relative order-1 lg:order-2 w-full aspect-square max-h-[500px] lg:max-h-none lg:h-full rounded-2xl overflow-hidden group">
          {/* Abstract Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 blur-[100px] rounded-full"></div>
          <div
            className="relative h-full w-full rounded-2xl bg-center bg-cover border border-white/10 shadow-2xl overflow-hidden"
            data-alt="Students collaborating on a laptop in a modern library setting"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKaHqWo0NkvLBOqvdeYpC7pBwYLp0UinkUdImLkQo_mo61kFjVRqIJgEnVK0hUvTH_sjvYWzycfQLlXc0PDzU1Uxv5hZFPuasxprpQGJr0t_0pNI4kIVIcA1Oq77LHc-udyBUJBeTsAzb-GbNau0fE0ijY5vn66sITrAonmzjJ1sMI1zk9Rp_V5Yopgw1gd-vgPHW9vsexj82_RVExZ1TWbZFcaKvLD5ldpgq9QThDTGsSeDM9gtCzI1S75uC7rlBYygzAJr9wvgdE')",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-background-dark/90 via-transparent to-transparent"></div>
            {/* Floating UI Card overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-full bg-primary flex items-center justify-center text-background-dark">
                  <span className="material-symbols-outlined">
                    <MdPlayArrow />
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">
                    Introduction to UI Design
                  </p>
                  <p className="text-white/70 text-xs">
                    Lesson 3 • 12 mins remaining
                  </p>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary h-full w-[65%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
