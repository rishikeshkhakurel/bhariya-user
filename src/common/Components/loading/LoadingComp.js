import { CircularProgress } from "@material-ui/core";
import React from "react";
import { createPortal } from "react-dom";

const Loading = () => {
  return createPortal(
    <div className="loadingcomp">
      <CircularProgress />
    </div>,
    document.getElementById("forloading")
  );
};

export default Loading;
