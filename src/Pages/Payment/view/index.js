import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PendingPayment from "./PendingPayment";
import PaymentMethod from "./PaymentMethod";
import PaymentHistory from "./PaymentHistory";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  root: {
    padding: "0px",
  },
  tabs: {
    "& .MuiTabs-indicator": {
      backgroundColor: "#28bb46",
      height: 3,
    },
  },
});
const UserPayment = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="userAdmin-payment">
        <div className="userAdmin--header">
          <h2>Payment</h2>
        </div>
        <div className="userAdmin-payment-box">
          <div className="userAdmin-payment-box-tabs">
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs
                  className={classes.tabs}
                  value={value}
                  scrollButtons="on"
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Pendings" {...a11yProps(0)} />
                  <Tab label="History" {...a11yProps(1)} />
                  <Tab label="Options" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <PendingPayment />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="paymentHistory">
                  <PaymentHistory />
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <PaymentMethod />
              </TabPanel>
            </div>
          </div>
        </div>
        {/* {value === 1 && (
        <div className="userTable__paginatin">
        <div className="userTable__paginatin-1">
        <PrimaryButton>Export</PrimaryButton>
          </div>
          <div className="userTable__paginatin-2">
          <TablePaginationEdit />
          </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default UserPayment;
