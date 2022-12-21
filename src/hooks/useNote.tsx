import { Note, Prisma } from "@prisma/client";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetcher } from "../utils/fetch";

function useNote(noteId?: string) {
  const [isLoading, setLoading] = useState(false);
  const { data: note, isLoading: queryLoading } = useQuery(["note", noteId], () =>
    fetcher({
      path: `/notes/${noteId}`,
    }).then((r) => r.json() as Promise<Note>),
  );

  const createNote = async (note: Prisma.NoteCreateInput) => {
    setLoading(true);
    await fetcher({
      path: "/notes/create",
      data: note,
      method: "POST",
    });
    location.href = "/notes";
  };

  const editNote = async (note: Prisma.NoteUpdateInput) => {
    setLoading(true);
    await fetcher({
      path: "/notes/edit",
      data: note,
      method: "PUT",
    });
    location.href = "/notes";
  };

  const deleteNote = async (noteId: string) => {
    setLoading(true);
    await fetcher({
      path: "/notes/delete",
      data: {
        id: noteId,
      },
      method: "DELETE",
    });
    location.href = "/notes";
  };

  return {
    note,
    isLoading: isLoading || queryLoading,
    createNote,
    editNote,
    deleteNote,
  };
}

export default useNote;
