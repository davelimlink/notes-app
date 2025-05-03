import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Modal, Row, Stack } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "./App";
import styles from "./NoteList.module.css";

type NoteListProp = {
  availableTags: Tag[];
  notes: Note[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

type SimflifiedNote = {
  id: string;
  title: string;
  tags: Tag[];
};

type EdditTagsModalProps = {
  availableTags: Tag[];
  handleClose: () => void;
  show: boolean;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

function NoteList({
  availableTags,
  notes,
  updateTag,
  deleteTag,
}: NoteListProp) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editRagsModalOpen, setEditTagsModalOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [notes, selectedTags, title]);

  return (
    <>
      <Row className="align-items-center mb-5">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={"/new"}>
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              onClick={() => setEditTagsModalOpen(true)}
              variant="outline-secondary"
            >
              Edit tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Search Titles"
                value={title}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={1} md={3} lg={4} xl={5} xxl={6} className="gap-3 ">
        {filteredNotes.map((note) => {
          return (
            <Col className="flex-grow-1" key={note.id}>
              <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </Col>
          );
        })}
      </Row>
      <EditTagsModal
        availableTags={availableTags}
        updateTag={updateTag}
        deleteTag={deleteTag}
        show={editRagsModalOpen}
        handleClose={() => {
          setEditTagsModalOpen(false);
        }}
      />
    </>
  );
}

function NoteCard({ id, title, tags }: SimflifiedNote) {
  return (
    <>
      <Card
        as={Link}
        to={`/${id}`}
        className={` h-100 text-reset text-decoration-none ${styles.card}`}
      >
        <Card.Body>
          <Stack
            gap={2}
            className="align-items-center justify-content-center h-100 "
          >
            <span className="fs-5">{title}</span>
            {tags.length > 0 && (
              <Stack
                gap={1}
                direction="horizontal"
                className="justify-content-center flex-wrap"
              >
                {tags.map((tag) => {
                  return (
                    <Badge
                      key={tag.id}
                      className={`text-truncate  ${styles.tag}`}
                    >
                      {tag.label}
                    </Badge>
                  );
                })}
              </Stack>
            )}
          </Stack>
        </Card.Body>
      </Card>
    </>
  );
}

function EditTagsModal({
  availableTags,
  handleClose,
  show,
  updateTag,
  deleteTag,
}: EdditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => {
              return (
                <Row key={tag.id} className="align-items-center">
                  <Col>
                    <Form.Group controlId={tag.id}>
                      <Form.Control
                        type="text"
                        value={tag.label}
                        onChange={(e) => updateTag(tag.id, e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs="auto">
                    <Button
                      onClick={() => deleteTag(tag.id)}
                      variant="outline-danger"
                    >
                      &times;
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NoteList;
