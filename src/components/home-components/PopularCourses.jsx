import { FaArrowRight } from "react-icons/fa6"
import CourseCard from "./CourseCard"

const PopularCourses = () => {
  const popularCourses = [
    {
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDsWNCZUBPbaYiCaako3ml4uOL93lHW3qtJcWCl6_-Lwh5UzEd3zgudj0R-VvLfdZV7eQO6AuVLlUV0j3oZ-L009-5ut73l932t6rdtWneEMlvB0DKl-Wbof5mIOohuLIEdu1rJgdDhJ5dJzLtRLT-ZrhScfR8bMqQLNHw1mPWUwRszBWrF-t22B9RUouvNfZekANESkh77g_hfM1EtaNg1CsmXduF44qfSH054_xC-778HlpgoRtGm73tTnFfbHUxR_-DcfcFb0Cvr ",
      category: "Development",
      rate: 4.5,
      reviews: "1.2k",
      title: "Full-Stack Web Development Bootcamp",
      desc: "Master HTML, CSS, JavaScript, React, and Node.js. Build 10 real-world projects.",
      duration: { hours: "18", mins: "30" },
      level: "Beginner",
    },
    {
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCGYjYfOlMVHiXUVXTkxAmUHdnL_Iqrk3b6t_e1KlXo1txiRCY8UqhiSzE-ir82lJ3odIDgtFOkj05_MLXWE-3slLARe9iRYwhV3mcr8EX8saqgJNVeHyl5rR-KvfcAfhRMR6WJAdCprxGeZojBkRlxb7qIP3v2vJY5pkxp5hzCvdfT2beNNxyO7Evi9JBh7qezlVW78VQrGZAU2K3Jw-Iu30k7sWbPKXRil4cUid97f9Yqytb_9qEARUFA2J97jUQddDsaGqRmDRgk",
      category: "Design",
      rate: 4.9,
      reviews: "850",
      title: "UI/UX Design Masterclass",
      desc: "Learn to design beautiful interfaces and user experiences. Figma mastery included.",
      duration: { hours: "25", mins: "20" },
      level: "Intermediate",
    },
    {
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBq75uBV9IhF-3TDNNJEsADk6GYN5YSh1wzd9Bfm9t8H413VPhqW3QFobFcltgC6QpXCCsX03yYoNyZ-JT4OhcwxlyoFr-IFa71121L8b9IdNiGlD6_EMcoqF_AjGEhsk55-aw-a683M6NfVPTT4rPqrqWBf-67w1sX8LDKTNY3UVNj-e4x0hq8rgyrQP9wAJH8P5XXJKIPWu81NP-TJdUOT3PDaq5xbgvqzreMDnIVg2eZSVIhRXC5UVdBzv0NLKK_eZLgDOS295QF",
      category: "Data Science",
      rate: 3.5,
      reviews: "2.1k",
      title: "Data Science with Python",
      desc: "Analyze data, create visualizations, and build machine learning models.",
      duration: { hours: "32", mins: "13" },
      level: "Advanced",
    },
  ]
  return (
    <section className="w-full px-4 lg:px-8 mb-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">
              Trending Now
            </h2>
            <p className="text-slate-500 dark:text-text-secondary mt-1">
              Courses most loved by the community this week.
            </p>
          </div>
          <a
            className="hidden sm:flex items-center gap-1 text-sm font-bold text-primary hover:underline"
            href="#"
          >
            View All Courses{" "}
            <span className="material-symbols-outlined text-sm">
              <FaArrowRight />
            </span>
          </a>
        </div>
        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCourses.map((c) => (
            <CourseCard
              key={c.title}
              imageUrl={c.imageUrl}
              title={c.title}
              desc={c.desc}
              rate={c.rate}
              reviews={c.reviews}
              level={c.level}
              category={c.category}
              duration={c.duration}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center sm:hidden">
          <a
            className="flex items-center gap-1 text-sm font-bold text-primary hover:underline"
            href="#"
          >
            View All Courses{" "}
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default PopularCourses
