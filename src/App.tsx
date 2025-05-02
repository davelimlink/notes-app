import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap"; // Assuming Container is from react-bootstrap
import NewNote from "./NewNote";

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

function App() {
  return (
    <>
      <Container className="my-4">
        {" "}
        {/* margin on the top and buttom */}
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/new" element={<NewNote />} />
          <Route path="/:id">
            <Route index element={<h1>How</h1>} />
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
