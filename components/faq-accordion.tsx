"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white/[0.03] backdrop-blur-xl rounded-2xl overflow-hidden hover:bg-white/[0.08] transition-all duration-300 border-none shadow-lg"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-6 py-4 text-left"
            aria-expanded={openIndex === index}
          >
            <span className="text-sm md:text-base font-medium text-white pr-4">
              {item.question}
            </span>
            <span
              className={`text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                openIndex === index ? "rotate-45" : ""
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
