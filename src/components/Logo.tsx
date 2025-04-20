import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      className={cn("h-8 w-8", className)}
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
