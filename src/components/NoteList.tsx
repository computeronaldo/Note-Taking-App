import { useState } from "react";
import { Row, Col, Stack, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";
import NoteCard from "./NoteCard";
import EditTagModal from "./EditTagModal";

export type NoteData = {
  tags: Tag[];
  id: string;
  title: string;
  markdown: string;
  tagIds: string[];
};

type NoteListPropsType = {
  availableTags: Tag[];
  notesData: NoteData[];
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
};

const NoteList = ({ availableTags, notesData, onDeleteTag, onUpdateTag }: NoteListPropsType) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState<boolean>(false);

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
            <Button variant="outline-secondary" onClick={() => setEditTagsModalIsOpen(true)}>Edit Tags</Button>
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
              <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </Col>
          );
        })}
      </Row>
      <EditTagModal availableTags={availableTags} show={editTagsModalIsOpen} handleClose={() => setEditTagsModalIsOpen(false)} onDeleteTag={onDeleteTag} onUpdateTag={onUpdateTag}/>
    </>
  );
};

export default NoteList;
