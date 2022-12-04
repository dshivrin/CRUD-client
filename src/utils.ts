import { Contact } from "./types";

//returns dd/MM/YYYY for displaying in table
export const FormatDateString = (str: string) => {
  const date = new Date(str);
  return date.toLocaleDateString("en-GB");
};

//returns dd-MM-YYYY because bootstrap date-picker is picky on its format
export const FormatDateStringForDatePicker = (str: string) => {
  const date = new Date(str);
  let year, month, day;
  year = date.getFullYear();
  month =
    date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  day = date.getDay() > 10 ? date.getDay() : `0${date.getDay()+1}`;
  return `${year}-${month}-${day}`;
};

export const CreateNewUserObj = () => {
  const contact : Contact ={
    id:0,
    socialNumber:0,
    name: "",
    birthDate: "",
    email: "",
    gender: "",
    phone: "",
  };

  return contact;
}

