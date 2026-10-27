"use client";

// Deprecated instructor entry point; the actual lesson route now renders
// LearningStudio for every learning world. Retained for compatibility only.
// This component never creates an old LiveAvatar or billable Tavus session.
export default function WorldInstructorSession() {
  return (
    <div className="grid min-h-[380px] place-items-center bg-black text-center text-xs text-white/70">
      Private AI instructor not connected
    </div>
  );
}
