import React, { useState } from "react";
import { useEffect } from "react";
import PrimaryButton from "../../../common/Components/Button/PrimaryButton";
import { useGetPaymentMethodQuery } from "../../../Redux/Services/FetchApi";
import AddPaymentMethod from "./AddPaymentMethod";

const PaymentMethod = () => {
  const [stateOfViewPage, setStateOfViewPage] = useState(true);
  const stateViewPageHandeller = () => {
    setStateOfViewPage(!stateOfViewPage);
  };

  const [bankDetails, setBankDetails] = useState([]);
  const [esewaDetails, setEsewaDetails] = useState([]);

  const getPaymentMethodResponseInfo = useGetPaymentMethodQuery();

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
    }
  }, [getPaymentMethodResponseInfo]);
  return (
    <div style={{ background: "white" }} className="onlyforcolor">
      {stateOfViewPage ? (
        <div className="PaymentMethod">
          <div className="PaymentMethod--heading">
            <h2>Bank Details</h2>
            <PrimaryButton onClick={stateViewPageHandeller}>
              Add Another Option
            </PrimaryButton>
          </div>
          <div className="PaymentMethod_bank-container">
            {bankDetails.length > 0 ? (
              <>
                {bankDetails.map((value) => {
                  return (
                    <>
                      <div className="PaymentMethod_bank">
                        <div className="PaymentMethod_bank-imgcontainer">
                          <img src="/assets/bank1.png" alt="bank" />
                        </div>
                        <div className="PaymentMethod_bank-details">
                          <h4>
                            Bank Name: <span> {value.bankname}</span>
                          </h4>
                          <h4>
                            Branch : <span> {value.bankbranch} </span>
                          </h4>
                          <h4>
                            Account Number:{" "}
                            <span> {value.accountnumberorid}</span>
                          </h4>
                          <h4>
                            Account Name: <span>{value.accountholder}</span>
                          </h4>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              <p>
                No Details Found you can set details by clicking add payment
                method
              </p>
            )}
          </div>
          <div className="PaymentMethod--heading">
            <h2>Digital Wallet</h2>
          </div>
          <div className="PaymentMethod_bank-container">
            {esewaDetails.length > 0 ? (
              <>
                {esewaDetails.map((value) => {
                  return (
                    <>
                      <div className="PaymentMethod_bank">
                        <div className="PaymentMethod_bank-imgcontainer">
                          <img src="/assets/bank2.png" alt="bank" />
                        </div>
                        <div className="PaymentMethod_bank-details">
                          <h4>
                            ID : <span> {value.accountnumberorid}</span>
                          </h4>
                          <h4>
                            Name : <span> {value.accountholder} </span>
                          </h4>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              <p>
                No Details Found you can set details by clicking add payment
                method
              </p>
            )}
          </div>
        </div>
      ) : (
        <AddPaymentMethod />
      )}
    </div>
  );
};

export default PaymentMethod;
