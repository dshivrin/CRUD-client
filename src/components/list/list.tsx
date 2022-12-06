import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Contact } from "../../types";
import EditModal from "../editModal/editModal";
import ConfirmModal from "../confirmModal/confirmModal";
import AddNewContactBtn from "../shared/AddNewContact";
import { fetchAllContacts } from "../shared/apiService";
import StyledTable from "./styledTable";
import Pagination from "./pagination";
import ZeroState from "./zeroState";
import Loading from "../loading/loading";
import reloadIcon from "../../media/arrow-clockwise.svg";
import "./list.css";

const List = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState({} as Contact);

  //paginations calcs
  const nPages = Math.ceil(totalRecords / recordsPerPage);

  const fetchData = async (page: number, records: number) => {
    const result = await fetchAllContacts(page, records);
    setData(result.data.contacts);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      const result = await fetchAllContacts(currentPage, recordsPerPage);
      setData(result.data.contacts);
      setTotalRecords(result.data.total);
      setIsLoading(false);
    };
    fetchInitialData();
  }, [currentPage]);

  const onEditClick = (contact: Contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  const onPageClick = (page: number) => {
    setCurrentPage(page);
    fetchData(page, recordsPerPage);
  }

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
          reload={() => fetchData(currentPage, recordsPerPage)}
        />
      </div>
    );
  } else {
    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="table-container">
            <div className="title">
              <h4>Contacts List</h4>
            </div>
            <div className="header">
              <AddNewContactBtn action={onAddNew} text="Add" />
              <Button onClick={() => fetchData(currentPage, recordsPerPage)}>
                <span className="btn-label-right">
                  <img className="invert" src={reloadIcon} />
                  <span>Refresh</span>
                </span>
              </Button>
            </div>
            <div className="table">
              <StyledTable
                data={data}
                onDelete={onDeleteClick}
                onEdit={onEditClick}
              />
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={onPageClick}
              />
            </div>
            <EditModal
              show={showEditModal}
              closeModal={CloseEditModal}
              contactId={selectedContact.id}
              reload={() => fetchData(currentPage, recordsPerPage)}
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
