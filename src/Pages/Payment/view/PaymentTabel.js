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
import MenuComp from "../../../common/Components/MenuComp";
import CsvDownload from "react-json-to-csv";

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
  const { tabelData } = props;
  const columns = [
    { id: "sn", label: "S.N", align: "left" },
    {
      id: "OrderId",
      label: "Order ID",
      minWidth: 140,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "RefId",
      label: "Ref ID",
      minWidth: 140,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "Business",
      label: <span>Business</span>,
      minWidth: 140,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "Branch",
      label: <span>Branch</span>,
      minWidth: 140,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },

    {
      id: "Receiver",
      label: <span>Receiver</span>,
      minWidth: 140,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "Phone",
      label: <span>Phone</span>,
      minWidth: 140,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "Address",
      label: <span>Address</span>,
      minWidth: 140,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "Edit",
      label: "Edit",
      minWidth: 0,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];
  let navigate = useNavigate();
  const tableClickHandeller = (id) => {
    navigate(`/${props.onTableRowCLick}/:${id}`);
  };
  function createData(
    sn,
    OrderId,
    RefId,
    Business,
    Branch,
    Receiver,
    Phone,
    Address,
    Edit
  ) {
    return {
      sn,
      OrderId,
      RefId,
      Business,
      Branch,
      Receiver,
      Phone,
      Address,
      Edit,
    };
  }
  const verifiedStyle = (value) => {
    if (value === "Veified") {
      return <span style={{ color: "blue" }}>{value}</span>;
    }
  };
  const rows = [];

  let lengthOfData = tabelData?.length;
  tabelData?.map((value, index) => {
    rows.unshift(
      createData(
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>{lengthOfData--}</span>
        </div>,

        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>{value.order[0].id}</span>
        </div>,
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>{value.RefId}</span>
        </div>,
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>
          {value.business}
          </span>
        </div>,
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>{value.recievingbranch}</span>
        </div>,
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>{value.deliveryto}</span>
        </div>,
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>{value.phone}</span>
        </div>,
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>{value.deliverylocation}</span>
        </div>,
        <div className="tableCellbutton">
          <MenuComp>
            <BsThreeDotsVertical fontSize="20px" />
          </MenuComp>
        </div>
      )
    );
  });

  const exportData = tabelData?.map((value) => {
    return {
      "Date Time": value.deliverytime,
      "Business": value.business,
      "Branch": value.deliverybranch,
      "Receiver": value.deliveryto,
      "Phone": value.phone,
      "Address": value.deliverylocation,
      "Email": value.email,
      "ProductValue": value.packagevalue,
      "DeliveryStatus": value.order_status,
    };
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
