import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "./Button/PrimaryButton";

const NothingToShow = () => {
  return (
    <div className="nothingtoshow">
      <div className="userAdmin--header">
        <h2>Delivery History</h2>
      </div>
      <div className="nothingtoshow__middle">
        <div className="nothingtoshow__middle_content">
          <div className="nothingtoshow__middle-imgcontainer">
            <img src="/assets/groupbox.png" alt="box" />
          </div>
          <h2>Nothing to show</h2>
          <p>Make your first delivery request</p>
          <Link to="/deliveryhistory/requestdeliveryform">
            <PrimaryButton>Request Now</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NothingToShow;
