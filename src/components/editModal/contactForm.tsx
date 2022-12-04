import { useState } from "react";
import Form from "react-bootstrap/Form";
import { FormProps, InputChangeEvent, SelectChangeEvent } from "../../types";
import { FormatDateStringForDatePicker } from "../../utils";

const ContactForm = (props: FormProps) => {
  const { contact, setContact } = props;
  const [errors, setErrors] = useState({});

  const setField = (field: string, value: string | number) => {
    setContact({
      ...contact,
      [field]: value
    })
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="form.SocialNumber">
        <Form.Label>Social Number</Form.Label>
        <Form.Control
          type="number"
          autoFocus
          value={contact.socialNumber}
          onChange={(event:InputChangeEvent)=> {setField("socialNumber", +event.target.value)}}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.Name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="string"
          value={contact.name}
          onChange={(event:InputChangeEvent)=> {setField("name", event.target.value)}}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.Email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={contact.email}
          onChange={(event:InputChangeEvent)=> {setField("email", event.target.value)}}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.BirthDate">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="BirthDate"
          placeholder="Date of Birth"
          value={FormatDateStringForDatePicker(contact.birthDate)}
          onChange={(event:InputChangeEvent)=> {setField("birthDate", event.target.value)}}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.Gender">
        <Form.Label>Gender</Form.Label>
        <Form.Select
          aria-label="Gender"
          value={contact.gender}
          onChange={(event:SelectChangeEvent)=> {setField("gender", event.target.value)}}
        >
          <option>Choose gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.Phone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          type="string"
          value={contact.phone}
          onChange={(event:InputChangeEvent)=> {setField("phone", event.target.value)}}
        />
      </Form.Group>
    </Form>
  );
};

export default ContactForm;
