import React from "react";
import PrimaryButton from "../Button/PrimaryButton";
import DailogComp from "./DailogComp";

const DeliveryConfirmNote = (props) => {
  return (
    <DailogComp open={props.open} dailogHandeller={props.dailogHandeller}>
      <div className="areyousurecomponent deliveryConfirmNote">
        <div className="areyousurecomponent-imgcontainer">
          <img src="/assets/iconareyouasure.png" alt="cancelicon" />
        </div>
        <h2>{props.title}</h2>
        <textarea
          placeholder="Want to add something"
          name="Note"
          id="DeliveryNote"
          cols="30"
        ></textarea>
        <div className="areyousurecomponent_buttons">
          <PrimaryButton onClick={props.onConform}>ok</PrimaryButton>
        </div>
      </div>
    </DailogComp>
  );
};

export default DeliveryConfirmNote;
