import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PrimaryButton from "../../../common/Components/Button/PrimaryButton";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(
  SN,
  TotalOrder,
  DateTime,
  CODAmount,
  DeliveryCharge,
  PaymentReceive,
  PaymentMode,
  Payout,
  Note
) {
  return {
    SN,
    TotalOrder,
    DateTime,
    CODAmount,
    DeliveryCharge,
    PaymentReceive,
    PaymentMode,
    Payout,
    Note,
    // history: [
    //   {
    //     SN: 1,
    //     ProductDetails: "Hello World",
    //     DateTime: "2021-22-10",
    //     Business: "Hello World",
    //     ProductValue: "Rs. 2020",
    //     CODAmount: "Rs 2020",
    //     PickupCharge: "20202",
    //   },
    // ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {/* <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        <TableCell align="right" component="th" scope="row">
          {row.SN}
        </TableCell>
        <TableCell align="right">{row.TotalOrder}</TableCell>
        <TableCell align="right">{row.DateTime}</TableCell>
        <TableCell align="right">{row.CODAmount}</TableCell>
        <TableCell align="right">{row.DeliveryCharge}</TableCell>
        <TableCell align="right">{row.PaymentReceive}</TableCell>
        <TableCell align="right">{row.PaymentMode}</TableCell>
        <TableCell align="right">{row.Payout}</TableCell>
        <TableCell align="right">{row.Note}</TableCell>
      </TableRow>
      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>SN</TableCell>
                    <TableCell>Product&nbsp;Details</TableCell>
                    <TableCell align="right">Date&nbsp;&&nbsp;Time</TableCell>
                    <TableCell align="right">Business</TableCell>
                    <TableCell align="right">Product&nbsp;Value</TableCell>
                    <TableCell align="right">COD&nbsp;Amount</TableCell>
                    <TableCell align="right">Pickup&nbsp;Charge</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.SN}>
                      <TableCell component="th" scope="row">
                        {historyRow.SN}
                      </TableCell>
                      <TableCell>{historyRow.ProductDetails}</TableCell>
                      <TableCell align="right">{historyRow.DateTime}</TableCell>
                      <TableCell align="right">{historyRow.Business}</TableCell>
                      <TableCell align="right">
                        {historyRow.ProductValue}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.CODAmount}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.PickupCharge}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function CollapsTable(props) {
  const rows = [];
  props.tabledata.map((data, index) => {
    rows.unshift(
      createData(
        `${index + 1}`,
        props.tabledata.length,
        "Nov 1, 2021",
        "Rs 12000",
        "1200",
        "1150",
        "Cash",
        "Rs 600",
        "Remaining..."
      )
    );
  });
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {/* <TableCell /> */}
              <TableCell align="right">S.N</TableCell>
              <TableCell align="right">Total&nbsp;order</TableCell>
              <TableCell align="right">Date&nbsp;&&nbsp;Time</TableCell>
              <TableCell align="right">COD&nbsp;Amount</TableCell>
              <TableCell align="right">Delivery&nbsp;Charge</TableCell>
              <TableCell align="right">Payment&nbsp;Receive</TableCell>
              <TableCell align="right">Payment&nbsp;Mode</TableCell>
              <TableCell align="right">Payout</TableCell>
              <TableCell align="right">Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
