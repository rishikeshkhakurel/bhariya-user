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
import PrimaryButton from "../../../common/Components/Button/PrimaryButton"
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

export default function DeliveryTable(props) {
  const columns = [
    { id: "sn", label: "S.N", align: "left" },
    {
      id: "OrderId",
      label: <span>Order&nbsp;Id</span>,
      minWidth: 140,
      align: "left",
    },
    {
      id: "RefId",
      label: <span>Ref&nbsp;Id</span>,
      minWidth: 140,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "DateAndTime",
      label: "Date & Time",
      minWidth: 140,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "AssignedVechicle",
      label: "Assigned Vechicle",
      minWidth: 140,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "Route",
      label: <span>Route</span>,
      minWidth: 140,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "PickupLocation",
      label: <span>Pickup Location</span>,
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
    DateAndTime,
    AssignedVechicle,
    Route,
    PickupLocation,
    Edit
  ) {
    return {
      sn,
      OrderId,
      RefId,
      DateAndTime,
      AssignedVechicle,
      Route,
      PickupLocation,
      Edit,
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
          <span>
            New&nbsp;Glasses <br /> <span>#123456</span>
          </span>
        </div>,
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>{i}78599234</span>
        </div>,
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>Date & Time</span>
        </div>,
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>
            Assigned Vechicle
          </span>
        </div>,
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>Kathmandu</span>
        </div>,
        <div className="rowHandeller" onClick={tableClickHandeller}>
          <span>Dharan</span>
        </div>,

        <div className="tableCellbutton">
          {/* <MenuComp DeliveryRequest> */}
            <BsThreeDotsVertical fontSize="20px" />
          {/* </MenuComp> */}
        </div>
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
