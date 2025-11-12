"use client";

import { memo, useMemo } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  logos?: Logo[];
  className?: string;
}

const defaultLogos: Logo[] = [
    {
      id: "logo-1",
      description: "Partner Logo 1",
      image: "/assets/logo/logo1.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-2",
      description: "Partner Logo 2",
      image: "/assets/logo/logo2.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-3",
      description: "Partner Logo 3",
      image: "/assets/logo/logo3.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "Partner Logo 4",
      image: "/assets/logo/logo4.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-5",
      description: "Partner Logo 5",
      image: "/assets/logo/logo5.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-6",
      description: "Partner Logo 6",
      image: "/assets/logo/logo6.svg",
      className: "h-16 w-auto",
    },
    {
      id: "logo-7",
      description: "Partner Logo 7",
      image: "/assets/logo/logo7.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-8",
      description: "Partner Logo 8",
      image: "/assets/logo/logo8.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-9",
      description: "Partner Logo 9",
      image: "/assets/logo/logo9.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-10",
      description: "Partner Logo 10",
      image: "/assets/logo/logo10.svg",
      className: "h-4 w-auto",
    },
  ];

const Logos3 = memo(({ logos = defaultLogos, className = "" }: Logos3Props) => {
  const memoizedLogos = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="relative w-full flex items-center justify-center overflow-hidden">
        <Carousel
          opts={{ loop: true }}
          plugins={[AutoScroll({ playOnInit: true, speed: 1 }) as any]}
          className="w-full"
        >
          <CarouselContent className="ml-0 w-full">
            {memoizedLogos.map((logo, index) => (
              <CarouselItem
                key={`${logo.id}-${index}`}
                className="flex basis-auto justify-center pl-0"
              >
                <div className="flex shrink-0 items-center justify-center px-5 md:px-8 lg:px-12">
                  <Image
                    src={logo.image}
                    alt={logo.description}
                    width={160}
                    height={64}
                    className={logo.className}
                    loading="lazy"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
});

export { Logos3 };
