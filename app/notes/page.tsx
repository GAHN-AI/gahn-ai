"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Check,
  PencilLine,
  Save,
  Search,
  StickyNote,
  Trash2,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

type Note = {
  id: string;
  world_slug: string | null;
  lesson_id: string | null;
  lesson_title: string | null;
  title: string;
  body: string;
  updated_at: string;
};

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  async function loadNotes() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data } = await supabase
      .from("learner_notes")
      .select("id, world_slug, lesson_id, lesson_title, title, body, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    setNotes((data || []) as Note[]);
    setLoading(false);
  }

  useEffect(() => {
    void loadNotes();
  }, []);

  function startEditing(note: Note) {
    setEditingId(note.id);
    setDraft(note.body);
    setMessage("");
  }

  async function saveNote(noteId: string) {
    const { error } = await supabase
      .from("learner_notes")
      .update({
        body: draft,
        updated_at: new Date().toISOString(),
      })
      .eq("id", noteId);

    if (error) {
      setMessage(error.message);
      return;
    }

    setEditingId(null);
    setMessage("Note saved.");
    await loadNotes();
  }

  async function deleteNote(noteId: string) {
    const { error } = await supabase
      .from("learner_notes")
      .delete()
      .eq("id", noteId);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Note deleted.");
    await loadNotes();
  }

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return notes;

    return notes.filter((note) =>
      [
        note.title,
        note.body,
        note.lesson_title || "",
        note.world_slug || "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [notes, search]);

  return (
    <main className="min-h-screen bg-[#F8FBFF] px-5 py-8 font-sans text-[#0B1739] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#53657D] hover:text-[#1677FF]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#D7E3F2] bg-white shadow-[0_16px_45px_rgba(11,23,57,0.06)]">
          <div className="border-b border-[#D7E3F2] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_68%,#EAF3FF_100%)] p-6 sm:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
              <StickyNote className="h-5 w-5" />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.035em]">My Notes</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#53657D]">
              Notes you save inside lessons stay attached to your learning account and can be edited here.
            </p>
          </div>

          <div className="p-5 sm:p-7">
            <div className="relative mb-5">
              <Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#7A8AA0]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search your notes by lesson, topic, or words you wrote..."
                className="h-11 w-full rounded-xl border border-[#D7E3F2] bg-white pl-10 pr-4 text-sm outline-none focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
              />
            </div>

            {message && (
              <div className="mb-5 rounded-xl border border-[#CFE0F5] bg-[#F1F7FF] px-4 py-3 text-sm text-[#40536D]">
                {message}
              </div>
            )}

            {loading ? (
              <div className="py-16 text-center text-sm font-semibold text-[#53657D]">
                Loading notes...
              </div>
            ) : notes.length === 0 ? (
              <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-[#CFE0F5] bg-[#F8FBFF] px-6 text-center">
                <div className="max-w-md">
                  <BookOpen className="mx-auto h-8 w-8 text-[#1677FF]" />
                  <h2 className="mt-3 text-lg font-extrabold">No saved notes yet</h2>
                  <p className="mt-2 text-sm leading-6 text-[#53657D]">
                    Start a lesson, open Notes in the Learning Studio, and save what you want to remember.
                  </p>
                  <Link
                    href="/learn/career-skills"
                    className="mt-5 inline-flex rounded-lg bg-[#1677FF] px-4 py-2.5 text-sm font-bold text-white"
                  >
                    Start learning
                  </Link>
                </div>
              </div>
            ) : filteredNotes.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#CFE0F5] bg-[#F8FBFF] px-6 py-12 text-center">
                <Search className="mx-auto h-7 w-7 text-[#1677FF]" />
                <h2 className="mt-3 font-extrabold">No matching notes</h2>
                <p className="mt-2 text-sm text-[#53657D]">
                  Try a different word, lesson title, or topic.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredNotes.map((note) => (
                  <article
                    key={note.id}
                    className="rounded-2xl border border-[#D7E3F2] bg-white p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1677FF]">
                          {note.lesson_title || "Learning note"}
                        </p>
                        <h2 className="mt-1 text-lg font-extrabold">{note.title}</h2>
                        <p className="mt-1 text-xs text-[#7A8AA0]">
                          Updated {new Date(note.updated_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => startEditing(note)}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#D7E3F2] px-3 py-2 text-xs font-bold text-[#40536D]"
                        >
                          <PencilLine className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => void deleteNote(note.id)}
                          className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>

                    {editingId === note.id ? (
                      <div className="mt-4">
                        <textarea
                          value={draft}
                          onChange={(event) => setDraft(event.target.value)}
                          rows={7}
                          className="w-full resize-none rounded-xl border border-[#D7E3F2] px-4 py-3 text-sm leading-6 outline-none focus:border-[#1677FF]"
                        />
                        <button
                          type="button"
                          onClick={() => void saveNote(note.id)}
                          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#1677FF] px-4 py-2.5 text-sm font-bold text-white"
                        >
                          <Save className="h-4 w-4" />
                          Save changes
                        </button>
                      </div>
                    ) : (
                      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[#40536D]">
                        {note.body || "Empty note"}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
