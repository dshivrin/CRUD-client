import Button from "react-bootstrap/Button";
import { AddNewContactProps } from "../../types";

const AddNewContactBtn = (props: AddNewContactProps) => {
  const { action, text } = props;
  return <Button onClick={action}>{text}</Button>;
};

export default AddNewContactBtn;
