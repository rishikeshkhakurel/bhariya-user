import React from "react";
import {
  MdOutlineDashboard,
  MdDateRange,
  MdSystemUpdateAlt,
  MdOutlineBusinessCenter,
  MdPayment,
} from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useLocation } from "react-router-dom";
import AdminNavigationButton from "../../common/Components/AdminNavigationButton";
import { useGetBusinessFormQuery } from "../../Redux/Services/FetchApi";
import DynamicDropDownTabs from "../../common/Components/DynamicDropDownTabs";
const SideNavbar = () => {
  const { pathname: location } = useLocation();
  let business = [{name:"+ Business",id:""}];
  const getBusinessFormResponse = useGetBusinessFormQuery();
  if (getBusinessFormResponse.isSuccess) {
    for (let i = 0; i < getBusinessFormResponse.data.length; i++) {
      business.push({ name: getBusinessFormResponse.data[i].businessname, id:getBusinessFormResponse.data[i].id });
    }
  }
  console.log("location",location)
  return (
    <>
      <div className="adminNavigation">
        <AdminNavigationButton
          link="/dasboard"
          isActive={location === "/dashboard" && "true"}
          title="Dashboard"
        >
          <MdOutlineDashboard />
        </AdminNavigationButton>
        <AdminNavigationButton
          link="/deliveryhistory"
          isActive={location==="/deliveryhistory" && "true"}
          title="Delivery History"
        >
          <MdDateRange />
        </AdminNavigationButton>
        <AdminNavigationButton
          link="/recivingdetails"
          isActive={location.includes("/recivingdetails") && "true"}
          title="Reciving Details"
        >
          <MdSystemUpdateAlt />
        </AdminNavigationButton>

        <DynamicDropDownTabs
          isActive={location.includes("/business") && "true"}
          link="business"
          title="Business"
          dropdown={location.includes("/business") && "true"}
          arryOfList={business}
        >
          {/* <AdminNavigationButton
            dropdown={location.includes("/business") && "true"}
            isActive={location.includes("/business") && "true"}
            title="Business"
            link="/business"
          > */}
          <MdOutlineBusinessCenter />
          {/* </AdminNavigationButton> */}
        </DynamicDropDownTabs>
        <AdminNavigationButton
          isActive={location === "/payment" && "true"}
          title="Payment"
          link="/payment"
        >
          <MdPayment />
        </AdminNavigationButton>

        <AdminNavigationButton
          isActive={location === "/Setting" && "true"}
          title="Setting"
          link="/Setting"
        >
          <IoMdSettings />
        </AdminNavigationButton>
      </div>
    </>
  );
};

export default SideNavbar;
