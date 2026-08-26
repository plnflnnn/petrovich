"use client";

import { cn } from "@/lib/utils/cn";
import type { SiteImage } from "@/lib/data/site-images";
import Image from "next/image";
import { useIsClient } from "@/lib/utils/use-is-client";
import { useId, useState, type ReactNode } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

type HeroImageSliderProps = {
  slides: SiteImage[];
  children?: ReactNode;
  className?: string;
  innerClassName?: string;
  sizes?: string;
  priority?: boolean;
  autoplayMs?: number;
};

const controlButtonClass =
  "relative cursor-pointer rounded-full border border-white/25 bg-white/15 px-3.5 py-2 text-sm font-semibold leading-tight text-white backdrop-blur-md transition-colors hover:bg-white/30 active:bg-white/40 sm:px-4 sm:py-2.5";

type SliderControlsProps = {
  swiper: SwiperInstance | null;
  activeIndex: number;
  total: number;
  className?: string;
};

function SliderControls({
  swiper,
  activeIndex,
  total,
  className,
}: SliderControlsProps) {
  return (
    <div
      role="group"
      className={cn("flex items-center gap-2", className)}
      aria-label="Управление слайдером"
    >
      <button
        type="button"
        onClick={() => swiper?.slidePrev()}
        className={controlButtonClass}
        aria-label="Предыдущее фото"
      >
        ←
      </button>
      <span
        className={cn(
          controlButtonClass,
          "pointer-events-none cursor-default hover:bg-white/15 active:bg-white/15",
        )}
        aria-live="polite"
      >
        {activeIndex + 1}/{total}
      </span>
      <button
        type="button"
        onClick={() => swiper?.slideNext()}
        className={controlButtonClass}
        aria-label="Следующее фото"
      >
        →
      </button>
    </div>
  );
}

export function HeroImageSlider({
  slides,
  children,
  className,
  innerClassName,
  sizes = "(max-width: 1280px) 100vw, 1200px",
  priority = true,
  autoplayMs = 6000,
}: HeroImageSliderProps) {
  const isClient = useIsClient();
  const labelId = useId();
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (slides.length === 0) return null;

  const showControls = slides.length > 1;
  const firstSlide = slides[0];

  return (
    <div className={cn("relative flex flex-col", className, innerClassName)}>
      <div className="absolute inset-0 z-0" aria-labelledby={labelId}>
        <span id={labelId} className="sr-only">
          Галерея фотографий, слайд {activeIndex + 1} из {slides.length}
        </span>

        {isClient ? (
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={showControls}
            speed={700}
            autoplay={
              showControls
                ? { delay: autoplayMs, disableOnInteraction: false }
                : false
            }
            onSwiper={setSwiper}
            onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
            className="pointer-events-none h-full w-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.src} className="relative h-full w-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={priority && index <= 1}
                  className="object-cover"
                  sizes={sizes}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="relative h-full w-full">
            <Image
              src={firstSlide.src}
              alt={firstSlide.alt}
              fill
              priority={priority}
              className="object-cover"
              sizes={sizes}
            />
          </div>
        )}
      </div>

      {children}

      {showControls && isClient ? (
        <>
          <SliderControls
            swiper={swiper}
            activeIndex={activeIndex}
            total={slides.length}
            className="pointer-events-auto absolute right-5 bottom-5 z-20 hidden sm:right-6 sm:bottom-6 sm:flex"
          />
          <SliderControls
            swiper={swiper}
            activeIndex={activeIndex}
            total={slides.length}
            className="pointer-events-auto relative z-10 mt-auto flex justify-end px-6 pb-6 pt-2 sm:hidden"
          />
        </>
      ) : null}
    </div>
  );
}
