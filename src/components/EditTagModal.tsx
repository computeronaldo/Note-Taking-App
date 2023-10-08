import { Modal, Form, Stack } from "react-bootstrap";
import { Tag } from "../App";
import EditTag from "./EditTag";

type EditTagModalPropsType = {
  availableTags: Tag[];
  handleClose: () => void;
  show: boolean;
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void
};

const EditTagModal = ({
  onDeleteTag,
  availableTags,
  handleClose,
  show,
  onUpdateTag
}: EditTagModalPropsType) => {
    return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => {
            e.preventDefault();
        }}>
          <Stack gap={2}>
            {availableTags.map((tag) => {
              return <EditTag key={tag.id} tag={tag} onDeleteTag={onDeleteTag} onUpdateTag={onUpdateTag} />
            })}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTagModal;
