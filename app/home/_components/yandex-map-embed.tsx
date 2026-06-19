"use client";

import { cn } from "@/lib/utils/cn";
import { useEffect, useRef, useState } from "react";

type YandexMapEmbedProps = {
  embedUrl: string;
  title: string;
};

function MapPlaceholder({
  title,
  fadingOut,
}: {
  title: string;
  fadingOut: boolean;
}) {
  return (
    <div
      className={cn(
        "map-loading-shell absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-500 ease-out",
        fadingOut ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <p className="map-loading-label text-xs text-text-muted">Карта загружается…</p>
      <span className="sr-only">{title}</span>
    </div>
  );
}

export function YandexMapEmbed({ embedUrl, title }: YandexMapEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 h-full w-full overflow-hidden">
      <MapPlaceholder title={title} fadingOut={iframeReady} />

      {shouldLoadIframe ? (
        <iframe
          src={embedUrl}
          title={title}
          referrerPolicy="no-referrer-when-downgrade"
          allow="geolocation; fullscreen"
          onLoad={() => setIframeReady(true)}
          className={cn(
            "absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ease-out",
            iframeReady ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}
    </div>
  );
}
