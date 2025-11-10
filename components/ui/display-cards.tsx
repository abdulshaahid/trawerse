"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { useState } from "react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}: DisplayCardProps) {
  const [isActive, setIsActive] = useState(false);

  const handleTouch = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 2000);
  };

  return (
    <div
      data-active={isActive}
      className={cn(
        "relative flex h-32 w-80 -skew-y-[4deg] select-none flex-col justify-between rounded-lg bg-gradient-to-br from-zinc-900 to-zinc-950 px-5 py-3 transition-all duration-500 shadow-md hover:shadow-lg hover:shadow-primary/15 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        isActive && "!shadow-lg !shadow-primary/15 data-[active=true]:shadow-lg data-[active=true]:shadow-primary/15",
        className
      )}
      onTouchStart={handleTouch}
    >
      <div>
        <span className={cn("relative inline-block rounded-full p-1.5 ring-1", iconClassName)}>
          {icon}
        </span>
        <p className={cn("text-base font-semibold", titleClassName)}>{title}</p>
      </div>
      <p className="text-sm text-foreground/90">{description}</p>
      <p className="text-xs text-muted-foreground/60">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
