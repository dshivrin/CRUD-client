import { ZeroStateProps } from "../../types";
import AddNewContactBtn from "../shared/AddNewContact";

const ZeroState = (props: ZeroStateProps) => {
  const { action } = props;
  return (
    <div className="zero-state">
      <h2>Whooa, looks like you have no contacts here.. </h2>
      <p>To add new contact press the button below</p>
      <AddNewContactBtn action={action} text="Add New Contact" />
    </div>
  );
};

export default ZeroState;
