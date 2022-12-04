export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type TextareaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;
export type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;

export type Contact = {
  id: number;
  socialNumber: number;
  name: string;
  email: string;
  birthDate: string;
  gender: string;
  phone: string;
};

export type editModalProps = {
  show: boolean;
  setShow: (value: boolean) => void;
  contactId: number;
};

export type FormProps = {
  contact: Contact;
  setContact: (contact: Contact) => void;
  errors: FormErrors;
  setErrors: (errors: FormErrors) => void;
};

export type confirmModalProps = {
  show: boolean;
  setShow: (value: boolean) => void;
  contact: Contact;
  setContact: (contact: Contact) => void;
};

export type AddNewContactProps = {
  action: () => void;
  text: string;
}

export type ZeroStateProps = {
  action: () => void;
}
//the reason for using an array for each field is because it's possible to have more than one error in the input
//while it's not the case currently, it make the code future proof
export type FormErrors = {
  socialNumber: string[];
  name: string[];
  email: string[];
  birthDate: string[];
  gender: string[];
  phone: string[];
};
