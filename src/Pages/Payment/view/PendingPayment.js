import React from "react";
import Loading from "../../../common/Components/loading/LoadingComp";
import { useGetAddPaymentCustomerQuery } from "../../../Redux/Services/FetchApi";
import PaymentTable from "./PaymentTabel";
const PendingPayment = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserPaymentResponseInfo = useGetAddPaymentCustomerQuery();
  return getUserPaymentResponseInfo.isLoading ? (
    <Loading />
  ) : (
    <>
      <PaymentTable tabelData={getUserPaymentResponseInfo?.data?.results} />
    </>
  );
};

export default PendingPayment;
