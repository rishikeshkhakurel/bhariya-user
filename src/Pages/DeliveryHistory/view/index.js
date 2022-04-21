import React, { useEffect, useRef, useState } from "react";
import { BiCustomize } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { Link } from "react-router-dom";
import PrimaryButton from "../../../common/Components/Button/PrimaryButton";
import TersaryButton from "../../../common/Components/Button/TersaryButton";
import SecondaryButton from "../../../common/Components/Button/SecondaryButton";
import Loading from "../../../common/Components/loading/LoadingComp";
import UserDeliveryHistoryTabel from "./UserDeliveryHistoryTabel";
import DailogComp from "../../../common/Components/Dailog/DailogComp";
import { useGetUserDeliveryDataQuery } from "../../../Redux/Services/FetchApi";
import MenuComp from "../../../common/Components/MenuComp";
import NothingToShow from "../../../common/Components/NothingToShow";
const DeliveryHistory = () => {
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
  const [rows, setRows] = useState();

  const requestSearch = (searchedVal) => {
    const filteredRows = userDeliveryHistoryResponseInfo?.data?.filter(
      (row) => {
        return (
          row.deliverybranch
            .toLowerCase()
            .includes(searchedVal.toLowerCase()) ||
          row?.business?.toLowerCase().includes(searchedVal.toLowerCase()) ||
          row?.deliverytime?.toLowerCase().includes(searchedVal.toLowerCase()) ||
          row?.deliveryto?.toLowerCase().includes(searchedVal.toLowerCase())
        );
      }
    );
    setRows(filteredRows);
  };

  const requestSearchBranch = (searchedVal) => {
    const filteredRows = userDeliveryHistoryResponseInfo?.data?.filter(
      (row) => {
        return row?.deliverybranch?.toLowerCase()
          .includes(searchedVal.toLowerCase());
      }
    );
    setRows(filteredRows);
  };

  const requestSearchBusiness = (searchedVal) => {
    const filteredRows = userDeliveryHistoryResponseInfo?.data?.filter(
      (row) => {
        return row?.business?.toLowerCase().includes(searchedVal.toLowerCase());
      }
    );
    setRows(filteredRows);
  };

  const requestSearchstatus = async (searchedVal) => {
    const filteredRows = await userDeliveryHistoryResponseInfo?.data?.filter(
      (row) => {
        return row?.order_status?.toLowerCase()
          .includes(searchedVal.toLowerCase());
      }
    );
    setRows(filteredRows);
  };
  useEffect(() => {
    userDeliveryHistoryResponseInfo.refetch();
  }, []);

  useEffect(() => {
    setRows(userDeliveryHistoryResponseInfo?.data);
  }, [userDeliveryHistoryResponseInfo]);

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  const orderby = useRef(1);
  const sorting = (data) => {
    if (orderby.current) {
      setRows(stableSort(rows, getComparator("asc", data)));
      orderby.current = false;
    } else {
      setRows(stableSort(rows, getComparator("desc", data)));
      orderby.current = true;
    }
  };

  return (
    <>
      {userDeliveryHistoryResponseInfo.isLoading && <Loading />}
      {userDeliveryHistoryResponseInfo?.data?.length >= 0 ? (
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
            <div
              className="usearch={requestSearchBranch}
                serAdmin--header_buttonGroup"
            >
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
                  onChange={(e) => requestSearch(e.target.value)}
                />
              </TersaryButton>
            </div>
          </div>
          <div className="userAdmin-Deliveryhistory-table">
            <div className="userAdmin-Deliveryhistory-table-top">
              <div className="userAdmin-Deliveryhistory-table-top_left">
                <AiOutlineSearch />
                <input
                  type="text"
                  onChange={(e) => requestSearch(e.target.value)}
                  placeholder="Search Branch, Order ID.."
                />
              </div>
              <div className="userAdmin-Deliveryhistory-table-top_right">
                <MenuComp
                  data={[
                    { label: "Business", value: "business" },
                    { label: "Date", value: "deliverytime" },
                  ]}
                  sorting
                  sortinglist={sorting}
                >
                  <button className="userAdmin-Deliveryhistory-table-top_right_sortbutton sortbuttonone">
                    <span> Sort By</span> <IoIosArrowDown />
                  </button>
                </MenuComp>

                {/* <MenuComp userDeliveryHistorySortBranch> */}
                <MenuComp BranchList search={requestSearchBranch}>
                  <button className="userAdmin-Deliveryhistory-table-top_right_sortbutton">
                    <span> Branch</span> <IoIosArrowDown />
                  </button>
                </MenuComp>
                {/* </MenuComp> */}
                {/* <MenuComp userDeliveryHistorySortStatus> */}
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
              <UserDeliveryHistoryTabel
                tabelData={rows}
                columData={showColumDataValue.reverse()}
                onTableRowCLick="deliveryhistory"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <NothingToShow />
        </div>
      )}
    </>
  );
};

export default DeliveryHistory;
