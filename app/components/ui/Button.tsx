import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" };

const Button: React.FC<Props> = React.memo(({ children, className = "", variant = "primary", ...rest }) => {
  const base = "px-4 py-2 rounded-md inline-flex items-center justify-center";
  const style = variant === "primary" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-transparent border";
  return (
    <button className={`${base} ${style} ${className}`} {...rest}>
      {children}
    </button>
  );
});

export default Button;
