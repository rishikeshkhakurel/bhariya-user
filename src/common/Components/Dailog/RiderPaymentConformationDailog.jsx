import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React, { useState } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import InputFeildComponent from "../InputFeildComponent";
import DailogComp from "./DailogComp";

const RiderPaymentConformationDailog = (props) => {
  const [stateOfPayment, setStateOfPayment] = useState("Cash");
  const setStateOfPaymentHandeller = (e) => {
    setStateOfPayment(e.target.value);
  };
  return (
    <DailogComp
      open={props.open}
      dailogHandeller={props.dailogHandeller}
      title="Payment Conformation"
    >
      <div className="RiderPaymentConformation">
        <h4>Select payment Options</h4>
        <div className="AddPymentMethod__wallet-form">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              defaultValue={stateOfPayment}
              name="radio-buttons-group"
              onChange={(e) => setStateOfPaymentHandeller(e)}
            >
              <div className="AddPymentMethod__wallet-checkbox">
                <div className="AddPymentMethod__wallet-checkbox-1">
                  <FormControlLabel
                    label="Cash"
                    value="Cash"
                    control={
                      <Radio
                        inputProps={{ "aria-label": "controlled" }}
                        defaultChecked
                      />
                    }
                  />
                  <div />
                </div>
                <div className="AddPymentMethod__wallet-checkbox-1">
                  <FormControlLabel
                    label="E-Sewa"
                    value="E-Sewa"
                    control={
                      <Radio
                        inputProps={{ "aria-label": "controlled" }}
                        defaultChecked
                      />
                    }
                  />
                  <div />
                </div>
                <div className="AddPymentMethod__wallet-checkbox-1">
                  <FormControlLabel
                    label="Khalti"
                    value="Khalti"
                    control={
                      <Radio inputProps={{ "aria-label": "controlled" }} />
                    }
                  />
                </div>
                <div className="AddPymentMethod__wallet-checkbox-1">
                  <FormControlLabel
                    label="IME Pay"
                    value="IMEPay"
                    control={
                      <Radio inputProps={{ "aria-label": "controlled" }} />
                    }
                  />
                </div>
                <div className="AddPymentMethod__wallet-checkbox-1">
                  <FormControlLabel
                    label="Bank Transfer"
                    value="BankTransfer"
                    control={
                      <Radio inputProps={{ "aria-label": "controlled" }} />
                    }
                  />
                </div>
                <div className="AddPymentMethod__wallet-checkbox-1">
                  <FormControlLabel
                    label="Unpain"
                    value="Unpaid"
                    control={
                      <Radio inputProps={{ "aria-label": "controlled" }} />
                    }
                  />
                </div>
              </div>
            </RadioGroup>
          </FormControl>
        </div>
        <div className="RiderPaymentConformation_inputs">
          {stateOfPayment === "E-Sewa" && (
            <InputFeildComponent
              type="number"
              placeholder="Esewa Id)"
              label={"Esewa-Id"}
            />
          )}
          {stateOfPayment === "Khalti" && (
            <InputFeildComponent
              type="number"
              placeholder="Khalti Id)"
              label={"Khalti Id"}
            />
          )}
          {stateOfPayment === "BankTransfer" && (
            <>
              <InputFeildComponent
                type="text"
                placeholder="Your ID"
                label={"Bank Account"}
              />
              <InputFeildComponent
                type="text"
                placeholder="Account Owner"
                label={"Account Owner"}
              />
            </>
          )}

          <InputFeildComponent
            type="number"
            placeholder="Paid Amount)"
            label={"Enter Amount "}
          />
          <InputFeildComponent
            type="number"
            placeholder="Return Amount)"
            label={"Enter Amount"}
            required={false}
          />
        </div>
        <div className="areyousurecomponent_buttons">
          <PrimaryButton onClick={props.onConform}>Save</PrimaryButton>
          <SecondaryButton onClick={props.dailogHandeller}>
            Cancel
          </SecondaryButton>
        </div>
      </div>
    </DailogComp>
  );
};

export default RiderPaymentConformationDailog;
