import { cn } from "@/lib/utils";

interface UserIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function UserIcon({ className, ...props }: UserIconProps) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      className={cn("h-5 w-5", className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="256" cy="256" r="128" className="fill-current" />
      <circle cx="768" cy="256" r="64" className="fill-current" />
      <circle cx="256" cy="768" r="64" className="fill-current" />
      <circle cx="768" cy="768" r="128" className="fill-current" />
      <path
        d="M512 512m-192 0a192 192 0 1 0 384 0 192 192 0 1 0-384 0"
        className="fill-current"
      />
    </svg>
  );
}
