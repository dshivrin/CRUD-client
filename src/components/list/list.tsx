import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Contact } from "../../types";
import EditModal from "../editModal/editModal";
import ConfirmModal from "../confirmModal/confirmModal";
import AddNewContactBtn from "../shared/AddNewContact";
import { fetchAllContacts } from "../shared/apiService";
import StyledTable from "./styledTable";
import ZeroState from "./zeroState";
import Loading from "../loading/loading";
import reload from "../../media/arrow-clockwise.svg";
import "./list.css";

const List = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState({} as Contact);

  const fetchData = async () => {
    const result = await fetchAllContacts();
    setData(result.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await fetchAllContacts();
      setData(result.data);
      setIsLoading(false);
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

  if (!isLoading && data.length === 0) {
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
    return (
      <div >
        {isLoading ? (
          <Loading />
        ) : (
          <div className="table-container">
            <div className="title">
              <h4>Contacts List</h4>
            </div>
            <div className="header">
              <AddNewContactBtn action={onAddNew} text="Add" />
              <Button onClick={fetchData}>
                <span className="btn-label-right">
                  <img className="invert" src={reload} />
                  <span>Refresh</span>
                </span>
              </Button>
            </div>
            <StyledTable
              data={data}
              onDelete={onDeleteClick}
              onEdit={onEditClick}
            />
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
        )}
      </div>
    );
  }
};

export default List;
