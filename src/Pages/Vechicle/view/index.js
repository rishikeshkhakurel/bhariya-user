import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import PaymentTable from "./VechicleTabel";
// import MenuComp from "../../../common/Components/MenuComp";
const Vechicle = () => {
  return (
    <div className="userAdmin-Deliveryhistory">
      <div className="userAdmin--header">
        <h2>Vechicle Listing </h2>
      </div>
      <div className="userAdmin-Deliveryhistory-table">
        <div className="userAdmin-Deliveryhistory-table-top">
          <div className="userAdmin-Deliveryhistory-table-top_left">
            <AiOutlineSearch />
            <input type="text" placeholder="Search Vechicle .." />
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
          <PaymentTable onTableRowCLick="RecivingDetails" />
        </div>
      </div>
    </div>
  );
};

export default Vechicle;
