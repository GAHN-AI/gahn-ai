"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HERO_LINE_ONE = "Learn Anything in the World.";
const HERO_LINE_TWO = "Understand It Clearly.";
const HERO_EYEBROW = "PRIVATE AI LEARNING — ANY TOPIC, ANY LANGUAGE";
const HERO_DESCRIPTION =
  "Your private AI learning system can teach careers, school subjects, books, skills, and almost any topic step by step—in plain English or the language you speak—so you can learn without confusion.";

export default function LandingHeroEnhancer() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    function updateHero() {
      const headings = Array.from(document.querySelectorAll("h1"));
      const heroHeading = headings.find((heading) => {
        const text = heading.textContent?.replace(/\s+/g, " ").trim() || "";
        return (
          text.includes("Learn Smarter with") ||
          text.includes("Learn Anything You Want") ||
          text.includes(HERO_LINE_ONE) ||
          text.includes(HERO_LINE_TWO)
        );
      });

      if (!heroHeading) return;

      const currentText = heroHeading.textContent?.replace(/\s+/g, " ").trim();
      const desiredText = `${HERO_LINE_ONE} ${HERO_LINE_TWO}`;

      if (currentText !== desiredText) {
        const firstLine = document.createElement("span");
        firstLine.className = "block";
        firstLine.textContent = HERO_LINE_ONE;

        const secondLine = document.createElement("span");
        secondLine.className = "block text-[#1677FF]";
        secondLine.textContent = HERO_LINE_TWO;

        heroHeading.replaceChildren(firstLine, secondLine);
      }

      const eyebrow = heroHeading.previousElementSibling;
      if (eyebrow instanceof HTMLParagraphElement && eyebrow.textContent !== HERO_EYEBROW) {
        eyebrow.textContent = HERO_EYEBROW;
      }

      const description = heroHeading.nextElementSibling;
      if (
        description instanceof HTMLParagraphElement &&
        description.textContent !== HERO_DESCRIPTION
      ) {
        description.textContent = HERO_DESCRIPTION;
      }
    }

    updateHero();

    const observer = new MutationObserver(() => updateHero());
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
