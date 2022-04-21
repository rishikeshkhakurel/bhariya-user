import React, { useEffect, useState } from "react";
import { BiCustomize } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetRecivingDetailsQuery } from "../../../Redux/Services/FetchApi";
import Loading from "../../../common/Components/loading/LoadingComp";
import DailogComp from "../../../common/Components/Dailog/DailogComp";
import PrimaryButton from "../../../common/Components/Button/PrimaryButton";
import SecondaryButton from "../../../common/Components/Button/SecondaryButton";
import TersaryButton from "../../../common/Components/Button/TersaryButton";
import MenuComp from "../../../common/Components/MenuComp";
import NothingToShow from "../../../common/Components/NothingToShow";
import UserRecivingTabel from "./UserRecivingTabel";
const UserRecivingDetails = () => {
  const [filterDate, setFilterDate] = React.useState("2021-01");
  const [customizeTable, setCustomizeTable] = useState(false);
  const customizeTableHandeller = () => {
    setCustomizeTable(!customizeTable);
  };

  const [state, setState] = React.useState({
    Sn: true,
    OrderId: true,
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

  const usersId = useSelector((state) => state.authentiaction.userid);
  const [userdeliveryData, setuserdeliveryData] = useState();
  const userDeliveryHistoryResponseInfo = useGetRecivingDetailsQuery();
  const [rows, setRows] = useState();

  useEffect(()=>{
    setRows(userDeliveryHistoryResponseInfo?.data)
  },[userDeliveryHistoryResponseInfo.isSuccess])

  const requestSearch = async (searchedVal) => {
    const filteredRows = await userDeliveryHistoryResponseInfo?.data?.filter(
      (row) => {
        return (
          row.deliverybranch
            .toLowerCase()
            .includes(searchedVal.toLowerCase()) ||
          row.business.toLowerCase().includes(searchedVal.toLowerCase()) ||
          row.deliveryto.toLowerCase().includes(searchedVal.toLowerCase())
        );
      }
    );
    setRows(filteredRows);
  };

  const requestSearchBranch = (searchedVal) => {
    const filteredRows = userDeliveryHistoryResponseInfo?.data?.filter(
      (row) => {
        return row.deliverybranch
          .toLowerCase()
          .includes(searchedVal.toLowerCase());
      }
    );
    setRows(filteredRows);
  };

  const requestSearchBusiness = (searchedVal) => {
    const filteredRows = userDeliveryHistoryResponseInfo?.data?.filter(
      (row) => {
        return row.business.toLowerCase().includes(searchedVal.toLowerCase());
      }
    );
    setRows(filteredRows);
  };
  const requestSearchstatus = async (searchedVal) => {
    const filteredRows = await userDeliveryHistoryResponseInfo?.data?.filter(
      (row) => {
        return row.order_status
          .toLowerCase()
          .includes(searchedVal.toLowerCase());
      }
    );
    setRows(filteredRows);
  };
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
            <h2>Reciving Details</h2>
            <div className="userAdmin--header_buttonGroup">
              <Link to="/deliveryhistory/requestdeliveryform">
                <PrimaryButton>Request Recive</PrimaryButton>
              </Link>
              <TersaryButton
                onClick={customizeTableHandeller}
                endIcon={<BiCustomize />}
              >
                Customize table
              </TersaryButton>
            </div>
          </div>
          <div className="userAdmin-Deliveryhistory-table">
            <div className="userAdmin-Deliveryhistory-table-top">
              <div className="userAdmin-Deliveryhistory-table-top_left">
                <AiOutlineSearch />
                <input
                  type="text"
                  onChange={(e) => {
                    requestSearch(e.target.value);
                  }}
                  placeholder="Search Branch, Order ID.."
                />
              </div>
              <div className="userAdmin-Deliveryhistory-table-top_right">
                <MenuComp
                  userDeliveryHistorySortBranch
                >
                  <button className="userAdmin-Deliveryhistory-table-top_right_sortbutton sortbuttonone">
                    <span> Sort By</span> <IoIosArrowDown />
                  </button>
                </MenuComp>

                <MenuComp BranchList search={requestSearchBranch}>
                  <button className="userAdmin-Deliveryhistory-table-top_right_sortbutton">
                    <span> Branch</span> <IoIosArrowDown />
                  </button>
                </MenuComp>
                <MenuComp
                  userDeliveryHistorySortStatus
                  search={requestSearchstatus}
                >
                  <button className="userAdmin-Deliveryhistory-table-top_right_sortbutton">
                    <span> Delivery Status</span>
                    <IoIosArrowDown />
                  </button>
                </MenuComp>
                <MenuComp
                  userDeliveryHistorySortBusinessType
                  search={requestSearchBusiness}
                >
                  <button className="userAdmin-Deliveryhistory-table-top_right_sortbutton">
                    <span> Business Type</span>
                    <IoIosArrowDown />
                  </button>
                </MenuComp>
              </div>
            </div>
            <div className="userAdmin-Deliveryhistory-table-bottom">
              <UserRecivingTabel
                tabelData={rows}
                columData={showColumDataValue.reverse()}
                onTableRowCLick="recivingdetails"
              />
            </div>
          </div>
        </div>
      ) : (
        <NothingToShow />
      )}
      {/* <NothingToShow /> */}
    </>
  );
};

export default UserRecivingDetails;
