"use client";

import { ClientOnly } from "@/app/components/client-only";

type YandexMapEmbedProps = {
  src: string;
  title: string;
};

export function YandexMapEmbed({ src, title }: YandexMapEmbedProps) {
  return (
    <ClientOnly
      fallback={
        <div
          className="absolute inset-0 h-full w-full bg-bg-soft"
          aria-hidden
        />
      }
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allow="geolocation; fullscreen"
        className="absolute inset-0 h-full w-full border-0"
      />
    </ClientOnly>
  );
}
