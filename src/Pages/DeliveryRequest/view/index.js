import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import DeliveryTable from "./DeliveryTabel";
// import MenuComp from "../../../common/Components/MenuComp";
const DeliveryRequest = () => {
  return (
    <div className="userAdmin-Deliveryhistory">
      <div className="userAdmin--header">
        <h2>Delivery Request </h2>
      </div>
      <div className="userAdmin-Deliveryhistory-table">
        <div className="userAdmin-Deliveryhistory-table-top">
          <div className="userAdmin-Deliveryhistory-table-top_left">
            <AiOutlineSearch />
            <input type="text" placeholder="Search Delivery Request.." />
          </div>
          <div className="userAdmin-Deliveryhistory-table-top_right">
            <button
              style={{ marginRight: "10px" }}
              className="userAdmin-Deliveryhistory-table-top_right_sortbutton sortbuttonone"
            >
              Sort By
            </button>
            {/* <MenuComp> */}
              <button className="userAdmin-Deliveryhistory-table-top_right_sortbutton">
                <span> Assigned To </span> <IoIosArrowDown />
              </button>
            {/* </MenuComp> */}
            {/* <MenuComp> */}
              <button className="userAdmin-Deliveryhistory-table-top_right_sortbutton">
                <span> Recive From</span>
                <IoIosArrowDown />
              </button>
            {/* </MenuComp> */}
            {/* <MenuComp> */}
              <button className="userAdmin-Deliveryhistory-table-top_right_sortbutton">
                <span> Send To</span>
                <IoIosArrowDown />
              </button>
            {/* </MenuComp> */}
          </div>
        </div>
        <div className="branchDeliveryPending__nav">
          <DeliveryTable onTableRowCLick="RecivingDetails" />
        </div>
      </div>
    </div>
  );
};

export default DeliveryRequest;
