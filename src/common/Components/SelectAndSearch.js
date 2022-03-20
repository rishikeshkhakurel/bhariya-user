import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MdKeyboardArrowDown } from "react-icons/md";
const options = ["Bike", "4 Wheel Drive", "Jeep"];
export default function SelectAndSearch(props) {
  return (
    <Autocomplete
      id="custom-input-demo"
      options={options}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <div className="autocomplete_setting">
            <input
              {...params.inputProps}
              id="autocomplete"
              type="text"
              placeholder={props.placeholder}
              className="inputfeildcomponent"
            />
            <MdKeyboardArrowDown className="autocomplete_setting-icon" />
          </div>
        </div>
      )}
    />
  );
}
