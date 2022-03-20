import { Button } from "@material-ui/core";
import React from "react";

const TersaryButton = (props) => {
  return (
    <Button {...props} className="tersarybutton" variant="outlined">
      {props.children}
    </Button>
  );
};

export default TersaryButton;
