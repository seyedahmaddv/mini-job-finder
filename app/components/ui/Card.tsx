import React from "react";

const Card: React.FC<{ children: React.ReactNode; className?: string }> = React.memo(({ children, className = "" }) => {
  return <div className={`p-4 rounded-md shadow-sm bg-white dark:bg-zinc-800 ${className}`}>{children}</div>;
});

export default Card;
