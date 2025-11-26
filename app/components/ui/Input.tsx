import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, ...rest }, ref) => (
  <div>
    {label && <label className="block text-sm font-medium">{label}</label>}
    <input ref={ref} className="mt-1 block w-full rounded-md border p-2" {...rest} />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
));
Input.displayName = "Input";

export default React.memo(Input);
