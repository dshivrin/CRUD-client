import { Contact, FormErrors } from "./types";

const validPhoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
const validEmailRegex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const validateForm = (contact: Contact) => {
  const newErrors = {} as FormErrors;
  //name
  if (!contact.name) {
    newErrors.name = new Array();
    newErrors.name.push("Name is required!");
  }
  
  //email
  if (contact.email) {
    newErrors.email = new Array();
    newErrors.email.push("Email is required!");
  } else if (validateEmail(contact.email)) {
    newErrors.email = new Array();
    newErrors.email.push("Invalid email address!");
  }

  //social Id
  if (!contact.socialNumber) {
    newErrors.socialNumber = new Array();
    newErrors.socialNumber.push("Social number is required!");
  } else if (!validateSocialNumber(contact.socialNumber?.toString())) {
    newErrors.socialNumber = new Array();
    newErrors.socialNumber.push("Invalid social number!");
  }

  //phone
  if (!validatePhoneNumber(contact.phone)) {
    newErrors.phone = new Array();
    newErrors.phone.push("Invalid phone number!");
  }

  //dates:
  const date = Date.parse(contact.birthDate);
  if (!contact.birthDate) {
    newErrors.birthDate = new Array();
    newErrors.birthDate.push("Birth date is required!");
  } else if (isNaN(date)) {
    //just in case, cause it's quite impossible using the date picker
    newErrors.birthDate = new Array();
    newErrors.birthDate.push("Invalid date!");
  } else if (date > Date.now()) {
    newErrors.birthDate = new Array();
    newErrors.birthDate.push("No time travelers allowed!");
  }

  return newErrors;
};

const validatePhoneNumber = (phone: string) => {
  return new RegExp(validPhoneRegex).test(phone);
};

const validateEmail = (email: string): boolean => {
  //same regex used in the API
  return new RegExp(validEmailRegex).test(email);
};

//The Luhn Algorithm, same as in the API
const validateSocialNumber = (socialNumber: string) => {
  //Israeliu social Id must contain 9 digits
  if (/[^0-9-\s]+/.test(socialNumber)) return false;

  var nCheck = 0,
    nDigit = 0,
    bEven = false;
  socialNumber = socialNumber.replace(/\D/g, "");

  for (var n = socialNumber.length - 1; n >= 0; n--) {
    var cDigit = socialNumber.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 == 0;
};
