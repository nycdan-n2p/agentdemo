"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChipSelectorProps {
  options: { value: string; label: string; icon?: string }[];
  value: string | null;
  onChange: (value: string) => void;
  allowMultiple?: boolean;
  className?: string;
}

export function ChipSelector({
  options,
  value,
  onChange,
  allowMultiple = false,
  className,
}: ChipSelectorProps) {
  const selectedValues = value
    ? (allowMultiple ? value.split(",").map((s) => s.trim()).filter(Boolean) : [value])
    : [];

  const handleClick = (optionValue: string) => {
    if (allowMultiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onChange(newValues.join(", ") || "");
    } else {
      onChange(selectedValues.includes(optionValue) ? "" : optionValue);
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        return (
          <motion.button
            key={option.value}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick(option.value)}
            style={{
              border: 0,
              borderWidth: 0,
              outline: "none",
              boxShadow: "none",
              WebkitAppearance: "none",
              appearance: "none",
            }}
            className={cn(
              "chip-no-stroke px-4 py-2 rounded-full overflow-hidden text-sm font-medium transition-colors",
              isSelected
                ? "bg-primary text-primary-foreground"
                : "bg-[#EFEFEF] text-muted-foreground hover:bg-[#EAEAEA] hover:text-foreground"
            )}
          >
            {option.icon && <span className="mr-1.5">{option.icon}</span>}
            {option.label}
          </motion.button>
        );
      })}
    </div>
  );
}
