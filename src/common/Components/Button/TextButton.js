import React from "react";
import Button from "@material-ui/core/Button";

const TextButton = (props) => {
  return (
    <Button {...props} className="textbutton" color="primary">
      {props.children}
    </Button>
  );
};

export default TextButton;
