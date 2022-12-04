import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { confirmModalProps } from "../../types";
import { deleteContact } from "../shared/apiService";

const confirmModal = (props: confirmModalProps) => {
  const { show, setShow, contact } = props;

  const confirmDelete = async () => {
    await deleteContact(contact.id);
    setShow(false);
  };
  const cancel = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={cancel}>
      <Modal.Header closeButton>
        <Modal.Title>This action cannot be undone!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete <strong>{contact.name}</strong>? </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={confirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default confirmModal;
