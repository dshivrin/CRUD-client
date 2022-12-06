import { Contact } from "./types";

//returns dd/MM/YYYY for displaying in table
export const FormatDateString = (str: string) => {
  const date = new Date(str);
  return date.toLocaleDateString("en-GB");
};

export const formatDate = (str: string) => {
  var date = new Date(str);
  
  // Get year, month, and day part from the date
  var year = date.toLocaleString("default", { year: "numeric" });
  var month = date.toLocaleString("default", { month: "2-digit" });
  var day = date.toLocaleString("default", { day: "2-digit" });
  //this is a hack, the datepicker keeps reseting the date on typing the year ¯\_(ツ)_/¯
  if(year.length < 4){
    return;
  }
  // Generate yyyy-mm-dd date string
  var formattedDate = year + "-" + month + "-" + day ;

  return formattedDate;
};

export const CreateNewUserObj = () => {
  const contact: Contact = {
    id: 0,
    socialNumber: 0,
    name: "",
    birthDate: "",
    email: "",
    gender: "",
    phone: "",
  };

  return contact;
};
