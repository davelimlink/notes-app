import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

type NoteProps = {
  onDelete: (id: string) => void;
};

function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const Navigate = useNavigate();

  return (
    <>
      <Row className="align-items-center mb-5">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => {
                return (
                  <Badge key={tag.id} className={`text-truncate`}>
                    {tag.label}
                  </Badge>
                );
              })}
            </Stack>
          )}
        </Col>

        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`} className="ms-auto">
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(note.id);
                Navigate("/");
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to="..">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markDown}</ReactMarkdown>
    </>
  );
}

export default Note;
