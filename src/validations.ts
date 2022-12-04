import { Contact, FormErrors } from "./types";
const validPhoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateForm = (contact: Contact) => {
  const newErrors = {} as FormErrors;
  //name
  if (!contact.name) {
    newErrors.name = [];
    newErrors.name.push("Name is required!");
  }

  //email
  if (contact.email && validateEmail(contact.email)) {//email is not required
    newErrors.email = [];
    newErrors.email.push("Invalid email address!");
  }

  //social Id
  if (!contact.socialNumber) {
    newErrors.socialNumber = [];
    newErrors.socialNumber.push("Social number is required!");
  } else if (!validateSocialNumber(contact.socialNumber?.toString())) {
    newErrors.socialNumber = [];
    newErrors.socialNumber.push("Invalid social number!");
  }

  //phone
  if (!validatePhoneNumber(contact.phone)) {
    newErrors.phone = [];
    newErrors.phone.push("Invalid phone number!");
  }

  //dates:
  const date = Date.parse(contact.birthDate);
  if (!contact.birthDate) {
    newErrors.birthDate = [];
    newErrors.birthDate.push("Date of birth is required!");
  } else if (isNaN(date)) {
    //just in case, cause it's quite impossible using the date picker
    newErrors.birthDate = [];
    newErrors.birthDate.push("Invalid date!");
  } else if (date > Date.now()) {
    newErrors.birthDate = [];
    newErrors.birthDate.push("No time travelers allowed!");
  }

  return newErrors;
};

const validatePhoneNumber = (phone: string) => {
  if (!phone) return true; //phone is not required
  return new RegExp(validPhoneRegex).test(phone);
};

const validateEmail = (email: string): boolean => {
  if (!email) return true; //no email is allowed
  const isValid = new RegExp(validEmailRegex).test(email);
  return !isValid;
};

//The Luhn Algorithm, same as in the API
const validateSocialNumber = (socialNumber: string) => {
  //Israeli social Id must contain 9 digits
  if (/[^0-9-\s]+/.test(socialNumber)) return false;

  let nCheck = 0;
  let nDigit = 0;
  let bEven = false;
  socialNumber = socialNumber.replace(/\D/g, "");

  for (var n = socialNumber.length - 1; n >= 0; n--) {
    let cDigit = socialNumber.charAt(n);
    nDigit = parseInt(cDigit, 10);

    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 === 0;
};
