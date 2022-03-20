import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { AiOutlineClose } from "react-icons/ai";
const DailogComp = (props) => {
  if (props.open) {
    return (
      <>
        <Dialog
          open={props.open}
          onClose={props.dailogHandeller}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {props.title}
            <IconButton aria-label="close" onClick={props.dailogHandeller}>
              <AiOutlineClose />
            </IconButton>
          </DialogTitle>
          <DialogContent style={props.style}>{props.children}</DialogContent>
        </Dialog>
      </>
    );
  } else {
    return null;
  }
};

export default DailogComp;
