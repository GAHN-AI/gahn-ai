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
    <div className="flex min-h-[500px] flex-col overflow-hidden rounded-2xl border border-[#dbe3ee] bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#dbe3ee] p-5">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#dcfce7]">
          <Bot
            className="h-5 w-5 text-[#16a34a]"
            strokeWidth={1.75}
          />
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-bold text-[#111827]">
            {instructorName}
          </h3>

          <p className="truncate text-xs text-[#4b5563]">
            {lessonTitle}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />

          <span className="text-xs font-semibold text-[#4b5563]">
            Ready
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-5 overflow-y-auto bg-white p-5">
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
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#dcfce7]">
                  <Bot
                    className="h-4 w-4 text-[#16a34a]"
                    strokeWidth={1.75}
                  />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  isStudent
                    ? "bg-[#22c55e] text-white"
                    : "border border-[#dbe3ee] bg-[#f9fafb] text-[#111827]"
                }`}
              >
                {message.content}
              </div>

              {isStudent && (
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#111827]">
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
      <div className="border-t border-[#dbe3ee] bg-[#f0fdf4] px-5 py-3">
        <p className="text-center text-xs leading-5 text-[#4b5563]">
          AI responses will activate when the instructor AI service is
          connected.
        </p>
      </div>

      {/* Message input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-[#dbe3ee] bg-white p-4"
      >
        <div className="flex items-end gap-3">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask your instructor a question..."
            rows={1}
            maxLength={2000}
            className="min-h-[48px] flex-1 resize-none rounded-xl border border-[#dbe3ee] bg-white px-4 py-3 text-sm text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/15"
          />

          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#22c55e] text-white transition hover:bg-[#16a34a] disabled:cursor-not-allowed disabled:bg-[#d1d5db]"
          >
            <Send className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-2 flex justify-between gap-4">
          <p className="text-xs text-[#9ca3af]">
            Ask questions about your lesson.
          </p>

          <p className="text-xs text-[#9ca3af]">
            {input.length}/2000
          </p>
        </div>
      </form>
    </div>
  );
}