import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Contact } from "../../types";
import { FormatDateString } from "../../utils";
import EditModal from "../editModal/editModal";
import ConfirmModal from "../confirmModal/confirmModal";
import AddNewContactBtn from "../shared/AddNewContact";
import { fetchAllContacts } from "../shared/apiService";
import ZeroState from "./zeroState";
import "./list.css";

const List = () => {
  const [data, setData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState({} as Contact);

  const fetchData = async () => {
    const result = await fetchAllContacts();
    setData(result.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAllContacts();
      setData(result.data);
    };
    fetchData();
  }, []);

  const onEditClick = (contact: Contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  const onDeleteClick = (contact: Contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  const onAddNew = () => {
    setShowEditModal(true);
  };

  const updateContactState = (contact: Contact) => {
    setSelectedContact(contact);
  };

  //add loading gif before 
  if (data.length === 0) {
    return (
      <div>
        <ZeroState action={onAddNew} />
        <EditModal
          show={showEditModal}
          setShow={setShowEditModal}
          contactId={selectedContact.id}
        />
      </div>
    );
  } else {//export this code to anothe component
    return (
      <div className="table-container">
        <div className="header">
          <AddNewContactBtn action={onAddNew} text="Add New Contact" />
          <Button onClick={fetchData}>Refresh</Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Social Number</th>
              <th>Name</th>
              <th>Email</th>
              <th>Birth Date</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((contact: Contact) => {
              return (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.socialNumber}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{FormatDateString(contact.birthDate)}</td>
                  <td>{contact.gender}</td>
                  <td>{contact.phone}</td>
                  <td>
                    <div className="actions-container">
                      <Button
                        variant="info"
                        onClick={() => onEditClick(contact)}
                      >
                        <span className="btn-label">
                          <i className="fa-solid fa-pencil"></i>
                        </span>
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => onDeleteClick(contact)}
                      >
                        <span className="btn-label">
                          <i className="fa fa-trash"></i>
                        </span>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {/* Modals */}
        <EditModal
          show={showEditModal}
          setShow={setShowEditModal}
          contactId={selectedContact.id}
        />
        <ConfirmModal
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          contact={selectedContact}
          setContact={updateContactState}
        />
      </div>
    );
  }
};

export default List;
