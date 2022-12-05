import Form from "react-bootstrap/Form";
import { FormatDateStringForDatePicker } from "../../utils";
import {
  FormErrors,
  FormProps,
  InputChangeEvent,
  SelectChangeEvent,
} from "../../types";

//Controlled form
const ContactForm = (props: FormProps) => {
  const { contact, setContact, errors, setErrors } = props;
  const dateValue = FormatDateStringForDatePicker(contact.birthDate);

  //socialNumber is type number, the rest are strings
  const setField = (field: string, value: string | number) => {
    setContact({
      ...contact,
      [field]: value,
    });

    //remove the errors for that field
    if (!!errors[field as keyof FormErrors]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="form.SocialNumber">
        <Form.Label>Social Number</Form.Label>
        <Form.Control
          type="number"
          autoFocus
          value={contact.socialNumber}
          isInvalid={ !!errors.socialNumber }
          onChange={(event: InputChangeEvent) => {
            setField("socialNumber", +event.target.value);
          }}
        />
        <Form.Control.Feedback type="invalid">
          {errors.socialNumber}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.Name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="string"
          value={contact.name}
          isInvalid={ !!errors.name }
          onChange={(event: InputChangeEvent) => {
            setField("name", event.target.value);
          }}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.Email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={contact.email}
          isInvalid={ !!errors.email }
          onChange={(event: InputChangeEvent) => {
            setField("email", event.target.value);
          }}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.BirthDate">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="BirthDate"
          isInvalid={ !!errors.birthDate }
          value={dateValue}
          onChange={(event: InputChangeEvent) => {
            setField("birthDate", event.target.value);
          }}
        />
        <Form.Control.Feedback type="invalid">
          {errors.birthDate}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.Gender">
        <Form.Label>Gender</Form.Label>
        <Form.Select
          aria-label="Gender"
          value={contact.gender}
          isInvalid={ !!errors.gender }
          onChange={(event: SelectChangeEvent) => {
            setField("gender", event.target.value);
          }}
        >
          <option>Choose gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.gender}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.Phone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          type="string"
          value={contact.phone}
          isInvalid={ !!errors.phone }
          onChange={(event: InputChangeEvent) => {
            setField("phone", event.target.value);
          }}
        />
        <Form.Control.Feedback type="invalid">
          {errors.phone}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default ContactForm;
