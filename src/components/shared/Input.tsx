import { motion } from "framer-motion";
import { ChangeEvent } from "react";

interface InputProps {
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  disabled = false,
}: InputProps) {
  return (
    <motion.input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700
        bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
        text-gray-900 dark:text-gray-100
        placeholder-gray-500 dark:placeholder-gray-400
        focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
        transition-all duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-sm hover:shadow-md focus:shadow-lg
        ${className}
      `}
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
    />
  );
}
