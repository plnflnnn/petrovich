"use client";

import { ClientOnly } from "@/app/components/client-only";
import { useEffect, useRef, useState } from "react";

type YandexMapEmbedProps = {
  src: string;
  title: string;
};

function MapPlaceholder({ title }: { title: string }) {
  return (
    <div
      className="absolute inset-0 flex h-full w-full items-center justify-center bg-bg-soft"
      aria-hidden
    >
      <p className="text-xs text-text-muted">Карта загружается…</p>
      <span className="sr-only">{title}</span>
    </div>
  );
}

function YandexMapFrame({ src, title }: YandexMapEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 h-full w-full">
      {isInView ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="geolocation; fullscreen"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <MapPlaceholder title={title} />
      )}
    </div>
  );
}

export function YandexMapEmbed({ src, title }: YandexMapEmbedProps) {
  return (
    <ClientOnly fallback={<MapPlaceholder title={title} />}>
      <YandexMapFrame src={src} title={title} />
    </ClientOnly>
  );
}
