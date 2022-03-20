// import { useEffect, useState } from "react";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loading from "./common/Components/loading/LoadingComp";
import BodyWrapper from "./Components/Body-Wrapper";
import UserBusiness from "./Pages/Business/view";
import DeliveryHistory from "./Pages/DeliveryHistory/view";
import DeliveryRequest from "./Pages/DeliveryRequest/view";
import RequestDeliveryForm from "./Pages/DeliveryRequest/view/RequestDelivery";
import UserLoginPage from "./Pages/Login/view";
import Payment from "./Pages/Payment/view";
import UserRecivingDetails from "./Pages/RecivingDetails/view";
import Settings from "./Pages/Setting/view";
import Vechicle from "./Pages/Vechicle/view";
import { changingId, changingRole } from "./Redux/Services/authSlice";
import "./Styles/Main.scss";

function App() {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.authentiaction.userid);
  const changeRoleOfTheUser = (role) => {
    dispatch(changingRole(role));
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

  const userState = useSelector((state) => state.authentiaction.role);

  if (userState === "user") {
    document.title = "Bhariya User";
  }

  const DashBoard = React.lazy(() => import("./Pages/Dashboard/view"));

  return (
    <>
      <BrowserRouter>
        {userState === "user" ? (
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<BodyWrapper />}>
                <Route
                  path="/dashboard"
                  element={<DashBoard />}
                  logout={changeRoleOfTheUser}
                />

                <Route path="/deliveryrequest" element={<DeliveryRequest />} />

                <Route path="/deliveryhistory" element={<DeliveryHistory />} />

                <Route path="/payment" element={<Payment />} />

                <Route path="/business" element={<UserBusiness />} />

                <Route path="/vechiclelisting" element={<Vechicle />} />

                <Route
                  path="/recivingdetails"
                  element={<UserRecivingDetails />}
                />

                <Route
                  path="/deliveryhistory/requestdeliveryform"
                  element={<RequestDeliveryForm />}
                />

                <Route path="/setting" element={<Settings />} />

                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Route>
            </Routes>
          </Suspense>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={<UserLoginPage changeRole={changeRoleOfTheUser} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
