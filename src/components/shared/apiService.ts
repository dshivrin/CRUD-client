import config from "../../config.json";
import axios from "axios";
import { Contact } from "../../types";

const baseUrl = config.apiUrl;

export const fetchAllContacts = async () => {
  return await axios.get(baseUrl);
};

export const fetchContact = async (contactId: number) => {
  const url = `${baseUrl}/${contactId}`;
  return await axios.get(url);
};

export const addContact = async (contact: Contact) => {
  return await axios.post(baseUrl, contact);
};

export const updateContact = async (contact: Contact) => {
    const url = `${baseUrl}/${contact.id}`;
    return await axios.put(url, contact);
}

export const deleteContact = async (contactId: number) => {
    const url = `${baseUrl}/${contactId}`;
    return await axios.delete(url);
}
