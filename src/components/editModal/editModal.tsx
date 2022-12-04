import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Contact, editModalProps, FormErrors } from "../../types";
import ContactForm from "./contactForm";
import { fetchContact, addContact, updateContact } from "../shared/apiService";
import { validateForm } from "../../validations";

const EditModal = (props: editModalProps) => {
  const { show, setShow, contactId } = props;
  const [contact, setContact] = useState<Contact>({} as Contact);
  const [errors, setErrors] = useState({} as FormErrors);

  const handleClose = () => {
    //setContact(CreateNewUserObj()); //reset the form data
    setContact({} as Contact); //reset the form data
    setErrors({} as FormErrors); //reset the errors
    setShow(false); //close modal
  };

  const onSaveClick = async (contactId: number) => {
    //validate then save / update
    const errors = validateForm(contact);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    contactId
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

  const title = contactId ? `Edit Contact #${contactId}` : `Add New Contact`;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContactForm
          contact={contact}
          setContact={setContact}
          errors={errors}
          setErrors={setErrors}
        />
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
