import React from "react";

export const Logo = ({ className = "h-10 w-auto" }: { className?: string }) => (
  <svg
    viewBox="0 0 1024 1024"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="256" cy="256" r="128" fill="#008751" />
    <circle cx="768" cy="256" r="64" fill="#008751" />
    <circle cx="256" cy="768" r="64" fill="#008751" />
    <circle cx="768" cy="768" r="128" fill="#008751" />
    <path
      d="M512 512m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0"
      fill="#008751"
    />
    <circle cx="384" cy="384" r="96" fill="#0E7490" />
    <circle cx="640" cy="384" r="48" fill="#0E7490" />
    <circle cx="384" cy="640" r="48" fill="#0E7490" />
    <circle cx="640" cy="640" r="96" fill="#0E7490" />
    <path
      d="M512 512m-192 0a192 192 0 1 0 384 0 192 192 0 1 0-384 0"
      fill="#0E7490"
    />
  </svg>
);
