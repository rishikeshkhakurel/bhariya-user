import React, { useEffect } from "react";
import Loading from "../../../common/Components/loading/LoadingComp";
import { useGetPaymentHistoryQuery, useGetPendingPaymentQuery } from "../../../Redux/Services/FetchApi";
import CollapsTable from "./CollapsTable";
import PaymentTable from "./PaymentTabel";
const PaymentHistory = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };  

  const getPaymentHistoryResponse=useGetPaymentHistoryQuery()

  return getPaymentHistoryResponse.isLoading ? (
    <Loading />
  ) : (
    <>
      <CollapsTable tabledata={getPaymentHistoryResponse?.data} />
    </>
  );
};

export default PaymentHistory;
