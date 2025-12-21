"use client";
import React from "react";
import { motion } from "framer-motion";
import { Testimonial } from "../../types.ts";
import { Star } from "lucide-react";

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
                className="p-8 rounded-[2rem] bg-white border border-forest-50 shadow-[0_8px_30px_-8px_rgba(10,31,22,0.08)] w-full flex flex-col justify-between h-auto"
              >
                <div>
                   <div className="flex gap-1 mb-4 text-emerald-500">
                     {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                   </div>
                   <p className="text-forest-900/80 leading-relaxed font-medium mb-6 text-sm">
                     "{t.quote}"
                   </p>
                </div>
                
                <div className="pt-4 border-t border-forest-50">
                  <div className="font-serif font-bold text-forest-950">{t.author}</div>
                  <div className="flex flex-wrap items-center gap-x-2 text-xs text-forest-900/40 mt-1 uppercase tracking-wider font-medium">
                    <span>{t.role}</span>
                    {t.service && (
                        <>
                         <span>•</span>
                         <span className="text-forest-600/80">{t.service}</span>
                        </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};