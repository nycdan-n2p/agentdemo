interface ArrowIconProps {
  direction?: "left" | "right";
  className?: string;
}

export function ArrowIcon({ direction = "right", className = "" }: ArrowIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${direction === "left" ? "rotate-180" : ""} ${className}`}
      aria-hidden
    >
      <path
        d="M12.6666 8.0013H3.33325"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33325 11.3333L12.6666 8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33325 4.66797L12.6666 8.0013"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
