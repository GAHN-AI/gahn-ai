"use client";

import { Globe2 } from "lucide-react";

export const supportedLanguages = [
  "English",
  "Spanish",
  "French",
  "Portuguese",
  "German",
  "Italian",
  "Arabic",
  "Hindi",
  "Mandarin Chinese",
  "Japanese",
  "Korean",
  "Russian",
  "Turkish",
  "Vietnamese",
  "Indonesian",
  "Swahili",
];

export default function LanguageSelector({
  value,
  onChange,
  compact = false,
}: {
  value: string;
  onChange: (language: string) => void;
  compact?: boolean;
}) {
  return (
    <label
      className={`flex items-center gap-2 rounded-xl border border-[#D7E3F2] bg-white text-[#0B1739] shadow-sm ${
        compact ? "px-3 py-2" : "px-4 py-3"
      }`}
    >
      <Globe2 className="h-4 w-4 shrink-0 text-[#1677FF]" strokeWidth={1.75} />
      <span className="sr-only">Teaching language</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 bg-transparent text-sm font-semibold outline-none"
        aria-label="Teaching language"
      >
        {supportedLanguages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </label>
  );
}
