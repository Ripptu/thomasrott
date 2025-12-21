"use client"

import { useState } from "react"
import { cn } from "../../lib/utils.ts"
import { TESTIMONIALS } from "../../constants.tsx"

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedQuote, setDisplayedQuote] = useState(TESTIMONIALS[0].quote)
  const [displayedRole, setDisplayedRole] = useState(TESTIMONIALS[0].role)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    if (index === activeIndex || isAnimating) return
    setIsAnimating(true)

    setTimeout(() => {
      setDisplayedQuote(TESTIMONIALS[index].quote)
      setDisplayedRole(TESTIMONIALS[index].role)
      setActiveIndex(index)
      setTimeout(() => setIsAnimating(false), 400)
    }, 200)
  }

  return (
    <div className="flex flex-col items-center gap-10 py-16">
      {/* Quote Container */}
      <div className="relative px-8">
        <span className="absolute -left-2 -top-6 text-7xl font-serif text-forest-900/[0.1] select-none pointer-events-none">
          "
        </span>

        <p
          className={cn(
            "text-2xl md:text-3xl font-light text-forest-950 text-center max-w-2xl leading-relaxed transition-all duration-400 ease-out font-serif",
            isAnimating ? "opacity-0 blur-sm scale-[0.98]" : "opacity-100 blur-0 scale-100",
          )}
        >
          {displayedQuote}
        </p>

        <span className="absolute -right-2 -bottom-8 text-7xl font-serif text-forest-900/[0.1] select-none pointer-events-none">
          "
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 mt-2">
        {/* Role text */}
        <div 
           className={cn(
            "flex flex-col items-center transition-all duration-500 ease-out",
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
           )}
        >
            <p className="text-xs text-forest-600 tracking-[0.2em] uppercase font-bold">
              {displayedRole}
            </p>
            {TESTIMONIALS[activeIndex].company && (
                <p className="text-[10px] text-forest-400 uppercase tracking-widest mt-1">
                    {TESTIMONIALS[activeIndex].company}
                </p>
            )}
        </div>

        <div className="flex items-center justify-center gap-2">
          {TESTIMONIALS.map((testimonial, index) => {
            const isActive = activeIndex === index
            const isHovered = hoveredIndex === index && !isActive
            const showName = isActive || isHovered

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative flex items-center gap-0 rounded-full cursor-pointer",
                  "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isActive ? "bg-forest-900 shadow-xl shadow-forest-900/20" : "bg-transparent hover:bg-forest-50",
                  showName ? "pr-5 pl-2 py-2" : "p-1",
                )}
              >
                {/* Avatar with smooth ring animation */}
                <div className="relative flex-shrink-0">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className={cn(
                      "w-10 h-10 rounded-full object-cover",
                      "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      isActive ? "ring-2 ring-white" : "ring-1 ring-forest-900/10 grayscale hover:grayscale-0",
                      !isActive && "hover:scale-105",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    showName ? "grid-cols-[1fr] opacity-100 ml-3" : "grid-cols-[0fr] opacity-0 ml-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <span
                      className={cn(
                        "text-sm font-medium whitespace-nowrap block",
                        "transition-colors duration-300",
                        isActive ? "text-white" : "text-forest-900",
                      )}
                    >
                      {testimonial.author}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}