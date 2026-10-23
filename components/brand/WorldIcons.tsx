import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";

export type GahnIcon = ComponentType<LucideProps>;

function Frame({
  children,
  size = 24,
  ...props
}: LucideProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="#173251"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Original GAHN symbols: navy geometry with a distinct accent for each world. */
export function CareerWorldIcon(props: LucideProps) {
  return (
    <Frame {...props}>
      <path d="M6 25V13l10-6 10 6v12" fill="#E8F0FF" />
      <path d="M11 28V17h10v11M4 28h24" />
      <path d="M13 12h6M16 9v6" stroke="#2864D7" />
      <rect
        x="13"
        y="20"
        width="6"
        height="5"
        rx="1"
        fill="#5E8EEB"
        stroke="none"
      />
    </Frame>
  );
}
export function SchoolWorldIcon(props: LucideProps) {
  return (
    <Frame {...props}>
      <path d="M5 6h10l2 3h10v18H17l-2-3H5Z" fill="#E8F3EF" />
      <path d="M16 9v15M9 12h3M9 16h3M21 14h3M21 18h3" />
      <path
        d="m21 3 1.5 3L26 7l-3 2-1 3-2-3-3-1 3-2Z"
        fill="#39866F"
        stroke="none"
      />
    </Frame>
  );
}
export function BrainWorldIcon(props: LucideProps) {
  return (
    <Frame {...props}>
      <path
        d="M16 6c-5-6-13 1-9 7-6 3-3 11 3 10 0 5 6 6 6 1V8c0-6 8-7 10-2 4 1 4 6 1 8 5 4 1 11-4 9 0 5-7 6-7 1"
        fill="#F0EAFA"
      />
      <path d="m9 10 4 4-3 4M23 9l-4 5 4 4M16 20h5" stroke="#8664AD" />
      <circle cx="11" cy="23" r="2" fill="#A18AC4" stroke="none" />
    </Frame>
  );
}
export function KnowledgeWorldIcon(props: LucideProps) {
  return (
    <Frame {...props}>
      <circle cx="16" cy="16" r="12" fill="#FFF3DE" />
      <ellipse cx="16" cy="16" rx="5" ry="12" />
      <path d="M4 16h24M7 9c6 3 12 3 18 0M7 23c6-3 12-3 18 0" />
      <circle
        cx="24"
        cy="8"
        r="4"
        fill="#D79B3D"
        stroke="#FFF"
        strokeWidth="2"
      />
    </Frame>
  );
}
export function BookWorldIcon(props: LucideProps) {
  return (
    <Frame {...props}>
      <path d="M5 7h8l3 3 3-3h8v19h-8l-3 2-3-2H5Z" fill="#FAEDE7" />
      <path d="M16 10v18M9 12h3M9 16h3M20 15h3M20 19h3" />
      <path d="M20 5v7l2-1 2 1V5" fill="#C47C5C" stroke="none" />
    </Frame>
  );
}
export function PathIcon(props: LucideProps) {
  return (
    <Frame {...props}>
      <path d="M7 25V12a5 5 0 0 1 5-5h12" stroke="#2D68CC" strokeWidth="2.5" />
      <path d="m20 3 5 4-5 4" />
      <circle cx="7" cy="25" r="4" fill="#B7D2F2" />
      <circle cx="7" cy="15" r="2" fill="#FFF" />
      <path d="M14 25h11M19 20h6" />
    </Frame>
  );
}
export function CanvasIcon(props: LucideProps) {
  return (
    <Frame {...props}>
      <rect x="4" y="6" width="24" height="21" rx="4" fill="#EAF0FA" />
      <path d="M4 12h24M9 17h6M9 21h4" />
      <path d="m19 23 1-5 5-5 3 3-5 5Z" fill="#80A4E4" />
      <circle cx="9" cy="9" r="1" fill="#173251" stroke="none" />
    </Frame>
  );
}
export function EvidenceIcon(props: LucideProps) {
  return (
    <Frame {...props}>
      <rect x="7" y="4" width="18" height="24" rx="3" fill="#EDF4EF" />
      <path d="M12 11h8M12 16h8M12 21h4" />
      <circle
        cx="24"
        cy="24"
        r="6"
        fill="#49836A"
        stroke="#FFF"
        strokeWidth="2"
      />
      <path d="m22 24 1.5 1.5 3-3" stroke="#FFF" />
    </Frame>
  );
}
