import { NavigationIcon } from "@/components/layout/header/NavigationIcon";

export const NavigationText = ({ className = "" }: { className?: string }) => {
  return (
    <span className={`flex items-baseline ${className}`}>
        <span>N</span>
        <NavigationIcon className="w-3 h-3 mx-0.5" />
        <span>vig</span>
        <span className="relative -top-px">ation</span>
    </span>
  );
};