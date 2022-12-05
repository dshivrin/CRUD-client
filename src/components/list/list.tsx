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
import pen from "../../media/pen.svg";
import reload from "../../media/arrow-clockwise.svg";
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
  }, [data]);

  const onEditClick = (contact: Contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  const onDeleteClick = (contact: Contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  const onAddNew = () => {
    setSelectedContact({} as Contact);
    setShowEditModal(true);
  };

  const updateContactState = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const CloseEditModal = () => {
    setSelectedContact({} as Contact);
    setShowEditModal(false);
  };

  //add loading gif before
  if (data.length === 0) {
    return (
      <div>
        <ZeroState action={onAddNew} />
        <EditModal
          show={showEditModal}
          closeModal={CloseEditModal}
          contactId={selectedContact.id}
          reload={fetchData}
        />
      </div>
    );
  } else {
    //export this code to anothe component
    return (
      <div className="table-container">
        <div className="header">
          <AddNewContactBtn action={onAddNew} text="Add New Contact" />
          <Button onClick={fetchData}>
            <span className="btn-label-right">
              <img className="invert" src={reload} />
              <span>Refresh</span>
            </span>
          </Button>
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
                        <span className="btn-label-left">
                          <img src={pen} />
                        </span>
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => onDeleteClick(contact)}
                      >
                        <span className="btn-label-left">
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
          closeModal={CloseEditModal}
          contactId={selectedContact.id}
          reload={fetchData}
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
