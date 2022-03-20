import React, { useEffect, useState } from "react";
import { BiCustomize } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PrimaryButton from "../../../common/Components/Button/PrimaryButton";
import TersaryButton from "../../../common/Components/Button/TersaryButton";
import SecondaryButton from "../../../common/Components/Button/SecondaryButton";
import Loading from "../../../common/Components/loading/LoadingComp";
import UserDeliveryHistoryTabel from "./UserDeliveryHistoryTabel";
import DailogComp from "../../../common/Components/Dailog/DailogComp";
import { useGetUserDeliveryDataQuery } from "../../../Redux/Services/FetchApi";
const DeliveryHistory = () => {
  const [filterDate, setFilterDate] = React.useState("2021-01");
  const [customizeTable, setCustomizeTable] = useState(false);
  const customizeTableHandeller = () => {
    setCustomizeTable(!customizeTable);
  };

  const [state, setState] = React.useState({
    Sn: true,
    OrderId: false,
    DateTime: true,
    RefID: false,
    PickupID: false,
    Business: true,
    Branch: true,
    Receiver: true,
    Phone: true,
    Address: true,
    Email: true,
    LiveLocation: true,
    WeigntDimension: false,
    ProductValue: true,
    CODAmount: true,
    PickupCharge: false,
    Deliverycharge: false,
    CODReceived: false,
    PaymentReceived: false,
    Balance: false,
    DeliveryStatus: true,
  });
  const row = [
    "Sn",
    "OrderId",
    "DateTime",
    "RefID",
    "PickupID",
    "Business",
    "Branch",
    "Receiver",
    "Phone",
    "Address",
    "Email",
    "LiveLocation",
    "WeigntDimension",
    "ProductValue",
    "CODAmount",
    "PickupCharge",
    "Deliverycharge",
    "CODReceived",
    "PaymentReceived",
    "Balance",
    "DeliveryStatus",
  ];

  const showColumDataValue = row.filter((value) => {
    if (state[value]) {
      return value;
    }
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const userDeliveryHistoryResponseInfo = useGetUserDeliveryDataQuery();
  useEffect(() => {
    userDeliveryHistoryResponseInfo.refetch();
  }, []);

  return (
    <>
      {userDeliveryHistoryResponseInfo.isLoading && <Loading />}
      {userDeliveryHistoryResponseInfo?.data?.length !== 0 ? (
        <div className="userAdmin-Deliveryhistory">
          <DailogComp
            dailogHandeller={customizeTableHandeller}
            open={customizeTable}
            title="Add New Column"
          >
            <div className="userAdmin-Deliveryhistory_customizetable">
              {row.map((value) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state[value]}
                        onChange={handleChange}
                        name={value}
                        style={{ padding: "0px" }}
                      />
                    }
                    label={value}
                  />
                );
              })}
              <div className="userAdmin-Deliveryhistory_customizetable_button">
                <PrimaryButton onClick={customizeTableHandeller}>
                  Save
                </PrimaryButton>
                <SecondaryButton onClick={customizeTableHandeller}>
                  Cancel
                </SecondaryButton>
              </div>
            </div>
          </DailogComp>
          <div className="userAdmin--header">
            <h2>Delivery History</h2>
            <div className="userAdmin--header_buttonGroup">
              <Link to="/deliveryhistory/requestdeliveryform">
                <PrimaryButton>Request delivery</PrimaryButton>
              </Link>
              <TersaryButton
                onClick={customizeTableHandeller}
                endIcon={<BiCustomize />}
              >
                Customize table
              </TersaryButton>
              <TersaryButton>
                <input
                  type="month"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </TersaryButton>
            </div>
          </div>
          <div className="userAdmin-Deliveryhistory-table">
            <div className="userAdmin-Deliveryhistory-table-top">
              <div className="userAdmin-Deliveryhistory-table-top_left">
                <AiOutlineSearch />
                <input type="text" placeholder="Search Branch, Order ID.." />
              </div>
              <div className="userAdmin-Deliveryhistory-table-top_right">
                <button className="userAdmin-Deliveryhistory-table-top_right_sortbutton sortbuttonone">
                  Sort By
                </button>

                {/* <MenuComp userDeliveryHistorySortBranch> */}
                <button className="userAdmin-Deliveryhistory-table-top_right_sortbutton">
                  <span> Branch</span> <IoIosArrowDown />
                </button>
                {/* </MenuComp> */}
                {/* <MenuComp userDeliveryHistorySortStatus> */}
                <button className="userAdmin-Deliveryhistory-table-top_right_sortbutton">
                  <span> Delivery Status</span>
                  <IoIosArrowDown />
                </button>
                {/* </MenuComp> */}
                {/* <MenuComp userDeliveryHistorySortBusinessType> */}
                <button className="userAdmin-Deliveryhistory-table-top_right_sortbutton">
                  <span> Business Type</span>
                  <IoIosArrowDown />
                </button>
                {/* </MenuComp> */}
              </div>
            </div>
            <div className="userAdmin-Deliveryhistory-table-bottom">
              <UserDeliveryHistoryTabel
                tabelData={userDeliveryHistoryResponseInfo?.data?.results}
                columData={showColumDataValue.reverse()}
                onTableRowCLick="deliveryhistory"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>{/* <NothingToShow /> */}</div>
      )}
      {/* <NothingToShow /> */}
    </>
  );
};

export default DeliveryHistory;
