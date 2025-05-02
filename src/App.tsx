import React, { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap"; // Assuming Container is from react-bootstrap
import NewNote from "./NewNote";
import { useLocalStorage } from "./useLocalStorage";
import NoteList from "./NoteList";
import NoteLayout from "./NoteLayout";
import Note from "./Note";

export type Tag = {
  id: string;
  label: string;
};

//this adds a new property to the NoteData type which is id
export type Note = {
  id: string;
} & NoteData; //only works on type not on interface

export type NoteData = {
  title: string;
  markDown: string;
  tags: Tag[];
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markDown: string;
  tagIds: string[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTaggs = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ title, markDown, tags }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        {
          id: crypto.randomUUID(),
          title,
          markDown,
          tagIds: tags.map((tag) => tag.id),
        },
      ];
    });
  }

  function addTag(tag: Tag) {
    setTags((prevTags) => [...prevTags, tag]);
  }

  return (
    <>
      <Container className="my-4">
        {" "}
        {/* margin on the top and buttom */}
        <Routes>
          <Route
            path="/"
            element={<NoteList availableTags={tags} notes={notesWithTaggs} />}
          />
          <Route
            path="/new"
            element={
              <NewNote
                onSubmit={onCreateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
          <Route path="/:id" element={<NoteLayout notes={notesWithTaggs} />}>
            <Route index element={<Note />} />
            <Route path="edit" element={<h1>Edit</h1>} />
            <Route />
          </Route>
          {/* if you type wrong path you will directed to home "/" */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
