import { Row, Col, Form, Button } from "react-bootstrap";
import { Tag } from "../App";
import { ChangeEvent, useState } from "react";

type EditTagPropsType = {
  tag: Tag;
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

const EditTag = ({ tag, onDeleteTag, onUpdateTag }: EditTagPropsType) => {
  const [tagLabel, setTagLabel] = useState<string>(tag.label);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagLabel(e.target.value);
  };

  return (
    <Row key={tag.id}>
      <Col>
        <Form.Control
          type="text"
          onChange={handleInputChange}
          defaultValue={tag.label}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              onUpdateTag(tag.id, tagLabel);
            }
          }}
        />
      </Col>
      <Col xs="auto">
        <Button variant="outline-danger" onClick={() => onDeleteTag(tag.id)}>
          &times;
        </Button>
      </Col>
    </Row>
  );
};

export default EditTag;
