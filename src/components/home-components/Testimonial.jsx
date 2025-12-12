const Testimonial = () => {
  return (
    <section className="w-full px-4 mb-24">
      <div className="max-w-[1000px] mx-auto bg-surface-darker rounded-3xl p-8 md:p-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-full border-4 border-[#264532] overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center"
              data-alt="Portrait of a professional woman smiling"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9qIE67cbEr25k7gYOczrYfgo9Phw8QC96HoK3mTwtg0km_L6B3bQ3Y7ocxQGPH8iPKkkovg82o48kbmM5Cal92vUMEXWIvOHiW6xmr3h6KkgpMfXsqA00DkbmkBsu4x3h6ueYYqviolrrhfPw-Wy3Rzdy81D5m4qkqU4cSni-Y0cxoAlBZ7VfDcrsbXXofJfM-Rj3RuiMPlQTt9zv9M1iqvgBaxQqN8tmogM83Nw9nwPYahFadUSZqvkHd5Dzjucjk_ubQvRZBqDL')",
              }}
            ></div>
          </div>
          <div className="flex flex-col text-center md:text-left">
            <span className="material-symbols-outlined text-4xl text-primary mb-4 self-center md:self-start">
              format_quote
            </span>
            <h3 className="text-xl md:text-2xl font-medium leading-relaxed dark:text-white mb-6">
              "EduLearn completely changed my career trajectory. The structured
              path and expert mentorship helped me transition from sales to a
              Senior Product Designer in just 8 months."
            </h3>
            <div>
              <p className="text-lg font-bold text-white">Sarah Jenkins</p>
              <p className="text-sm text-text-secondary">
                Product Designer @ TechFlow
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
