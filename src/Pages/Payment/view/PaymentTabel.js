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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { BsThreeDotsVertical } from "react-icons/bs";
import PrimaryButton from "../../../common/Components/Button/PrimaryButton";
// import MenuComp from "../../../common/Components/MenuComp";

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

export default function PaymentTable(props) {
  const columns = [
    { id: "sn", label: "S.N", align: "left" },
    {
      id: "DateAndTime",
      label: "Date & Time",
      minWidth: 140,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "TotalOrder",
      label: "Total Order",
      minWidth: 140,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "PaymentMethod",
      label: <span>Payment Method</span>,
      minWidth: 140,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "Amount",
      label: <span>Amount</span>,
      minWidth: 140,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },

    {
      id: "Note",
      label: <span>Note</span>,
      minWidth: 140,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },

    
  ];
  let navigate = useNavigate();
  const tableClickHandeller = (id) => {
    navigate(`/${props.onTableRowCLick}/:${id}`);
  };
  function createData(
    sn,
    DateAndTime,
    TotalOrder,
    PaymentMethod,
    Amount,
    Note,
  ) {
    return {
      sn,
      DateAndTime,
      TotalOrder,
      PaymentMethod,
      Amount,
      Note,
    };
  }
  const verifiedStyle = (value) => {
    if (value === "Veified") {
      return <span style={{ color: "blue" }}>{value}</span>;
    }
  };
  const rows = [];
  for (let i = 1; i <= 15; i++) {
    rows.push(
      createData(
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>{i}</span>
        </div>,

        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>Date & Time</span>
        </div>,
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>3</span>
        </div>,
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>
            Esewa
            <br />
            <span>9841123456</span>
          </span>
        </div>,
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>1000</span>
        </div>,
        <div className="rowHandeller" onClick={tableClickHandeller}>
        <span>All ok</span>
      </div>,

        
      )
    );
  }
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
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          <h2>Showing out of 200</h2>
          <button>
            View 6 <ExpandMoreIcon />
          </button>
        </div>
      </div>
    </>
  );
}
