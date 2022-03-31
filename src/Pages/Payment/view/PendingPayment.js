import React from "react";
import Loading from "../../../common/Components/loading/LoadingComp";
import { useGetPendingPaymentQuery } from "../../../Redux/Services/FetchApi";
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

  const getPendingPaymentResponse=useGetPendingPaymentQuery()
  return getPendingPaymentResponse.isLoading ? (
    <Loading />
  ) : (
    <>
      <PaymentTable tabelData={getPendingPaymentResponse?.data} />
    </>
  );
};

export default PendingPayment;
