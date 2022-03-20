import { Select } from "@material-ui/core";
import React from "react";

const SelectComp = (props) => {
  return (
    <Select onChange={(e) => e.target.value} className="selectButton">
      <option>Business One</option>
      <option>Business Two</option>
    </Select>
  );
};

export default SelectComp;
