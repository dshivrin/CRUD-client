import Form from "react-bootstrap/Form";
import { FormProps, InputChangeEvent, SelectChangeEvent } from "../../types";
import { FormatDateString, StringToDate } from "../../utils";

const ContactForm = (props: FormProps) => {
  const { contact, setContact } = props;

  const onSocialNumberChange = (event: InputChangeEvent) => {
    setContact({
      ...contact, 
      socialNumber: +event.target.value
    });
  };
  const onNameChange = (event: InputChangeEvent) => {
     setContact({
      ...contact,
      name: event.target.value
     });
  };
  const onEmailChange = (event: InputChangeEvent) => {
    setContact({
      ...contact,
      email: event.target.value
    });
  };
  const onDateOfBirthChange = (event: InputChangeEvent) => {
    setContact({
      ...contact,
      birthDate: event.target.value
    });
  };
  const onGenderChange = (event: SelectChangeEvent) => {
    setContact({
      ...contact,
      gender: event.target.value
    });
  };
  const onPhoneChange = (event: InputChangeEvent) => {
    setContact({
      ...contact,
      phone: event.target.value
    });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="form.SocialNumber">
        <Form.Label>Social Number</Form.Label>
        <Form.Control
          type="number"
          autoFocus
          value={contact.socialNumber}
          onChange={onSocialNumberChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.Name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="string"
          value={contact.name}
          onChange={onNameChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.Email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={contact.email}
          onChange={onEmailChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.BirthDate">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          value={FormatDateString(contact.birthDate)}
          onChange={onDateOfBirthChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.Gender">
        <Form.Label>Gender</Form.Label>
        <Form.Select
          aria-label="Gender"
          value={contact.gender}
          onChange={onGenderChange}
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
          onChange={onPhoneChange}
        />
      </Form.Group>
    </Form>
  );
};

export default ContactForm;
