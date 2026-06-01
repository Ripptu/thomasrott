import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-[400ms] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]";
  
  const variants = {
    // Primary: Deep Green with a colored glow instead of black shadow
    primary: "bg-white text-black hover:opacity-95 shadow-sm border border-neutral-200/50 hover:shadow-inner hover:-translate-y-0.5",
    
    // Secondary: Very subtle tinted background
    secondary: "bg-forest-50 text-forest-900 hover:bg-forest-100 border border-transparent shadow-sm hover:shadow",
    
    // Outline: Thinner, elegant border
    outline: "bg-transparent border border-forest-900/30 text-forest-900 hover:border-forest-900 hover:bg-forest-50",
    
    ghost: "bg-transparent text-forest-700 hover:text-forest-900 hover:bg-forest-50/50"
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};