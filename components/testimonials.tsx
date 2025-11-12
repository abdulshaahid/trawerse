"use client"

import { memo, useMemo } from "react"
import { Star } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

interface Review {
  name: string;
  username: string;
  body: string;
  img: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Akhil Raj",
    username: "@akhilr",
    body: "Trawerse built our website with world-class UI and UX. Every interaction feels smooth and thoughtful — easily one of the best design teams we've worked with.",
    img: "https://avatar.vercel.sh/akhil",
    rating: 5,
  },
  {
    name: "Neha Nair",
    username: "@nehanair",
    body: "The platform they developed for us is secure, fast, and beautifully designed. You can see the perfection in every small detail.",
    img: "https://avatar.vercel.sh/neha",
    rating: 4,
  },
  {
    name: "Vishnu Prasad",
    username: "@vishnuprasad",
    body: "Trawerse gave us a feature-packed system that can easily handle high traffic without breaking a sweat. The performance is incredible.",
    img: "https://avatar.vercel.sh/vishnu",
    rating: 5,
  },
  {
    name: "Amritha S",
    username: "@amritha_s",
    body: "What impressed us most was their support. Even after delivery, the team responded instantly and helped us fine-tune everything perfectly.",
    img: "https://avatar.vercel.sh/amritha",
    rating: 3,
  },
  {
    name: "Rahul Krishnan",
    username: "@rahulk",
    body: "Highly secure, lightning fast, and visually perfect — Trawerse proved they can handle complex systems without compromising design quality.",
    img: "https://avatar.vercel.sh/rahul",
    rating: 5,
  },
  {
    name: "Anjali Menon",
    username: "@anjalimenon",
    body: "Our app now feels premium and user-friendly. Trawerse’s design and support quality easily beat every other agency we’ve tried.",
    img: "https://avatar.vercel.sh/anjali",
    rating: 4,
  },
];

const ReviewCard = memo(function ReviewCard({ img, name, username, body, rating }: Review) {
  const ratingStars = useMemo(() => Array.from({ length: rating }), [rating]);

  return (
    <figure
      className={cn(
        "relative w-64 sm:w-80 cursor-pointer overflow-hidden rounded-xl p-3 sm:p-4",
        "transition-all duration-300"
      )}
      style={{
        background:
          "linear-gradient(90deg, #151515 0%, #1a1a1a 10%, #151515 20%, #1c1c1c 30%, #151515 40%, #1a1a1a 50%, #151515 60%, #1c1c1c 70%, #151515 80%, #1a1a1a 90%, #151515 100%)",
        backgroundSize: "300% 100%",
        animation: "metalShift 10s ease-in-out infinite",
      }}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="relative w-7 h-7 sm:w-8 sm:h-8 overflow-hidden rounded-full flex-shrink-0">
          <Image
            src={img}
            alt=""
            fill
            sizes="32px"
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col">
          <figcaption className="text-xs sm:text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-[10px] sm:text-xs font-medium dark:text-white/40">
            {username}
          </p>
        </div>
      </div>
      <div className="flex gap-1 my-1.5 sm:my-2">
        {ratingStars.map((_, i) => (
          <Star
            key={i}
            className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>
      <blockquote className="mt-1.5 sm:mt-2 text-xs sm:text-sm dark:text-white/80">
        {body}
      </blockquote>
    </figure>
  );
});

export const Testimonials = memo(function Testimonials() {
  const firstRow = useMemo(() => reviews.slice(0, 2), []);
  const secondRow = useMemo(() => reviews.slice(2, 4), []);
  const thirdRow = useMemo(() => reviews.slice(4, 6), []);

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden w-full">
      {/* Section Header */}
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 mb-16 space-y-4">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold overflow-hidden"
          initial={{ opacity: 0, x: -100, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2
          }}
        >
          <span className="bg-gradient-to-b from-gray-200 via-white to-gray-300 bg-clip-text text-transparent">
            Built with passion.{" "}
          </span>
          <span className="text-accent">
            Loved by clients.
          </span>
        </motion.h2>
        <motion.p
          className="text-white/70 text-lg md:text-xl max-w-2xl"
          initial={{ opacity: 0, x: -80, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4
          }}
        >
          From startups to enterprises — our work speaks through the people who use it. Here's what they say about partnering with Trawerse.
        </motion.p>
      </div>

      {/* Testimonials Marquee - Full Width */}
      <motion.div
        className="relative flex flex-col items-center justify-center gap-1 sm:gap-4 overflow-hidden w-full"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        }}
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.6
        }}
      >
        <Marquee pauseOnHover className="[--duration:25s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:25s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        {/* Third row - visible only on mobile */}
        <Marquee pauseOnHover className="[--duration:25s] sm:hidden">
          {thirdRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
});
