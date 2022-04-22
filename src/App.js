// import { useEffect, useState } from "react";
import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Loading from "./common/Components/loading/LoadingComp";
import SapRoutes from "./common/Components/SapRoute";
import UserLoginPage from "./Pages/Login/view";
import { changingId, changingRole } from "./Redux/Services/authSlice";
import "./Styles/Main.scss";

function App() {
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  //see if user id exist in backend or not and if not remove credentials from localstorage
  const userid = useSelector((state) => state.authentiaction.userid);
  const changeRoleOfTheUser = (role) => {
    dispatch(changingRole(role));
    localStorage.clear();
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

  //changing title to Bhariya user if logged in else to bhariya
  if (userState === "user") {
    document.title = "Bhariya User";
  } else {
    document.title = "Bhariya";
  }

  //code splitting import
  const BodyWrapper = SapRoutes(lazy(() => import("./Components/Body-Wrapper")))

  const DashBoard = SapRoutes(lazy(() => import("./Pages/Dashboard/view")))

  const DeliveryHistory = SapRoutes(lazy(() =>
    import("./Pages/DeliveryHistory/view")
  ))

  const DeliveryById = SapRoutes(lazy(() =>
    import("./Pages/DeliveryHistory/view/DeliveryById")
  ))

  const UserRecivingDetails = SapRoutes(lazy(() =>
    import("./Pages/RecivingDetails/view")
  ))

  const UserBusiness = SapRoutes(lazy(() => import("./Pages/Business/view")))

  const BusinessDetails = SapRoutes(lazy(() =>
    import("./Pages/Business/view/BusinessDetails")
  ))

  const Payment = SapRoutes(lazy(() => import("./Pages/Payment/view")))

  // const RecivingPreviewPage = SapRoutes(lazy(() =>
  //   import("./Pages/RecivingDetails/view/RecivingPreviewPage")
  // ))

  const RequestDeliveryForm = SapRoutes(lazy(() =>
    import("./Pages/DeliveryRequest/view/RequestDelivery")
  ))

  const RequestDeliveryFormEdit = SapRoutes(lazy(() =>
    import("./Pages/DeliveryRequest/view/RequestDeliveryFormEdit")
  ))

  const BulkTabel = SapRoutes(lazy(() =>
    import("./Pages/DeliveryRequest/view/BulkTabel")
  ))

  const Settings = SapRoutes(lazy(() => import("./Pages/Setting/view")))

  //navigate to dashboard if it is in /
  useEffect(() => {
    if (location.pathname === "/") {
      navigation("/dashboard");
    }
  }, []);

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

              <Route path="/deliveryhistory" element={<DeliveryHistory />} />

              <Route path="/deliveryhistory/:id" element={<DeliveryById />} />

              <Route
                path="/recivingdetails"
                element={<UserRecivingDetails />}
              />

              <Route
                path="/recivingdetails/:id"
                element={<DeliveryById />}
              />

              <Route path="/business" element={<UserBusiness />} />

              <Route path="/business/:id" element={<BusinessDetails />} />

              {/* <Route path="/vechiclelisting" element={<Vechicle />} /> */}
              {/* <Route path="/deliveryrequest" element={<DeliveryRequest />} /> */}

              <Route path="/payment" element={<Payment />} />

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
