import { Note } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { getServerSideUser } from "../../utils/auth/getServerSideUser";
import { fetcher } from "../../utils/fetch";

async function getData(): Promise<Note[]> {
  const user = await getServerSideUser();
  const res = await fetcher({
    path: `/notes/byUser/${user?.id}`,
    cache: "no-store",
  });
  return res.json();
}

async function Notes() {
  const notes = await getData();
  return (
    <div className="flex flex-grow flex-col mb-8 mx-0 lg:mx-16">
      <div className="bg-slate-900 pb-4">
        <h5 className="text-white text-2xl ">My Notes</h5>
      </div>
      {!notes?.length && (
        <div className="my-4">
          <p className="text-white font-bold mb-4">{"Sorry you don't have notes"}</p>
          <Link href={`/note-editor/`}>
            <button className="btn-primary">Create your first note</button>
          </Link>
        </div>
      )}
      <ul className="flex flex-row gap-4 flex-wrap">
        {notes?.map((note) => (
          <li
            key={note.id}
            className="flex flex-col w-full md:w-56 h-32 bg-white p-4 rounded-md shadow-md shadow-gray-400"
          >
            <Link
              href={`/note-editor/${note.id}`}
              className="text-xl font-bold underline"
            >
              {note.title}
            </Link>
            <div
              className="line-clamp-2"
              dangerouslySetInnerHTML={{ __html: note.html }}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
