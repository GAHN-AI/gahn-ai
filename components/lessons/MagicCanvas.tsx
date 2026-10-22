"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  NotebookPen,
  PencilLine,
  ClipboardCheck,
  Lightbulb,
  Network,
  Send,
  Sparkles,
  Target,
} from "lucide-react";
import type { CanvasBlock, InstructorTurn } from "@/lib/ai/lessonEngine";

type Props = {
  turn: InstructorTurn | null;
  lessonTitle?: string;
  loading?: boolean;
  onRespond: (response: string) => void | Promise<void>;
  notes?: string;
  notesEnabled?: boolean;
  notesSaved?: boolean;
  onNotesChange?: (value: string) => void;
  onSaveNotes?: () => void | Promise<void>;
};

function BlockIcon({ type }: { type: CanvasBlock["type"] }) {
  if (type === "diagram") return <Network className="h-4 w-4" />;
  if (type === "activity") return <PencilLine className="h-4 w-4" />;
  if (type === "mastery") return <Target className="h-4 w-4" />;
  return <Lightbulb className="h-4 w-4" />;
}

function Question({
  block,
  disabled,
  onRespond,
}: {
  block: CanvasBlock;
  disabled: boolean;
  onRespond: Props["onRespond"];
}) {
  const [answer, setAnswer] = useState("");

  return (
    <div>
      <p className="text-sm font-semibold leading-6 text-[#0B1739]">
        {block.question || block.body || block.title}
      </p>

      {block.options?.length ? (
        <div className="mt-4 grid gap-2">
          {block.options.map((option) => (
            <button
              key={option}
              type="button"
              disabled={disabled}
              onClick={() => setAnswer(option)}
              className={`rounded-xl border px-4 py-3 text-left text-sm ${
                answer === option
                  ? "border-[#1677FF] bg-[#EAF3FF]"
                  : "border-[#D7E3F2] bg-white hover:border-[#AFC9EB]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <textarea
          value={answer}
          disabled={disabled}
          onChange={(event) => setAnswer(event.target.value)}
          rows={4}
          placeholder="Explain your answer in your own words..."
          className="mt-4 w-full resize-none rounded-xl border border-[#D7E3F2] px-4 py-3 text-sm leading-6 outline-none focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
        />
      )}

      {block.hint && (
        <p className="mt-3 rounded-lg bg-[#FFF9E8] px-3 py-2 text-xs leading-5 text-[#6B5A20]">
          <strong>Hint:</strong> {block.hint}
        </p>
      )}

      <button
        type="button"
        disabled={disabled || !answer.trim()}
        onClick={() => onRespond(answer.trim())}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#1677FF] px-4 py-2.5 text-sm font-bold text-white disabled:bg-[#B8C7DA]"
      >
        Check my answer
        <Send className="h-4 w-4" />
      </button>
    </div>
  );
}

function Activity({
  block,
  disabled,
  onRespond,
}: {
  block: CanvasBlock;
  disabled: boolean;
  onRespond: Props["onRespond"];
}) {
  const [answer, setAnswer] = useState("");

  return (
    <div>
      <p className="text-sm leading-6 text-[#53657D]">
        {block.instructions || block.body || "Complete the activity, then submit your work."}
      </p>
      <textarea
        value={answer}
        disabled={disabled}
        onChange={(event) => setAnswer(event.target.value)}
        rows={5}
        placeholder={block.fields?.[0]?.placeholder || "Build your answer here..."}
        className="mt-4 w-full resize-none rounded-xl border border-[#D7E3F2] px-4 py-3 text-sm leading-6 outline-none focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
      />
      <button
        type="button"
        disabled={disabled || !answer.trim()}
        onClick={() => onRespond(answer.trim())}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#1677FF] px-4 py-2.5 text-sm font-bold text-white disabled:bg-[#B8C7DA]"
      >
        Submit activity
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function Block({
  block,
  disabled,
  onRespond,
}: {
  block: CanvasBlock;
  disabled: boolean;
  onRespond: Props["onRespond"];
}) {
  if (block.type === "question") {
    return <Question block={block} disabled={disabled} onRespond={onRespond} />;
  }

  if (block.type === "activity") {
    return <Activity block={block} disabled={disabled} onRespond={onRespond} />;
  }

  if (block.type === "diagram") {
    return (
      <div className="grid gap-2">
        {(block.nodes || []).map((node, index) => (
          <div key={`${node}-${index}`} className="flex items-center gap-2">
            <div className="flex-1 rounded-xl border border-[#CFE0F5] bg-[#F8FBFF] px-4 py-3 text-sm font-semibold">
              {node}
            </div>
            {index < (block.nodes?.length || 0) - 1 && (
              <ArrowRight className="h-4 w-4 shrink-0 text-[#7A8AA0]" />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (block.type === "mastery") {
    return (
      <div className="grid gap-2">
        {(block.checks || []).map((check) => (
          <div key={check} className="flex items-start gap-2 rounded-xl bg-[#F8FBFF] px-4 py-3">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#1677FF]" />
            <span className="text-sm leading-6 text-[#40536D]">{check}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {block.body && <p className="text-sm leading-7 text-[#40536D]">{block.body}</p>}
      {block.bullets?.length ? (
        <ul className="mt-3 grid gap-2">
          {block.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-sm leading-6 text-[#40536D]">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#1677FF]" />
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function MagicCanvas({
  turn,
  lessonTitle,
  loading = false,
  onRespond,
  notes = "",
  notesEnabled = false,
  notesSaved = false,
  onNotesChange,
  onSaveNotes,
}: Props) {
  const [activeTab, setActiveTab] = useState<"worksheet" | "notes" | "practice">("worksheet");
  const visibleBlocks = activeTab === "practice"
    ? (turn?.canvas.blocks || []).filter((block) => ["question", "activity", "mastery"].includes(block.type))
    : (turn?.canvas.blocks || []);

  return (
    <section data-learning-workspace="magic-canvas"
      className="flex min-h-[680px] min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-[#D7E3F2] bg-white shadow-[0_16px_45px_rgba(11,23,57,0.06)]">
      <div className="border-b border-[#D7E3F2] bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-extrabold tracking-[-0.035em] text-[#0B1739]">Magic Canvas</h2>
          <span className="max-w-full truncate rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-semibold text-[#0F65E8]">
            {lessonTitle || "Lesson workspace"}
          </span>
        </div>
        <p className="mt-1 text-sm text-[#64748B]">
          {turn?.canvas.title || "Your interactive lesson workspace"}
        </p>
      </div>

      <div className="border-b border-[#E3EBF5] px-4 pt-4 sm:px-5">
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#D7E3F2] bg-[#F8FBFF] px-3 py-2.5">
          <FileText className="h-4 w-4 shrink-0 text-[#1677FF]" />
          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-[#1D3153]">
            {lessonTitle || "Lesson workspace"}
          </span>
          <span className="text-xs font-semibold text-[#64748B]">
            {turn ? "Lesson started" : "Not started"}
          </span>
        </div>
        <div role="tablist" aria-label="Magic Canvas tabs" className="mt-3 flex gap-2 border-b border-[#EDF1F7]">
          {([
            { id: "worksheet", label: "Worksheet", Icon: FileText },
            { id: "notes", label: "Notes", Icon: NotebookPen },
            { id: "practice", label: "Practice", Icon: ClipboardCheck },
          ] as const).map(({ id, label, Icon }) => (
            <button
              type="button"
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              aria-controls="magic-canvas-panel"
              onClick={() => setActiveTab(id)}
              className={activeTab === id
                ? "inline-flex items-center gap-1.5 border-b-2 border-[#1677FF] px-3 py-3 text-xs font-bold text-[#0F65E8]"
                : "inline-flex items-center gap-1.5 border-b-2 border-transparent px-3 py-3 text-xs font-semibold text-[#667791] hover:text-[#0F65E8]"}
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          ))}
        </div>
      </div>

      <div id="magic-canvas-panel" role="tabpanel"
        className="flex-1 space-y-4 overflow-y-auto bg-[#F8FBFF] p-4 sm:p-5">
        {!turn ? (
          <div className="grid min-h-[440px] place-items-center rounded-2xl border border-dashed border-[#CFE0F5] bg-white px-6 text-center">
            <div className="max-w-sm">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#EAF3FF] text-[#1677FF]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-[#0B1739]">
                {loading ? "Preparing your learning workspace..." : "No learning workspace started"}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#53657D]">
                Start a lesson to see questions, explanations, practice and notes here.
              </p>
            </div>
          </div>
        ) : activeTab === "notes" ? (
          <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5">
            <h3 className="text-base font-bold text-[#0B1739]">Lesson notes</h3>
            {notesEnabled ? (
              <>
                <textarea value={notes} rows={9}
                  onChange={(event) => onNotesChange?.(event.target.value)}
                  onBlur={() => { if (notes.trim()) void onSaveNotes?.(); }}
                  placeholder="Write what you want to remember from this lesson..."
                  className="mt-4 w-full resize-y rounded-xl border border-[#D7E3F2] p-4 text-sm leading-6 outline-none focus:border-[#1677FF]" />
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-xs text-[#53657D]">Notes save to My Notes.</p>
                  <button type="button" disabled={!notes.trim() || loading}
                    onClick={() => void onSaveNotes?.()}
                    className="rounded-lg bg-[#0B1739] px-4 py-2 text-sm font-bold text-white disabled:opacity-50">
                    {notesSaved ? "Saved" : "Save note"}
                  </button>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm leading-6 text-[#53657D]">
                Personal lesson notes are not included in your current access.
              </p>
            )}
          </div>
        ) : (
          <>
            {activeTab === "practice" && visibleBlocks.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#CFE0F5] bg-white p-8 text-center text-sm text-[#53657D]">
                Practice activities will appear when this lesson reaches a question or exercise.
              </div>
            )}
            {visibleBlocks.map((block, index) => (
              <article
                key={`${activeTab}-${block.type}-${block.title}-${index}`}
                className="rounded-2xl border border-[#D7E3F2] bg-white p-5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                    <BlockIcon type={block.type} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7A8AA0]">{block.type}</p>
                    <h3 className="font-bold">{block.title}</h3>
                  </div>
                </div>
                <Block block={block} disabled={loading} onRespond={onRespond} />
              </article>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
