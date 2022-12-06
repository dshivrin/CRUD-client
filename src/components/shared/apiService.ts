import config from "../../config.json";
import { toast } from "react-toastify";
import { Contact } from "../../types";
import axios from "axios";

const baseUrl = config.apiUrl;

export const fetchAllContacts = async (currentPage: number, recordsPerPage: number) => {
  const skip = (currentPage -1) * recordsPerPage;
  const url = `${baseUrl}/${skip}/${recordsPerPage}`;
  try {
    return await axios.get(url);
  } catch (err) {
    console.error(err);
    toast.error(`Failed to fetch contacts`, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  }
  return {data: {contacts:[], total: 0}};
};

export const fetchContact = async (contactId: number) => {
  try {
    const url = `${baseUrl}/${contactId}`;
    const result = await axios.get(url);
    if (result.status === 200) {
      return result;
    }
  } catch (err) {
    console.error(`failed to fetch contact ${contactId}`);
  }
  return { data: [], total: 0 };
};

export const addContact = async (contact: Contact) => {
  try {
    const result = await axios.post(baseUrl, contact);
    if (result.status === 200) {
      toast.success("Contact Saved!", { position: toast.POSITION.BOTTOM_LEFT });
    }
    return result;
  } catch (err) {
    console.error(err);
    toast.error(`Failed to add contact '${contact.name}'`, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  }
};

export const updateContact = async (contact: Contact) => {
  try {
    const result = await axios.put(baseUrl, contact);
    if (result.status === 200) {
      toast.success("Contact updated", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  } catch (err) {
    console.error(err);
    toast.error(`Failed to update contact ${contact.name}`, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  }
};

export const deleteContact = async (contact: Contact) => {
  try {
    const result = await axios.delete(baseUrl, {data: contact });
    if (result.status === 200) {
      toast.success("Contact deleted", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return result;
    }
  } catch (err) {
    console.error(err);
    toast.error(`Failed to delete contact "${contact.name}"`, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  }
};
