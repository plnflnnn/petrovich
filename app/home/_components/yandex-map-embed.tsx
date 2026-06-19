"use client";

import { useEffect, useRef, useState } from "react";

type YandexMapEmbedProps = {
  embedUrl: string;
  staticMapUrl: string;
  title: string;
};

export function YandexMapEmbed({
  embedUrl,
  staticMapUrl,
  title,
}: YandexMapEmbedProps) {
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={staticMapUrl}
        alt=""
        aria-hidden
        decoding="async"
        fetchPriority="high"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          iframeReady ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      />

      <span className="sr-only">{title}</span>

      {shouldLoadIframe ? (
        <iframe
          src={embedUrl}
          title={title}
          referrerPolicy="no-referrer-when-downgrade"
          allow="geolocation; fullscreen"
          onLoad={() => setIframeReady(true)}
          className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ${
            iframeReady ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}
    </div>
  );
}
