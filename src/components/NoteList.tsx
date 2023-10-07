import { useState } from "react";
import { Row, Col, Stack, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";

type NotesData = {
  tags: Tag[];
  id: string;
  title: string;
  markdown: string;
  tagIds: string[];
}[];

type NoteListPropsType = {
  availableTags: Tag[];
  notesData: NotesData;
};

const NoteList = ({ availableTags, notesData }: NoteListPropsType) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const haveCommonTags = (noteTags: Tag[], selectedTags: Tag[]) => {
    return noteTags.some((tag1) =>
      selectedTags.some((tag2) => tag1.id === tag2.id)
    );
  };

  const filteredNotes =
    selectedTags.length === 0
      ? notesData
      : notesData.filter((note) => {
          const noteTags = note.tags;
          if (haveCommonTags(noteTags, selectedTags)) {
            return note;
          } else {
            return;
          }
        });

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Title</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                // to display if their are existing tags
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                // onChange handles deletion of an option and updates selected tags
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
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => {
          return (
            <Col key={note.id}>
              <div>{note.title}</div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default NoteList;
