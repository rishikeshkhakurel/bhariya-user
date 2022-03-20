import React from "react";

const ShareButton = (props) => {
  return (
    <div className="ShareButtonHomePage">
      <div className="ShareButtonHomePage-icon">{props.children}</div>
      <h2>{props.title}</h2>
    </div>
  );
};

export default ShareButton;
