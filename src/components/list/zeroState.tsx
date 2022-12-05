import { ZeroStateProps } from "../../types";
import AddNewContactBtn from "../shared/AddNewContact";
import image from '../../media/zero-state.jpg';

const ZeroState = (props: ZeroStateProps) => {
  const { action } = props;
  return (
    <div className="zero-state">
      <br/>
      <h2>Oops, looks like you have no contacts here...</h2>
      <br/>
      <img src={image}/>
      <br/>
      <br/>
      <h4>To add new contact press the button below</h4>
      <br/>
      <AddNewContactBtn action={action} text="Add New Contact" />
    </div>
  );
};

export default ZeroState;
