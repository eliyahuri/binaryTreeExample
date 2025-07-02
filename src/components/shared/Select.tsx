import { motion } from "framer-motion";
import { ChangeEvent, ReactNode } from "react";

interface SelectProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function Select({
  value,
  onChange,
  children,
  className = "",
  disabled = false,
}: SelectProps) {
  return (
    <motion.select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700
        bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
        text-gray-900 dark:text-gray-100
        focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
        transition-all duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-sm hover:shadow-md focus:shadow-lg
        cursor-pointer appearance-none
        bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNkw4IDEwTDEyIDYiIHN0cm9rZT0iIzM3NDE1MSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+')]
        dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNkw4IDEwTDEyIDYiIHN0cm9rZT0iI0Y5RkFGQiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+')]
        bg-no-repeat bg-right bg-[length:16px_16px] pr-10
        ${className}
      `}
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.select>
  );
}
