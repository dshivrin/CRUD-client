import Table from "react-bootstrap/Table";
import { FormatDateString } from "../../utils";
import pen from "../../media/pen.svg";
import { Contact, TableProps } from "../../types";
import Button from "react-bootstrap/Button";

const StyledTable = (props: TableProps) => {
  const { data, onDelete, onEdit } = props;
  return (
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
                  <Button variant="info" onClick={() => onEdit(contact)}>
                    <span className="btn-label-left">
                      <img src={pen} />
                    </span>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onDelete(contact)}
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
  );
};

export default StyledTable;
