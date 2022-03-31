import { BsBank, BsWallet } from "react-icons/bs";
import { useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useEffect } from "react";
import PrimaryButton from "../../../common/Components/Button/PrimaryButton";
import SecondaryButton from "../../../common/Components/Button/SecondaryButton";
import TersaryButton from "../../../common/Components/Button/TersaryButton";
import Loading from "../../../common/Components/loading/LoadingComp";
import InputFeildComponent from "../../../common/Components/InputFeildComponent";
import AlertBox from "../../../common/AlertBox";
import {
  useAddPaymentMethodMutation,
  useGetPaymentMethodQuery,
} from "../../../Redux/Services/FetchApi";
import { Col, Row } from "react-bootstrap";
const AddPaymentMethod = () => {
  const [paymentState, setPaymentState] = useState(0);

  const paymentStateHandeller = (value) => {
    setPaymentState(value);
  };

  const [ewalletRadio, setEwalletRadio] = useState("Esewa");

  const [bankname, setBankname] = useState("");
  const [branch, setBranch] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [esewaId, setEsewaId] = useState("");
  const [userName, setUserName] = useState("");

  const [addPaymentMethod, addPaymentMethodResponseInfo] =
    useAddPaymentMethodMutation();
  const getPaymentMethodResponseInfo = useGetPaymentMethodQuery();
  const [bankDetails, setBankDetails] = useState([]);
  const [esewaDetails, setEsewaDetails] = useState([]);
  const addBankDetails = () => {
    if (paymentState === 0) {
      addPaymentMethod({
        paymethod: "Bank",
        bankname: bankname,
        bankbranch: branch,
        accountnumberorid: accountNumber,
        accountholder: accountName,
      });
    } else {
      addPaymentMethod({
        paymethod: ewalletRadio,
        accountnumberorid: esewaId,
        accountholder: userName,
      });
    }
  };
  const onClickToclearall = () => {
    if (paymentState === 0) {
      setBankname("");
      setBranch("");
      setAccountNumber("");
      setAccountName("");
    } else {
      setEsewaId("");
      setUserName("");
    }
  };
  useEffect(() => {
    if (getPaymentMethodResponseInfo.isSuccess) {
      setBankDetails(getPaymentMethodResponseInfo);
      const bankData = [];
      const esewaData = [];
      getPaymentMethodResponseInfo.data.map((value) => {
        if (value.paymethod === "Bank") {
          bankData.push(value);
        } else {
          esewaData.push(value);
        }
      });
      setBankDetails(bankData);
      setEsewaDetails(esewaData);
      setUserName(bankData[0]?.accountholder);
    }
  }, [getPaymentMethodResponseInfo]);

  useEffect(() => {
    if (addPaymentMethodResponseInfo.isSuccess) {
      onClickToclearall();
    }
  }, [addPaymentMethodResponseInfo.isSuccess]);
  return (
    <>
      {addPaymentMethodResponseInfo.isLoading && <Loading/>}
      {addPaymentMethodResponseInfo.isSuccess && (
        <AlertBox AlertMessage={"Your Account is added sucessfully"} />
      )}
      {addPaymentMethodResponseInfo.isError && (
        <AlertBox
          isError
          AlertMessage="Some thing Went Wrong Please Try again"
        />
      )}
      <div className="AddPymentMethod">
        <div className="AddPymentMethod__header">
          <h3>Add Payment Method</h3>
          <div className="AddPymentMethod__header-buttons">
            <PrimaryButton
              onClick={() => paymentStateHandeller(0)}
              startIcon={<BsBank />}
            >
              Bank Details
            </PrimaryButton>
            <TersaryButton
              onClick={() => paymentStateHandeller(1)}
              startIcon={<BsWallet />}
            >
              E-Wallet
            </TersaryButton>
          </div>
          {paymentState === 0 ? (
            <div className="AddPymentMethod__Bank">
              <div className="AddPymentMethod__Bank-icon">
                <BsBank /> <span> Bank details</span>
              </div>
              <div className="AddPymentMethod__Bank-inputsection">
                <Row>
                  <Col>
                    <InputFeildComponent
                      placeholder="Eg: Rastra Banijaye Bank "
                      label="Bank Name"
                      type="text"
                      value={bankname}
                      onChange={(e) => setBankname(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <InputFeildComponent
                      placeholder="Eg: Dharan"
                      label="Branch"
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <InputFeildComponent
                      placeholder="Account number"
                      label="Account Number"
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <InputFeildComponent
                      placeholder="Eg: Laxmi sherpa"
                      label="Account Name"
                      type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          ) : (
            <div className="AddPymentMethod__wallet">
              <div className="AddPymentMethod__Bank-icon">
                <BsWallet /> <span> E-Wallet</span>
              </div>
              <div className="AddPymentMethod__wallet-form">
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    value={ewalletRadio}
                    name="radio-buttons-group"
                    onChange={(e) => setEwalletRadio(e.target.value)}
                  >
                    <div className="AddPymentMethod__wallet-checkbox">
                      <div className="AddPymentMethod__wallet-checkbox-1">
                        <FormControlLabel
                          label="E-Sewa"
                          value="Esewa"
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
                            <Radio
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                        />
                      </div>
                      <div className="AddPymentMethod__wallet-checkbox-1">
                        <FormControlLabel
                          label="IME Pay"
                          value="IMEPay"
                          control={
                            <Radio
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                        />
                      </div>
                      <div className="AddPymentMethod__wallet-checkbox-1">
                        <FormControlLabel
                          label="Connect IPS"
                          value="ConnectIps"
                          control={
                            <Radio
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                        />
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="AddPymentMethod__wallet-form-2">
                <Row>
                  <Col>
                    <InputFeildComponent
                      value={esewaId}
                      onChange={(e) => setEsewaId(e.target.value)}
                      placeholder="Account ID"
                      label="ID"
                    />
                  </Col>
                  <Col>
                    <InputFeildComponent
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Account ID"
                      label="Name"
                      disabled={bankDetails.length > 0 ? true : false}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          )}

          <div className="AddPymentMethod__button">
            <PrimaryButton onClick={addBankDetails}>Submit</PrimaryButton>
            <SecondaryButton onClick={onClickToclearall}>
              Cancel
            </SecondaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPaymentMethod;
