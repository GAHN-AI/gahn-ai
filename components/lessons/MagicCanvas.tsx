"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Network,
  PencilLine,
  Send,
  Sparkles,
  Target,
} from "lucide-react";
import type { CanvasBlock, InstructorTurn } from "@/lib/ai/lessonEngine";

type Props = {
  turn: InstructorTurn | null;
  loading?: boolean;
  onRespond: (response: string) => void | Promise<void>;
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

export default function MagicCanvas({ turn, loading = false, onRespond }: Props) {
  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-[#D7E3F2] bg-white shadow-[0_16px_45px_rgba(11,23,57,0.06)]">
      <div className="border-b border-[#D7E3F2] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_62%,#EAF3FF_100%)] p-5 sm:p-6">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1677FF]">
          <Sparkles className="h-4 w-4" />
          Magic Canvas
        </p>
        <h2 className="mt-2 text-xl font-extrabold tracking-[-0.025em]">
          {turn?.canvas.title || "Interactive lesson workspace"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#53657D]">
          {turn?.canvas.subtitle || "The Canvas changes with the lesson so you learn by seeing, answering, and doing."}
        </p>
      </div>

      <div className="max-h-[680px] space-y-4 overflow-y-auto bg-[#F8FBFF] p-4 sm:p-5">
        {!turn && (
          <div className="grid min-h-[380px] place-items-center rounded-2xl border border-dashed border-[#CFE0F5] bg-white px-6 text-center">
            <div className="max-w-sm">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#EAF3FF] text-[#1677FF]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-extrabold">
                {loading ? "Preparing the lesson..." : "Start the lesson"}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#53657D]">
                Explanations, diagrams, questions, activities, and mastery checks appear here.
              </p>
            </div>
          </div>
        )}

        {turn?.canvas.blocks.map((block, index) => (
          <article
            key={`${block.type}-${block.title}-${index}`}
            className="rounded-2xl border border-[#D7E3F2] bg-white p-5"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                <BlockIcon type={block.type} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7A8AA0]">
                  {block.type}
                </p>
                <h3 className="font-bold">{block.title}</h3>
              </div>
            </div>
            <Block block={block} disabled={loading} onRespond={onRespond} />
          </article>
        ))}
      </div>
    </section>
  );
}
