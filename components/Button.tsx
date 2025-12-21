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
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    // Primary: Deep Green with a colored glow instead of black shadow
    primary: "bg-forest-900 text-white hover:bg-forest-800 shadow-[0_4px_20px_-4px_rgba(17,41,33,0.5)] hover:shadow-[0_8px_25px_-4px_rgba(17,41,33,0.6)] hover:-translate-y-0.5",
    
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