import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { changingId, changingRole } from "../../Redux/Services/authSlice";
import { useOnLogoutMutation } from "../../Redux/Services/FetchApi";
import Header from "./Header";
import SideNavbar from "./SideNavbar";

const BodyWrapper = () => {
  const [logout, LogOutResponse] = useOnLogoutMutation();
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.authentiaction.userid);
  const changeRoleOfTheUser = (role) => {
    dispatch(changingRole(role));
    logout();

    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    if (localStorage.getItem("userid")) {
      localStorage.removeItem("userid");
    }
    if (localStorage.getItem("hash")) {
      localStorage.removeItem("hash");
    }
    if (localStorage.getItem("userState")) {
      localStorage.removeItem("userState");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userRole")) {
      dispatch(changingRole(localStorage.getItem("userRole")));
    }
    if (localStorage.getItem("userid")) {
      dispatch(changingId(localStorage.getItem("userid")));
    }
  }, [userid]);
  return (
    <div className="userAdmin">
      <Header changeRole={changeRoleOfTheUser} />
      <div className="userAdmin-body">
        <div className="userAdminResponsive">
          {/* <ResponsiveHambuger /> */}
        </div>
        <div className="userAdmin-body-left">
          <SideNavbar />
        </div>
        <div className="userAdmin-body-right">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BodyWrapper;
