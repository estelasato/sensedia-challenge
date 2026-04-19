"use client";

import Image from "next/image";

import { cn } from "@/src/components/lib/utils";

const sizes = {
  sm: { box: "size-9 text-xs", px: 36 },
  md: { box: "size-12 text-sm", px: 48 },
  lg: { box: "size-16 text-base", px: 64 },
  xl: { box: "size-20 text-lg", px: 80 },
} as const;

export type AvatarProps = {
  src?: string | null;
  alt: string;
  initials?: string;
  size?: keyof typeof sizes;
  className?: string;
};

export function Avatar({
  src,
  alt,
  initials = "?",
  size = "sm",
  className,
}: AvatarProps) {
  const s = sizes[size];
  const url = src?.trim();

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary font-semibold uppercase text-white ring-2 ring-white",
        s.box,
        className,
      )}
    >
      {url ? (
        <Image
          src={url}
          alt={alt}
          width={s.px}
          height={s.px}
          className="h-full w-full object-cover"
          unoptimized
        />
      ) : (
        initials
      )}
    </span>
  );
}
