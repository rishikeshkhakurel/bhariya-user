import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import PrimaryButton from "../../../common/Components/Button/PrimaryButton";
import MenuComp from "../../../common/Components/MenuComp";
import CsvDownload from "react-json-to-csv";
import AreYouSure from "../../../common/Components/AreYousureComp/AreYouSure";
import {
  useReturnRefundMutation,
  useUpdateDeliveryHistoryDataByidMutation,
} from "../../../Redux/Services/FetchApi";
import AlertBox from "../../../common/Components/AlertBox";
import DailogComp from "../../../common/Components/Dailog/DailogComp";
import InputFeildComponent from "../../../common/Components/InputFeildComponent";
import SecondaryButton from "../../../common/Components/Button/SecondaryButton";
import { Row } from "react-bootstrap";

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "0px 10px",
  },
  container: {
    maxHeight: 440,
    background: "#fff",
  },
});

export default function UserDeliveryHistoryTabel({
  tabelData,
  columData,
  onTableRowCLick,
}) {
  const columns = [
    {
      id: "Edit",
      label: "Edit",
      minWidth: 0,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  const [EditDeliveryHistory, DeliveryHistoryResponse] =
    useUpdateDeliveryHistoryDataByidMutation();

  columData.map((value) =>
    columns.unshift({
      id: value,
      label: value,
      minWidth: 0,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    })
  );
  let navigation = useNavigate();
  const tableClickHandeller = (id) => {
    navigation(`/${onTableRowCLick}/${id}`);
  };

  function createData(
    Sn,
    OrderId,
    DateTime,
    RefID,
    PickupID,
    Business,
    Branch,
    Receiver,
    Phone,
    Address,
    Email,
    LiveLocation,
    WeigntDimension,
    ProductValue,
    CODAmount,
    DeliveryStatus,
    Edit
  ) {
    return {
      Sn,
      OrderId,
      DateTime,
      RefID,
      PickupID,
      Business,
      Branch,
      Receiver,
      Phone,
      Address,
      Email,
      LiveLocation,
      WeigntDimension,
      ProductValue,
      CODAmount,
      DeliveryStatus,
      Edit,
    };
  }

  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [exportDataPopUp, setExportDataPopUp] = React.useState(false);

  const exportData = tabelData?.map((value) => {
    const date = value.deliverytime.split("T")[0];
    if (date < enddate && date > startdate) {
      return {
        OrderId: value.id,
        OrderName: value.productname,
        DateTime: value.deliverytime,
        Business: value.business,
        Branch: value.deliverybranch,
        Receiver: value.deliveryto,
        Phone: value.phone,
        Address: value.deliverylocation,
        Email: value.email,
        ProductValue: value.packagevalue,
        CODAmount: value.cod,
        DeliveryStatus: value.order_status,
      };
    } else {
      return {};
    }
  });

  const rows = [];
  const [ReturnRefundPopUp, setReturnRefundPopUp] = useState(false);
  const [RefundAmount, setRefundAmount] = useState();
  const [RefundReturn, setReturnRefundId] = useState();
  const [ReturnPopUp, setReturnPopUp] = useState(false);

  const navigateToEditPage = (id) => {
    navigation(`/deliveryhistory/requestdeliveryform/${id}`);
  };

  const navigateToDublicateOrder = (id) => {
    navigation("/deliveryhistory/requestdeliveryform/", { state: { id: id } });
    // navigation.navigate()
  };
  let lengthOfData = tabelData?.length;
  tabelData?.map((value, index) => {
    let date, time, formatingtime, isAm;
    date = value?.deliverytime?.split("T")[0];
    formatingtime = value?.deliverytime?.split("T")[1].split(".")[0].split(":");
    time = () => {
      if (formatingtime[0] > 12) {
        return `${formatingtime[0] - 12}:${formatingtime[1]}`;
      } else {
        return `${formatingtime[0]}:${formatingtime[1]}`;
      }
    };
    isAm = () => {
      if (formatingtime[0] > 12) {
        return "PM";
      } else {
        return "AM";
      }
    };
    rows.unshift(
      createData(
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>{lengthOfData--}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>
            {value?.productname} <br /> <span>{value?.id}</span>
          </span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>
            {date}
            <br />
            <span>
              {time()} {isAm()}
            </span>
          </span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>#{value?.reference_id}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>#{value?.id}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>{value?.business}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>{value?.deliverybranch}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>{value?.deliveryto}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>{value?.phone}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>{value?.deliverylocation}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>{value?.email}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>{value?.livelocation}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>{value?.weight} kg</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>{value?.packagevalue}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>{value?.cod}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value?.id)}
        >
          <span>{value?.order_status}</span>
        </div>,
        <div className="tableCellbutton">
          <MenuComp
            onClickToEditUserDelivery={() => navigateToEditPage(value?.id)}
            onClickCancel={() => setCancel(value?.id)}
            onClickDuplicate={() => navigateToDublicateOrder(value?.id)}
            onClickReturnRefund={() => {
              setReturnRefundPopUp(true);
              setReturnRefundId(value?.id);
            }}
            onClickReturn={() => {
              setReturnPopUp(true);
              setReturnRefundId(value?.id);
            }}
            value={value?.order_status}
          >
            <BsThreeDotsVertical fontSize="20px" />
          </MenuComp>
        </div>
      )
    );
  });
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [ReturnRefund, ReturnRefundResponse] = useReturnRefundMutation();

  const onReturnRefundHandler = (e) => {
    e.preventDefault();
    ReturnRefund({
      id: RefundReturn,
      data: { refund_amount: RefundAmount },
    });
    setReturnRefundPopUp(false);
  };

  const onReturnHandler = () => {
    ReturnRefund({
      id: RefundReturn,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [cancel, setCancel] = useState("");

  const CancelDeliveryHandler = () => {
    setCancel("");
  };
  const onConfirmCancelDelivery = (id) => {
    EditDeliveryHistory({
      id: cancel,
      data: {
        order_status: "Cancel",
      },
    });
  };

  return (
    <>
      {ReturnRefundResponse.isSuccess && (
        <AlertBox AlertMessage="Return or Return Refund Placed Successfully" />
      )}
      {DeliveryHistoryResponse.isSuccess && (
        <AlertBox isError AlertMessage="Order is Cancled" />
      )}

      {/* Dialog Compoent to filter data from date while exporting */}
      <DailogComp
        open={exportDataPopUp}
        dailogHandeller={() => setExportDataPopUp(false)}
        title="Export Date Select"
      >
        <div className="RiderDaillyReciving_callender-inputs">
          <div className="RiderDaillyReciving_callender-inputs-1">
            <h4>Start</h4>
            <input type="Date" onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="RiderDaillyReciving_callender-inputs-2">
            <h4>End</h4>
            <input type="Date" onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
        <br />
        <PrimaryButton>
          <CsvDownload
            filename="Franchise form.csv"
            style={{
              background: "transparent",
              color: "white",
              fontWeight: "600",
              border: "none",
              outline: "none",
            }}
            data={exportData}
          >
            Export
          </CsvDownload>
        </PrimaryButton>
      </DailogComp>

      {/* Pop of Return and Refund Data which is only possible after delivered. Is used to enter Refund Amount */}
      <DailogComp
        open={ReturnRefundPopUp}
        dailogHandeller={() => setReturnRefundPopUp(false)}
        title="Return Refund"
      >
        <form onSubmit={onReturnRefundHandler}>
          <Row>
            <InputFeildComponent
              label="Refund Amount"
              onChange={(e) => setRefundAmount(e.target.value)}
              value={RefundAmount}
            />
          </Row>
          <br />
          <Row>
            <PrimaryButton type="submit">Submit</PrimaryButton>
          </Row>
          <br />
          <Row>
            <SecondaryButton onClick={(e) => setReturnRefundPopUp(false)}>
              Cancel
            </SecondaryButton>
          </Row>
        </form>
      </DailogComp>

      <AreYouSure
        title={"Are you sure, you want to Cancel Delivery"}
        open={cancel}
        dailogHandeller={CancelDeliveryHandler}
        onConform={() => onConfirmCancelDelivery}
        img="/assets/cancel.png"
        error
      />
      <AreYouSure
        title={"Are you sure, you want to Return Delivery"}
        open={ReturnPopUp}
        dailogHandeller={() => setReturnPopUp(false)}
        onConform={onReturnHandler}
        img="/assets/cancel.png"
        error
      />
      <div className="userTable">
        <div>
          <Paper style={{ padding: 0 }} className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <>
                                <TableCell
                                  style={{ cursor: "pointer" }}
                                  key={column?.id}
                                  align={column?.align}
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              </>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>

      <div className="userTable__paginatin">
        <div className="userTable__paginatin-1">
          <PrimaryButton onClick={(e) => setExportDataPopUp(true)}>
            Export
          </PrimaryButton>
        </div>
        <div className="userTable__paginatin-2">
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </>
  );
}
