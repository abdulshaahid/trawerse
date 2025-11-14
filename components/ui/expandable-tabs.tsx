"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: never;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
  logo?: React.ReactNode;
  rightContent?: React.ReactNode;
  isExpanded?: boolean;
}

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.35,
};

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
  onChange,
  logo,
  rightContent,
  isExpanded = false,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const outsideClickRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(outsideClickRef as any, () => {
    setSelected(null);
    onChange?.(null);
  });

  const handleSelect = (index: number) => {
    setSelected(index);
    onChange?.(index);
  };

  const Separator = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-white/25" aria-hidden="true" />
  );

  return (
    <motion.div
      ref={outsideClickRef}
      className={cn(
        "flex items-center gap-2 rounded-3xl p-1 min-h-[48px]",
        "bg-white/8 backdrop-blur-xl border border-white/4 shadow-lg",
        className
      )}
      style={{
        width: "fit-content",
        maxWidth: "100%",
      }}
      animate={{
        paddingLeft: isExpanded ? "1.5rem" : "0.25rem",
        paddingRight: isExpanded ? "0.25rem" : "0.25rem",
        gap: isExpanded ? "1rem" : "0.5rem",
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    >
      {logo && (
        <>
          <div className="flex items-center pl-1 flex-shrink-0">{logo}</div>
          <Separator />
        </>
      )}
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        const isSelected = selected === index;
        
        return (
          <motion.button
            key={tab.title}
            onClick={() => handleSelect(index)}
            className={cn(
              "relative flex items-center rounded-3xl text-sm font-medium transition-colors duration-300 flex-shrink-0",
              isSelected
                ? "text-white bg-white/0 backdrop-blur-sm shadow-md"
                : "text-gray-300 hover:text-white hover:bg-white/15"
            )}
            animate={{
              gap: isSelected ? ".5rem" : 0,
              paddingLeft: isSelected ? "1rem" : ".5rem",
              paddingRight: isSelected ? "1rem" : ".5rem",
              paddingTop: ".5rem",
              paddingBottom: ".5rem",
            }}
            transition={transition}
          >
            <Icon size={20} className="flex-shrink-0" />
            <AnimatePresence initial={false}>
              {isSelected && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
      {rightContent && (
        <>
          <Separator />
          <div
            className={cn(
              "flex items-center flex-shrink-0",
              isExpanded ? "pr-0" : ""
            )}
          >
            {rightContent}
          </div>
        </>
      )}
    </motion.div>
  );
}