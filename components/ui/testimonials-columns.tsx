"use client";
import React from "react";
import { motion } from "framer-motion";
import { Testimonial } from "../../types.ts";
import { Star, Quote } from "lucide-react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map((t, i) => (
              <div 
                key={`${index}-${i}`} 
                className="p-8 rounded-[2rem] bg-white border border-forest-50 shadow-[0_8px_30px_-8px_rgba(10,31,22,0.08)] w-full flex flex-col justify-between h-auto relative overflow-hidden"
              >
                {/* Decorative background element */}
                <Quote className="absolute top-4 right-6 w-12 h-12 text-forest-50/50 fill-current -z-0 pointer-events-none" />

                {/* Header: Author & Metadata */}
                <div className="pb-4 mb-4 border-b border-forest-50 relative z-10">
                  <div className="flex justify-between items-start mb-2">
                     <div className="font-serif font-bold text-forest-950 text-lg leading-tight pr-4">
                        {t.author}
                     </div>
                     <div className="flex gap-0.5 text-emerald-500 shrink-0 mt-1">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}
                     </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-forest-900/40 uppercase tracking-wider font-bold">
                        {t.role}
                    </span>
                    {t.service && (
                        <span className="text-xs text-forest-600 font-medium bg-forest-50/80 px-2 py-1 rounded-md w-fit mt-1">
                            {t.service}
                        </span>
                    )}
                  </div>
                </div>
                
                {/* Body: Quote */}
                <div className="relative z-10">
                   <p className="text-forest-900/80 leading-relaxed font-medium text-sm">
                     "{t.quote}"
                   </p>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};