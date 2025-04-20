
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "yellow" | "purple" | "coral" | "primary";
}

export function BadgeCustom({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    yellow: "bg-brand-yellow/20 text-brand-yellow",
    purple: "bg-brand-purple/20 text-brand-purple",
    coral: "bg-brand-coral/20 text-brand-coral",
    primary: "bg-brand-primary/20 text-brand-primary",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
