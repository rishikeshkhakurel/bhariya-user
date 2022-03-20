import React from "react";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import DailogComp from "../Dailog/DailogComp";
const AreYouSure = (props) => {
  return (
    <DailogComp dailogHandeller={props.dailogHandeller} open={props.open}>
      <div
        className={`areyousurecomponent ${
          props.error && "areyousurecomponentOnlyforred"
        }`}
      >
        <div className="areyousurecomponent-imgcontainer">
          <img src={props.img} alt="cancelicon" />
        </div>
        <h2>{props.title}</h2>
        <p>{props.discription}</p>
        <div className="areyousurecomponent_buttons">
          <PrimaryButton onClick={props.onConform}>yes</PrimaryButton>
          <SecondaryButton onClick={props.dailogHandeller}>No</SecondaryButton>
        </div>
      </div>
    </DailogComp>
  );
};

export default AreYouSure;
