export const NavigationIcon = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: "rotate(45deg)", transformOrigin: "center" }}
    >
      <path d="M12 2L20 22l-8-5-8 5 8-20z" />
    </svg>
  );
};