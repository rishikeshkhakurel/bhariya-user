import React from "react";

const LableCom = (props) => {
  return (
    <h3 className="lableForInput">
      {props.name}
      <span className="requiredFeild">
        {props.required === false ? null : "*"}
      </span>
    </h3>
  );
};

export default LableCom;
