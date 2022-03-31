// import { useEffect, useState } from "react";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Loading from "./common/Components/loading/LoadingComp";
import BodyWrapper from "./Components/Body-Wrapper";
import UserBusiness from "./Pages/Business/view";
import BusinessDetails from "./Pages/Business/view/BusinessDetails";
import DeliveryHistory from "./Pages/DeliveryHistory/view";
import UserSummary from "./Pages/DeliveryHistory/view/UserSummary";
import DeliveryRequest from "./Pages/DeliveryRequest/view";
import BulkTabel from "./Pages/DeliveryRequest/view/BulkTabel";
import RequestDeliveryForm from "./Pages/DeliveryRequest/view/RequestDelivery";
import RequestDeliveryFormEdit from "./Pages/DeliveryRequest/view/RequestDeliveryFormEdit";
import UserLoginPage from "./Pages/Login/view";
import Payment from "./Pages/Payment/view";
import UserRecivingDetails from "./Pages/RecivingDetails/view";
import RecivingPreviewPage from "./Pages/RecivingDetails/view/RecivingPreviewPage";
import Settings from "./Pages/Setting/view";
import Vechicle from "./Pages/Vechicle/view";
import { changingId, changingRole } from "./Redux/Services/authSlice";
import "./Styles/Main.scss";

function App() {
  const navigation=useNavigate()
  const location=useLocation()
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

  useEffect(()=>{
    if(location.pathname==="/"){
      navigation("/dashboard")
    }
  },[])

  return (
    <>
        {userState === "user" ? (
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<BodyWrapper />}>
                {/* <Navigate to="/dashboard"/> */}
                <Route
                  path="/dashboard"
                  element={<DashBoard />}
                  logout={changeRoleOfTheUser}
                />

                <Route path="/deliveryrequest" element={<DeliveryRequest />} />

                <Route path="/deliveryhistory" element={<DeliveryHistory />} />

                <Route path="/deliveryhistory/:id" element={<UserSummary />} />

                <Route path="/payment" element={<Payment />} />

                <Route path="/business" element={<UserBusiness />} />

                <Route path="/business/:id" element={<BusinessDetails />} />

                <Route path="/vechiclelisting" element={<Vechicle />} />

                <Route
                  path="/recivingdetails"
                  element={<UserRecivingDetails />}
                />
                <Route
                  path="/recivingdetails/:id"
                  element={<RecivingPreviewPage />}
                />

                <Route
                  path="/deliveryhistory/requestdeliveryform"
                  element={<RequestDeliveryForm />}
                />

                <Route
                  path="/deliveryhistory/requestdeliveryform/:id"
                  element={<RequestDeliveryFormEdit />}
                />

                <Route
                  path="/deliveryhistory/requestdeliveryform/bulktabel"
                  element={<BulkTabel />}
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
    </>
  );
}

export default App;
