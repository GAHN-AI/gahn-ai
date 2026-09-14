"use client";

import { FormEvent, useState } from "react";
import { Bot, Send, User } from "lucide-react";

type Message = {
  id: number;
  role: "instructor" | "student";
  content: string;
};

type InstructorChatProps = {
  instructorName?: string;
  lessonTitle?: string;
};

export default function InstructorChat({
  instructorName = "AI Instructor",
  lessonTitle = "Current Lesson",
}: InstructorChatProps) {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "instructor",
      content: `Welcome. I'm your instructor for ${lessonTitle}. Start the lesson when you're ready, or ask me a question.`,
    },
  ]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanMessage = input.trim();

    if (!cleanMessage) {
      return;
    }

    const studentMessage: Message = {
      id: Date.now(),
      role: "student",
      content: cleanMessage,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      studentMessage,
    ]);

    setInput("");
  }

  return (
    <div className="flex min-h-[500px] flex-col overflow-hidden rounded-[1.5rem] border border-[#D7E3F2] bg-white shadow-[0_16px_45px_rgba(11,23,57,0.06)]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#D7E3F2] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_70%,#EAF3FF_100%)] p-5">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#EAF3FF]">
          <Bot
            className="h-5 w-5 text-[#1677FF]"
            strokeWidth={1.75}
          />
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-bold text-[#0B1739]">
            {instructorName}
          </h3>

          <p className="truncate text-xs text-[#53657D]">
            {lessonTitle}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2 rounded-full border border-[#CFE0F5] bg-white px-3 py-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#1677FF]" />
          <span className="text-xs font-semibold text-[#53657D]">
            Ready
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-5 overflow-y-auto bg-[#F8FBFF] p-5">
        {messages.map((message) => {
          const isStudent = message.role === "student";

          return (
            <div
              key={message.id}
              className={`flex gap-3 ${
                isStudent ? "justify-end" : "justify-start"
              }`}
            >
              {!isStudent && (
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EAF3FF]">
                  <Bot
                    className="h-4 w-4 text-[#1677FF]"
                    strokeWidth={1.75}
                  />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  isStudent
                    ? "bg-[#1677FF] text-white"
                    : "border border-[#D7E3F2] bg-white text-[#0B1739]"
                }`}
              >
                {message.content}
              </div>

              {isStudent && (
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B1739]">
                  <User
                    className="h-4 w-4 text-white"
                    strokeWidth={1.75}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Notice */}
      <div className="border-t border-[#D7E3F2] bg-[#F1F7FF] px-5 py-3">
        <p className="text-center text-xs leading-5 text-[#53657D]">
          AI responses will activate when the instructor AI service is
          connected.
        </p>
      </div>

      {/* Message input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-[#D7E3F2] bg-white p-4"
      >
        <div className="flex items-end gap-3">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask your instructor a question..."
            rows={1}
            maxLength={2000}
            className="min-h-[48px] flex-1 resize-none rounded-xl border border-[#D7E3F2] bg-white px-4 py-3 text-sm text-[#0B1739] outline-none placeholder:text-[#8A98AA] focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
          />

          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#1677FF] text-white hover:bg-[#0F65E8] disabled:cursor-not-allowed disabled:bg-[#B8C7DA]"
          >
            <Send className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-2 flex justify-between gap-4">
          <p className="text-xs text-[#8A98AA]">
            Ask questions about your lesson.
          </p>

          <p className="text-xs text-[#8A98AA]">
            {input.length}/2000
          </p>
        </div>
      </form>
    </div>
  );
}
