const prefetched = new Set<string>();

/** Warm the browser cache for upcoming hero slides without blocking render. */
export function prefetchImage(src: string, priority: "preload" | "prefetch" = "prefetch") {
  if (prefetched.has(src)) return;
  prefetched.add(src);

  if (typeof document !== "undefined") {
    const link = document.createElement("link");
    link.rel = priority;
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
    return;
  }

  const img = new Image();
  img.src = src;
}

export function prefetchHeroSlides(slides: { src: string }[], activeIndex = 0) {
  if (slides.length <= 1) return;

  slides.forEach((slide, index) => {
    if (index === 0) return;
    prefetchImage(slide.src, index === 1 ? "preload" : "prefetch");
  });

  const nextIndex = (activeIndex + 1) % slides.length;
  if (nextIndex !== 0) {
    prefetchImage(slides[nextIndex].src, "preload");
  }
}
