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
const SideNavbar = () => {
  const { pathname: location } = useLocation();
  return (
    <>
      <div className="adminNavigation">
        <AdminNavigationButton
          link="/dashboard"
          isActive={location === "/dashboard" && "true"}
          title="Dashboard"
        >
          <MdOutlineDashboard />
        </AdminNavigationButton>
        <AdminNavigationButton
          link="/deliveryhistory"
          isActive={location.includes("/deliveryhistory") && "true"}
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

        <AdminNavigationButton
          dropdown={location.includes("/business") && "true"}
          isActive={location.includes("/business") && "true"}
          title="Business"
          link="/business"
        >
          <MdOutlineBusinessCenter />
        </AdminNavigationButton>
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
