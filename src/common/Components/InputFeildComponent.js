import React, { useState } from "react";
import FormValidationMsg from "./FormValidationMsg";
import LableCom from "./LableCom";

const InputFeildComponent = (props) => {
  const [checkValidationState, setCheckValidationMsg] = useState(false);

  const checkValidationMsgForRequired = (data) => {
    if (checkValidationState) {
      if (data.length > 0) {
        return null;
      } else {
        return <FormValidationMsg msg="This Field is Required" />;
      }
    }
  };
  const checkValidationMsgForOnlyNumber = (data) => {
    if (checkValidationState) {
      if (data.length > 0) {
        if (isNaN(data)) {
          return <FormValidationMsg msg="Only Number are Allowed" />;
        } else {
          return null;
        }
      } else {
        return <FormValidationMsg msg="This Field is Required" />;
      }
    }
  };
  const toCheckPhoneNumber = (data) => {
    if (checkValidationState) {
      if (data.length > 0) {
        if (isNaN(data)) {
          return <FormValidationMsg msg="Only Number are Allowed" />;
        } else if (data.length >= 14 || data.length < 10) {
          return <FormValidationMsg msg="Please Enter Valid Number" />;
        } else {
          return null;
        }
      } else {
        return <FormValidationMsg msg="This Field is Required" />;
      }
    }
  };
  const toCheckEmail = (data) => {
    if (checkValidationState) {
      if (data.length > 0) {
        if (data.includes("@")) {
          return null;
        } else {
          return <FormValidationMsg msg="Please Enter Valid Email" />;
        }
      } else {
        return <FormValidationMsg msg="This Field is Required" />;
      }
    }
  };
  const toCheckPassword = (data) => {
    if (checkValidationState) {
      if (data.length > 0) {
        if (data.length > 8) {
          return null;
        } else {
          return (
            <FormValidationMsg msg="Password must be eight character long!!" />
          );
        }
      } else {
        return <FormValidationMsg msg="This Field is Required" />;
      }
    }
  };

  const displayDynamicMessage = (type, data) => {
    switch (type.toLowerCase()) {
      case "text":
        return checkValidationMsgForRequired(data);
        break;
      case "number":
        return checkValidationMsgForOnlyNumber(data);
        break;
      case "phonenumber":
        return toCheckPhoneNumber(data);
        break;
      case "email":
        return toCheckEmail(data);
        break;
      case "password":
        return toCheckPassword(data);
        break;
      default:
        return null;
        break;
    }
  };

  return (
    <>
      <label className="inputfeildcomponentLable" htmlFor={props.label}>
        <LableCom required={props.required} name={props.label} />
      </label>
      <input
        autoComplete="off"
        onBlur={() => setCheckValidationMsg(true)}
        {...props.input}
        {...props}
        id={props.label}
        type={props.type ? props.type : "text"}
        placeholder={props.placeholder}
        className="inputfeildcomponent"
      />
      {props.type && displayDynamicMessage(props.type, props.value)}
    </>
  );
};

export default InputFeildComponent;
