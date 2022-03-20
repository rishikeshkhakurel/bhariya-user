import React from "react";
import Button from "@material-ui/core/Button";

const SecondaryButton = (props) => {
  return (
    <Button
      className="secondarybutton"
      color="primary"
      variant="contained"
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default SecondaryButton;
