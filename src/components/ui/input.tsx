import * as React from "react"
import { cn } from "../lib/utils"
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  errorMessage?: string;
  classNameContainer?: string;
  isPassword?: boolean;
  label?: string;
}
function Input({ errorMessage, className, classNameContainer, type, isPassword, label, ...props }: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className={cn("relative", classNameContainer)}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}

      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          data-slot="input"
          className={cn(
            "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-1 aria-invalid:ring-danger/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40",
            className
          )}
          {...props}
          aria-invalid={errorMessage ? "true" : "false"}
        />
        {isPassword && (
          <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
          </button>
        )}
      </div>
      {errorMessage && <p className="text-xs text-danger">{errorMessage}</p>}
    </div>
  )
}

export { Input }
