import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Contact, editModalProps } from "../../types";
import ContactForm from "./contactForm";
import { fetchContact, addContact, updateContact } from "../shared/apiService";

const EditModal = (props: editModalProps) => {
  const { show, setShow, contactId } = props;
  const [contact, setContact] = useState<Contact>({} as Contact);

  const handleClose = () => {
    setContact({} as Contact); //reset the state
    setShow(false); //close modal
  };

  const onSaveClick = async (contactId: number) => {
    //validate and save
    const result = contactId
      ? await updateContact(contact as Contact)
      : await addContact(contact as Contact);
    handleClose();
    //update the list / refresh event?
  };

  useEffect(() => {
    const getContactById = async (contactId: number) => {
      const result = await fetchContact(contactId);
      setContact(result.data as Contact);
    };
    if (contactId) getContactById(contactId);
  }, [contactId]);

  const title = contactId ? `Edit Contact #${contactId}` : `Add New contact`;
  //todo use bootstrap validation
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContactForm contact={contact} setContact={setContact} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onSaveClick(contactId)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
