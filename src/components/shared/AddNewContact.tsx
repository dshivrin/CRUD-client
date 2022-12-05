import Button from "react-bootstrap/Button";
import { AddNewContactProps } from "../../types";
import plusCircle from "../../media/plus-circle.svg";

const AddNewContactBtn = (props: AddNewContactProps) => {
  const { action, text } = props;
  return (
    <Button className="btn-add" variant="success" onClick={action}>
      <span className="btn-label-right">
        <img className="invert" src={plusCircle} />
        <span>{text}</span>
      </span>
    </Button>
  );
};

export default AddNewContactBtn;
