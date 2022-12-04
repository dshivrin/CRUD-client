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
};

export type confirmModalProps = {
  show: boolean;
  setShow: (value: boolean) => void;
} & FormProps;

export type AddNewContactProps = {
  action: () => void;
  text: string;
}

export type ZeroStateProps = {
  action: () => void;
}
