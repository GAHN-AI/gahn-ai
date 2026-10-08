"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  Bot,
  Check,
  FileText,
  Mic,
  Paperclip,
  Send,
  Sparkles,
  StickyNote,
  Upload,
  Volume2,
} from "lucide-react";

import MagicCanvas from "@/components/lessons/MagicCanvas";
import { supabase } from "@/lib/supabaseClient";
import {
  lessonIdFromParts,
  type InstructorTurn,
  type TeachingAction,
} from "@/lib/ai/lessonEngine";

type Message = {
  role: "student" | "instructor";
  content: string;
};

type LearningFeatures = {
  notes: boolean;
  studyGuides: boolean;
  reviewQuestions: boolean;
  masteryAssessments: boolean;
  fileUploads: boolean;
  homeworkHelp: boolean;
};

type Props = {
  worldSlug: string;
  worldTitle: string;
  sectionSlug?: string | null;
  sectionTitle?: string | null;
  topicSlug?: string | null;
  topic: string;
  lessonTitle: string;
  lessonPoints: string[];
  instructorName: string;
  language: string;
  nextLessonHref?: string | null;
  nextLessonTitle?: string | null;
  onMastered?: () => void;
};

type SpeechResult = {
  results: ArrayLike<{
    0: { transcript: string };
  }>;
};

type BrowserSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  onresult: ((event: SpeechResult) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

type SpeechWindow = Window & {
  SpeechRecognition?: new () => BrowserSpeechRecognition;
  webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
};

function statusLabel(state?: InstructorTurn["evaluation"]["state"]) {
  if (state === "mastered") return "Mastered";
  if (state === "proficient") return "Proficient";
  if (state === "needs_review") return "Needs review";
  if (state === "practicing") return "Practicing";
  return "Learning";
}

const speechLocales: Record<string, string> = {
  English: "en-US",
  Spanish: "es-ES",
  French: "fr-FR",
  Portuguese: "pt-BR",
  German: "de-DE",
  Italian: "it-IT",
  Dutch: "nl-NL",
  Polish: "pl-PL",
  Romanian: "ro-RO",
  Czech: "cs-CZ",
  Greek: "el-GR",
  Swedish: "sv-SE",
  Norwegian: "nb-NO",
  Danish: "da-DK",
  Ukrainian: "uk-UA",
  Russian: "ru-RU",
  Turkish: "tr-TR",
  Arabic: "ar-SA",
  Hebrew: "he-IL",
  Persian: "fa-IR",
  Hindi: "hi-IN",
  Bengali: "bn-BD",
  Urdu: "ur-PK",
  "Mandarin Chinese": "zh-CN",
  Japanese: "ja-JP",
  Korean: "ko-KR",
  Vietnamese: "vi-VN",
  Thai: "th-TH",
  Indonesian: "id-ID",
  Malay: "ms-MY",
  Filipino: "fil-PH",
  Swahili: "sw-KE",
};

function speechLocale(language: string) {
  return speechLocales[language] || "en-US";
}

export default function LearningStudio({
  worldSlug,
  worldTitle,
  sectionSlug,
  sectionTitle,
  topicSlug,
  topic,
  lessonTitle,
  lessonPoints,
  instructorName,
  language,
  nextLessonHref,
  nextLessonTitle,
  onMastered,
}: Props) {
  const lessonId = useMemo(
    () => lessonIdFromParts(worldSlug, topicSlug || undefined, lessonTitle),
    [worldSlug, topicSlug, lessonTitle]
  );

  const [started, setStarted] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [turn, setTurn] = useState<InstructorTurn | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiConnected, setAiConnected] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const noteIdRef = useRef<string | null>(null);
  const notesDraftRef = useRef("");
  const lastSavedNotesRef = useRef("");
  const savingNotesRef = useRef(false);
  const [notes, setNotes] = useState("");
  const [notesSaved, setNotesSaved] = useState(false);
  const [fileHelpOpen, setFileHelpOpen] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [fileQuestion, setFileQuestion] = useState("");
  const [fileAnalysis, setFileAnalysis] = useState("");
  const [features, setFeatures] = useState<LearningFeatures>({
    notes: false,
    studyGuides: false,
    reviewQuestions: false,
    masteryAssessments: false,
    fileUploads: false,
    homeworkHelp: false,
  });
  const [pendingResponseAction, setPendingResponseAction] =
    useState<TeachingAction>("respond");
  const masteryNotifiedRef = useRef(false);

  useEffect(() => {
    masteryNotifiedRef.current = false;
  }, [lessonId]);

  useEffect(() => {
    async function loadFeatures() {
      const response = await fetch("/api/subscription/current");
      if (!response.ok) return;

      const subscription = await response.json();
      const entitlements = subscription.entitlements || {};

      setFeatures({
        notes: Boolean(entitlements.notes),
        studyGuides: Boolean(entitlements.studyGuides),
        reviewQuestions: Boolean(entitlements.reviewQuestions),
        masteryAssessments: Boolean(entitlements.masteryAssessments),
        fileUploads: Boolean(entitlements.fileUploads),
        homeworkHelp: Boolean(entitlements.homeworkHelp),
      });
    }

    void loadFeatures();
  }, []);

  useEffect(() => {
    if (
      turn?.evaluation.state === "mastered" &&
      !masteryNotifiedRef.current
    ) {
      masteryNotifiedRef.current = true;
      onMastered?.();
    }
  }, [turn?.evaluation.state, onMastered]);

  useEffect(() => {
    let cancelled = false;
    noteIdRef.current = null;
    notesDraftRef.current = "";
    lastSavedNotesRef.current = "";
    setNotes("");

    async function loadNotes() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || cancelled) return;

      const { data } = await supabase
        .from("learner_notes")
        .select("id, body")
        .eq("user_id", user.id)
        .eq("lesson_id", lessonId)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!cancelled && data) {
        noteIdRef.current = data.id;
        notesDraftRef.current = data.body || "";
        lastSavedNotesRef.current = data.body || "";
        setNotes(data.body || "");
      }
    }

    void loadNotes();

    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  // Save learner notes in the background after typing stops. Saved notes
  // show up in My Notes as soon as the learner opens that page.
  useEffect(() => {
    notesDraftRef.current = notes;
    if (!notesOpen || !notes.trim() || notes === lastSavedNotesRef.current) return;
    const timer = window.setTimeout(() => void saveNotes(), 1200);
    return () => window.clearTimeout(timer);
  }, [notes, notesOpen, lessonId]);

  async function requestInstructor(
    learnerMessage?: string,
    action: TeachingAction = "respond"
  ) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/instructor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          sessionId,
          worldSlug,
          worldTitle,
          sectionSlug,
          sectionTitle,
          topicSlug,
          topic,
          lessonTitle,
          lessonPoints,
          language,
          learnerMessage: learnerMessage || "",
          history: messages.slice(-8),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "The lesson could not continue.");
      }

      setSessionId(data.sessionId || null);
      setTurn(data.turn);
      setAiConnected(Boolean(data.aiConnected));

      if (!learnerMessage) {
        if (action === "mastery_check") {
          setPendingResponseAction("mastery_check");
        } else if (action === "review") {
          setPendingResponseAction("review");
        } else {
          setPendingResponseAction("respond");
        }
      } else {
        setPendingResponseAction("respond");
      }
      setMessages((current) => [
        ...current,
        {
          role: "instructor",
          content: data.turn.message,
        },
      ]);

      return data.turn as InstructorTurn;
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The lesson could not continue."
      );
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function startLesson() {
    setStarted(true);
    setMessages([]);
    await requestInstructor(undefined, "start");
  }

  async function sendResponse(responseText: string) {
    const clean = responseText.trim();
    if (!clean || loading) return;

    setMessages((current) => [
      ...current,
      { role: "student", content: clean },
    ]);
    setInput("");

    const action = pendingResponseAction;
    setPendingResponseAction("respond");
    await requestInstructor(clean, action);
  }

  function submitMessage(event: FormEvent) {
    event.preventDefault();
    void sendResponse(input);
  }

  function speakLastMessage() {
    if (!turn?.message || typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(turn.message);
    utterance.lang = speechLocale(language);
    window.speechSynthesis.speak(utterance);
  }

  function startVoiceInput() {
    if (typeof window === "undefined") return;

    const speechWindow = window as SpeechWindow;
    const SpeechRecognition =
      speechWindow.SpeechRecognition ||
      speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Voice input is not supported by this browser. You can still type your answer.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = speechLocale(language);
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim() || "";
      if (transcript) {
        setInput(transcript);
      }
    };

    recognition.onerror = () => {
      setError("I could not hear that clearly. Try again or type your answer.");
    };

    recognition.onend = () => setListening(false);

    setListening(true);
    recognition.start();
  }

  async function uploadLearningFile(file: File) {
    setUploadingFile(true);
    setError("");
    setFileAnalysis("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Sign in to upload learning files.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("Files must be 10 MB or smaller.");
        return;
      }

      const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
      const storagePath = `${user.id}/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("learning-files")
        .upload(storagePath, file, {
          upsert: false,
          contentType: file.type || undefined,
        });

      if (uploadError) {
        setError(uploadError.message);
        return;
      }

      const { data: record, error: recordError } = await supabase
        .from("learning_files")
        .insert({
          user_id: user.id,
          world_slug: worldSlug,
          topic,
          lesson_id: lessonId,
          lesson_title: lessonTitle,
          file_name: file.name,
          mime_type: file.type || null,
          storage_path: storagePath,
          file_size: file.size,
          analysis_status: "uploaded",
        })
        .select("id")
        .single();

      if (recordError) {
        await supabase.storage.from("learning-files").remove([storagePath]);
        setError(recordError.message);
        return;
      }

      setUploadedFileName(file.name);

      const analysisResponse = await fetch("/api/homework/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileId: record.id,
          learnerQuestion: fileQuestion.trim() || undefined,
        }),
      });

      const analysisData = await analysisResponse.json();

      if (!analysisResponse.ok) {
        if (analysisData.uploaded) {
          setFileAnalysis(
            "Your file is saved. Adaptive file analysis will activate when the teaching AI service is connected."
          );
        } else {
          setError(analysisData.error || "The file could not be analyzed.");
        }
        return;
      }

      setFileAnalysis(
        analysisData.analysis ||
          "The file was analyzed, but no explanation was returned."
      );
    } catch {
      setError("The file could not be uploaded right now.");
    } finally {
      setUploadingFile(false);
    }
  }

  async function saveNotes() {
    if (savingNotesRef.current) return;
    const bodyToSave = notesDraftRef.current;
    if (!bodyToSave.trim() || bodyToSave === lastSavedNotesRef.current) return;

    savingNotesRef.current = true;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      savingNotesRef.current = false;
      setError("Sign in to save notes.");
      return;
    }

    setNotesSaved(false);

    if (noteIdRef.current) {
      const { error: updateError } = await supabase
        .from("learner_notes")
        .update({
          body: bodyToSave,
          updated_at: new Date().toISOString(),
        })
        .eq("id", noteIdRef.current)
        .eq("user_id", user.id);

      if (updateError) {
        savingNotesRef.current = false;
        setError(updateError.message);
        return;
      }
    } else {
      const { data, error: insertError } = await supabase
        .from("learner_notes")
        .insert({
          user_id: user.id,
          world_slug: worldSlug,
          lesson_id: lessonId,
          lesson_title: lessonTitle,
          title: `${lessonTitle} notes`,
          body: bodyToSave,
        })
        .select("id")
        .single();

      if (insertError) {
        savingNotesRef.current = false;
        setError(insertError.message);
        return;
      }

      noteIdRef.current = data.id;
    }

    lastSavedNotesRef.current = bodyToSave;
    savingNotesRef.current = false;
    setNotesSaved(true);
    window.setTimeout(() => setNotesSaved(false), 1800);
    // Capture any typing that occurred during the previous save.
    if (notesDraftRef.current !== bodyToSave) {
      window.setTimeout(() => void saveNotes(), 400);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.82fr)_minmax(520px,1.18fr)]">
      <section className="flex min-h-[680px] min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-[#D7E3F2] bg-white shadow-[0_16px_45px_rgba(11,23,57,0.06)]">
        <div className="border-b border-[#D7E3F2] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_70%,#EAF3FF_100%)] p-5">
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
              <Bot className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1677FF]">
                GAHN Instructor
              </p>
              <h2 className="mt-1 truncate text-lg font-extrabold">{instructorName}</h2>
              <p className="truncate text-xs text-[#53657D]">{lessonTitle}</p>
            </div>
            <div className="ml-auto rounded-full border border-[#CFE0F5] bg-white px-3 py-1.5 text-xs font-bold text-[#53657D]">
              {statusLabel(turn?.evaluation.state)}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#EAF3FF] px-3 py-1.5 text-xs font-semibold text-[#1677FF]">
              {language}
            </span>
            <span className="rounded-full border border-[#D7E3F2] bg-white px-3 py-1.5 text-xs font-semibold text-[#53657D]">
              {aiConnected ? "Adaptive AI connected" : "Core lesson engine"}
            </span>
          </div>
        </div>

        {!started ? (
          <div className="grid flex-1 place-items-center bg-[#F8FBFF] p-6 text-center">
            <div className="max-w-md">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#EAF3FF] text-[#1677FF]">
                <BookOpenCheck className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.03em]">
                Learn by doing
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#53657D]">
                Your instructor teaches the lesson while Magic Canvas shows the explanation, diagram, question, or activity you need next.
              </p>
              <button
                type="button"
                onClick={() => void startLesson()}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1677FF] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#0F65E8]"
              >
                <Sparkles className="h-4 w-4" />
                Start Lesson
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto bg-[#F8FBFF] p-4 sm:p-5">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={message.role === "student" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "student"
                        ? "bg-[#1677FF] text-white"
                        : "border border-[#D7E3F2] bg-white text-[#0B1739]"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-[#D7E3F2] bg-white px-4 py-3 text-sm text-[#53657D]">
                    Thinking about your next teaching step...
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                  {error}
                </div>
              )}
            </div>

            <div className="border-t border-[#D7E3F2] bg-white p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={startVoiceInput}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#D7E3F2] px-3 py-2 text-xs font-bold text-[#40536D] hover:bg-[#F5F8FC]"
                >
                  <Mic className="h-4 w-4 text-[#1677FF]" />
                  {listening ? "Listening..." : "Speak"}
                </button>
                <button
                  type="button"
                  onClick={speakLastMessage}
                  disabled={!turn?.message}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#D7E3F2] px-3 py-2 text-xs font-bold text-[#40536D] hover:bg-[#F5F8FC] disabled:opacity-50"
                >
                  <Volume2 className="h-4 w-4 text-[#1677FF]" />
                  Read aloud
                </button>
                {features.notes && (
                  <button
                    type="button"
                    onClick={() => setNotesOpen((value) => !value)}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#D7E3F2] px-3 py-2 text-xs font-bold text-[#40536D] hover:bg-[#F5F8FC]"
                  >
                    <StickyNote className="h-4 w-4 text-[#1677FF]" />
                    Notes
                  </button>
                )}
                {features.fileUploads && features.homeworkHelp && (
                  <button
                    type="button"
                    onClick={() => setFileHelpOpen((value) => !value)}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#D7E3F2] px-3 py-2 text-xs font-bold text-[#40536D] hover:bg-[#F5F8FC]"
                  >
                    <Paperclip className="h-4 w-4 text-[#1677FF]" />
                    File Help
                  </button>
                )}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => void requestInstructor(undefined, "summary")}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#D7E3F2] px-3 py-2 text-xs font-bold text-[#40536D] hover:bg-[#F5F8FC] disabled:opacity-50"
                >
                  Summary
                </button>
                {features.studyGuides && (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => void requestInstructor(undefined, "study_guide")}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#D7E3F2] px-3 py-2 text-xs font-bold text-[#40536D] hover:bg-[#F5F8FC] disabled:opacity-50"
                  >
                    Study Guide
                  </button>
                )}
                {features.reviewQuestions && (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => void requestInstructor(undefined, "review")}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#D7E3F2] px-3 py-2 text-xs font-bold text-[#40536D] hover:bg-[#F5F8FC] disabled:opacity-50"
                  >
                    Review Me
                  </button>
                )}
                {features.masteryAssessments && (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => void requestInstructor(undefined, "mastery_check")}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0B1739] px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
                  >
                    Mastery Check
                  </button>
                )}
              </div>

              {fileHelpOpen && (
                <div className="mb-3 rounded-xl border border-[#CFE0F5] bg-[#F8FBFF] p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#1677FF]" />
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#40536D]">
                      Homework & File Help
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[#53657D]">
                    Upload a photo, screenshot, PDF, text file, or Word document. GAHN uses it as lesson material and guides you through the reasoning.
                  </p>
                  <input
                    value={fileQuestion}
                    onChange={(event) => setFileQuestion(event.target.value)}
                    placeholder="Optional: What do you want help understanding?"
                    className="mt-3 h-10 w-full rounded-lg border border-[#D7E3F2] bg-white px-3 text-sm outline-none focus:border-[#1677FF]"
                  />
                  <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-[#9DBCE3] bg-white px-4 py-3 text-sm font-bold text-[#1677FF] hover:bg-[#F1F7FF]">
                    <Upload className="h-4 w-4" />
                    {uploadingFile ? "Uploading & analyzing..." : "Choose learning file"}
                    <input
                      type="file"
                      disabled={uploadingFile}
                      accept=".jpg,.jpeg,.png,.webp,.pdf,.txt,.doc,.docx,image/*,application/pdf,text/plain"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) void uploadLearningFile(file);
                        event.currentTarget.value = "";
                      }}
                    />
                  </label>

                  {uploadedFileName && (
                    <p className="mt-2 text-xs font-semibold text-[#53657D]">
                      Uploaded: {uploadedFileName}
                    </p>
                  )}

                  {fileAnalysis && (
                    <div className="mt-3 max-h-56 overflow-y-auto whitespace-pre-wrap rounded-lg border border-[#D7E3F2] bg-white p-3 text-sm leading-6 text-[#40536D]">
                      {fileAnalysis}
                    </div>
                  )}
                </div>
              )}

              {notesOpen && (
                <div className="mb-3 rounded-xl border border-[#CFE0F5] bg-[#F8FBFF] p-3">
                  <textarea
                    value={notes}
                    onChange={(event) => {
                      notesDraftRef.current = event.target.value;
                      setNotes(event.target.value);
                    }}
                    rows={5}
                    placeholder="Write what you want to remember..."
                    className="w-full resize-none rounded-lg border border-[#D7E3F2] bg-white px-3 py-2.5 text-sm leading-6 outline-none focus:border-[#1677FF]"
                  />
                  <button
                    type="button"
                    onClick={() => void saveNotes()}
                    className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#0B1739] px-3 py-2 text-xs font-bold text-white"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {notesSaved ? "Saved automatically" : "Save notes"}
                  </button>
                </div>
              )}

              <form onSubmit={submitMessage} className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  rows={1}
                  placeholder="Answer, ask a question, or tell your instructor what is confusing..."
                  className="min-h-12 flex-1 resize-none rounded-xl border border-[#D7E3F2] px-4 py-3 text-sm outline-none focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="grid h-12 w-12 place-items-center rounded-xl bg-[#1677FF] text-white disabled:bg-[#B8C7DA]"
                  aria-label="Send answer"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>

              {turn?.evaluation.state === "mastered" && (
                <div className="mt-3 rounded-xl border border-[#BFD8F8] bg-[#F1F7FF] p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1677FF]">
                    Lesson mastered
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#40536D]">
                    GAHN recorded enough evidence to complete this lesson.
                  </p>
                  {nextLessonHref ? (
                    <a
                      href={nextLessonHref}
                      className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#1677FF] px-4 py-2.5 text-sm font-bold text-white"
                    >
                      Next: {nextLessonTitle || "Next lesson"}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <p className="mt-2 text-sm font-bold text-[#0B1739]">
                      You completed the final lesson in this path.
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </section>

      <MagicCanvas
        turn={turn}
        loading={loading}
        onRespond={(response) => sendResponse(response)}
      />
    </div>
  );
}
