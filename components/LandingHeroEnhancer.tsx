"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HERO_LINE_ONE = "Learn Anything You Want,";
const HERO_LINE_TWO = "in a Way You Understand.";
const HERO_EYEBROW = "PRIVATE AI LEARNING — ANY TOPIC, ANY LANGUAGE";
const HERO_DESCRIPTION =
  "Choose a career, school subject, skill, book, or topic. GAHN AI teaches it step by step in clear language—English or your preferred language—then gives practice and checks that you actually understand.";

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
