import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap"; // Assuming Container is from react-bootstrap

function App() {
  return (
    <>
      <Container className="my-4">
        {" "}
        {/* margin on the top and buttom */}
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/about" element={<h1>New</h1>} />
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
