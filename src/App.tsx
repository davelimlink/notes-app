import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Button, Col, Container } from "react-bootstrap"; // Assuming Container is from react-bootstrap
import NewNote from "./NewNote";
import { useLocalStorage } from "./useLocalStorage";
import NoteList from "./NoteList";
import NoteLayout from "./NoteLayout";
import Note from "./Note";
import EditNote from "./EditNote";

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
  function onUpdateNote(id: string, { title, markDown, tags }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            title,
            markDown,
            tags,
            tagIds: tags.map((tag) => tag.id),
          };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  function addTag(tag: Tag) {
    setTags((prevTags) => [...prevTags, tag]);
  }

  function updateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function deleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }

  return (
    <>
      <Container className="my-4">
        {" "}
        {/* margin on the top and buttom */}
        <Routes>
          <Route
            path="/"
            element={
              <NoteList
                availableTags={tags}
                notes={notesWithTaggs}
                updateTag={updateTag}
                deleteTag={deleteTag}
              />
            }
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
            <Route index element={<Note onDelete={onDeleteNote} />} />
            <Route
              path="edit"
              element={
                <EditNote
                  onSubmit={onUpdateNote}
                  onAddTag={addTag}
                  availableTags={tags}
                />
              }
            />
            <Route />
          </Route>
          {/* if you type wrong path you will directed to home "/" */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Col className="mt-4">
          {notes.length > 0 && (
            <Button variant="outline-danger" onClick={() => setNotes([])}>
              Clear Notes
            </Button>
          )}
        </Col>
      </Container>{" "}
    </>
  );
}

export default App;
