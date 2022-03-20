import React from "react";

const FormValidationMsg = (props) => {
  return (
    <p style={{ color: "#e94235" }} className="validationMsg">
      {props.msg}
    </p>
  );
};

export default FormValidationMsg;
