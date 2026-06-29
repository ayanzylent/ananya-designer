import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  asLink?: boolean;
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl md:text-3xl",
};

export function Logo({ size = "md", className, asLink = true }: LogoProps) {
  const content = (
    <Image
      src="/logo-image.png"
      alt="Ananya Designer logo"
      width={120}
      height={40}
      className="h-9 w-auto object-contain"
    />
  );

  if (asLink) {
    return (
      <Link href="/" className="flex items-center gap-1 transition-opacity hover:opacity-80">
        {content}
      </Link>
    );
  }

  return content;
}
