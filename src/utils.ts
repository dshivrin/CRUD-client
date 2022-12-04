//returns dd/MM/YYYY
export const FormatDateString = (str: string) => {
  const date = new Date(str);
  return date.toLocaleDateString("en-GB");
};
export const FormatDateStringForDatePicker = (str: string) => {
  const date = new Date(str);
  let year, month, day;
  year = date.getFullYear();
  month =
    date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  day = date.getDay() > 10 ? date.getDay() : `0${date.getDay()}`;
  return `${year}-${month}-${day}`;
};
export const StringToDate = (date: string) => {
  const data = new Date(date);
  //return `${data.getMonth()+1}-${data.getDate()}-${data.getFullYear()}`
  return data.toISOString();
};
