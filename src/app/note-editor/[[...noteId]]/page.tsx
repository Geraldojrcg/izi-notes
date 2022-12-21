"use client";

import { useEffect, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Prisma } from "@prisma/client";
import NotesLoading from "../../notes/loading";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import useNote from "../../../hooks/useNote";
import useAuth from "../../../hooks/useAuth";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

const htmlToDraft = typeof window === "object" && require("html-to-draftjs").default;

type NoteEditorParams = {
  params: {
    noteId: string[];
  };
};

function NoteEditor({ params: { noteId } }: NoteEditorParams) {
  const [state, setState] = useState<EditorState>();
  const [title, setTitle] = useState("new note");

  const id = noteId && noteId[0];

  const { user } = useAuth();
  const { note, isLoading, createNote, deleteNote, editNote } = useNote(id);

  useEffect(() => {
    if (note) {
      const blocksFromHtml = htmlToDraft(note.html);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      setState(editorState);
      setTitle(note.title);
    }
  }, [note]);

  const handleSaveNote = async () => {
    if (note) {
      return handleEditNote();
    }
    return handleCreateNote();
  };

  const handleCreateNote = async () => {
    if (!state) return;
    const html = draftToHtml(convertToRaw(state.getCurrentContent()));
    const data: Prisma.NoteCreateInput = {
      html,
      title,
      userId: user?.id as string,
    };
    createNote(data);
  };

  const handleEditNote = async () => {
    if (!state) return;
    const html = draftToHtml(convertToRaw(state.getCurrentContent()));
    const data: Prisma.NoteUpdateInput = {
      ...note,
      title,
      html,
    };
    editNote(data);
  };

  const handleDeleteNote = async () => {
    deleteNote(note!.id);
  };

  return isLoading ? (
    <NotesLoading />
  ) : (
    <div className="mx-2 mb-8">
      <h5 className="text-white text-2xl">Note Editor</h5>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center my-2">
        <div className="flex gap-4 items-center flex-wrap max-sm:w-full">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-10 rounded-md p-2 bg-slate-200 focus:bg-white w-full md:w-fit"
          />
          <div className="flex max-sm:w-full flex-row-reverse md:flex-row gap-2">
            <button className="btn-primary" disabled={isLoading} onClick={handleSaveNote}>
              Save note
            </button>
            {note && (
              <button
                className="btn-delete"
                disabled={isLoading}
                onClick={handleDeleteNote}
              >
                Delete note
              </button>
            )}
          </div>
        </div>
        {note && (
          <p className="text-white text-xs md:text-base max-sm:text-right max-sm:my-2">
            Last modified at: <>{new Date(note?.updatedAt).toDateString()}</>
          </p>
        )}
      </div>
      <Editor
        editorState={state}
        editorClassName="bg-white px-4 min-h-screen z-0"
        onEditorStateChange={(e) => setState(e)}
      />
    </div>
  );
}

export default NoteEditor;
