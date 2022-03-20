import React from "react";
import Button from "@material-ui/core/Button";

const PrimaryButton = (props) => {
  return (
    <Button
      className="primarybutton"
      color="primary"
      variant="contained"
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default PrimaryButton;
