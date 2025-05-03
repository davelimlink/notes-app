import { Button, Col } from "react-bootstrap";
import { Note } from "./App";

interface ClearButtonProps {
  notes: Note[]; // Replace with the actual type of notes
  setNotes: () => void; // Replace with the actual type of notes
}

function ClearButton({ notes, setNotes }: ClearButtonProps) {
  return (
    <>
      <Col className="mt-4">
        {notes.length > 0 && (
          <Button variant="outline-danger" onClick={setNotes}>
            Clear Notes
          </Button>
        )}
      </Col>
    </>
  );
}

export default ClearButton;
