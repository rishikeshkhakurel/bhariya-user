import React from "react";
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

export default function UserRecivingTabel({
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

  columData.map((value) =>
    columns.unshift({
      id: value,
      label: value,
      minWidth: 0,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    })
  );
  let navigate = useNavigate();
  const tableClickHandeller = (id) => {
    navigate(`/${onTableRowCLick}/${id}`);
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
    PickupCharge,
    Deliverycharge,
    CODReceived,
    PaymentReceived,
    Balance,
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
      PickupCharge,
      Deliverycharge,
      CODReceived,
      PaymentReceived,
      Balance,
      DeliveryStatus,
      Edit,
    };
  }

  const changeStringToVariableName = (variable, value) => {
    window[variable] = value;
  };
  const verifiedStyle = (value) => {
    if (value === "Veified") {
      return <span style={{ color: "blue" }}>{value}</span>;
    }
  };
  const rows = [];

  let lengthOfData = tabelData?.length;
  tabelData?.map((value, index) => {
    let date, time, formatingtime, isAm;
    date = value.deliverytime.split("T")[0];
    formatingtime = value.deliverytime.split("T")[1].split(".")[0].split(":");
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
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>{lengthOfData--}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>
            {value.productname} <br /> <span>{value.id}</span>
          </span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
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
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>#12334</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>45322</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>{value.business}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>{value.deliverybranch}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>Salina Lama</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>{value.phone}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>{value.deliverylocation}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>{value.email}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>{value.livelocation}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>400 kg</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>{value.packagevalue}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>{value.cod}</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>{index * 4 + 10} rs</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>{index * 6 + 10} rs</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>Yes</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>Yes</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>3000 rs</span>
        </div>,
        <div
          className="rowHandeller"
          onClick={() => tableClickHandeller(value.id)}
        >
          <span>{value.order_status}</span>
        </div>,
        <div className="tableCellbutton">
          <MenuComp userRecivingTabel>
            <BsThreeDotsVertical fontSize="20px" />
          </MenuComp>
        </div>
      )
    );
  });
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
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
                                  key={column.id}
                                  align={column.align}
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
          <PrimaryButton>Export</PrimaryButton>
        </div>
        <div className="userTable__paginatin-2">
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {/* <h2>Showing out of 200</h2>
          <button>
            View 6 <ExpandMoreIcon />
          </button> */}
        </div>
      </div>
    </>
  );
}
