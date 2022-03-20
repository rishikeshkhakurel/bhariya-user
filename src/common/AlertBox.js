import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@material-ui/icons/Close";
export default function AlertBox({ isError, AlertMessage }) {
  const audio = new Audio("/assets/ringtone.mp3");
  const [hidealertbox, sethidealertbox] = useState(false);
  useEffect(() => {
    audio.play();
  }, []);
  setTimeout(() => {
    sethidealertbox(true);
  }, 8000);
  return createPortal(
    <div
      className={`alertBox ${hidealertbox && "hidealertbox"} ${
        isError && "alertBoxerror"
      }`}
    >
      {AlertMessage}
      {/* <span>
        <CloseIcon />
      </span> */}
    </div>,
    document.getElementById("forAlert")
  );
}
