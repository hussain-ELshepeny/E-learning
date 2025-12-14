import CTA from "../components/home-components/CTA"
import Stats from "../components/home-components/Stats"
import PopularCourses from "../components/home-components/PopularCourses"
import Hero from "../components/home-components/Hero"
import Features from "../components/home-components/Features"
import Testimonial from "../components/home-components/Testimonial"

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen w-full flex-col pt-24 lg:pt-32 pb-10">
        <Hero />
        <Stats />
        <Features />
        <PopularCourses />
        <Testimonial />
        <CTA />
      </main>
    </>
  )
}
