//returns dd/MM/YYYY
export const FormatDateString = (str: string) => {
    const date = new Date(str);
    return date.toLocaleDateString('en-GB');
}

export const StringToDate = (date: string) => {
    const data = new Date(date);
    //return `${data.getMonth()+1}-${data.getDate()}-${data.getFullYear()}`
    return data.toISOString();
}