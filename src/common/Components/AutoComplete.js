import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MdKeyboardArrowDown } from "react-icons/md";
import LableCom from "./LableCom";

export default function AutocompleteSetting(props) {
  return (
    <Autocomplete
      id="custom-input-demo"
      options={props.arrayOfOption}
      {...props}
      disabled={props.disabled}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <label className="inputfeildcomponentLable" htmlFor={"autocomplete"}>
            <LableCom name={props.name} />
          </label>
          <div className="autocomplete_setting">
            <input
              {...params.inputProps}
              id="autocomplete"
              type="text"
              placeholder={props.placeholder}
              className="inputfeildcomponent"
              value={props.value}
              disabled={props.disabled}
            />
            <MdKeyboardArrowDown className="autocomplete_setting-icon" />
          </div>
        </div>
      )}
    />
  );
}
