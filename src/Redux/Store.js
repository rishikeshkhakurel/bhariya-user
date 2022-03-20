import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { FetchApis } from "./Services/FetchApi";
import authReducer from "./Services/authSlice";
// import { superAdminServicesApis } from "../services/superadminservices/superadminservices";
// import { authentictionApis } from "../services/userServices/Authentication";
// import { businessApis } from "../services/userServices/BusinessServicess";
// import { deliveryHistoryApis } from "../services/userServices/DeliveryHistory";
// import { homepageservicesApis } from "../services/userServices/HomepageServices";
// import { userPaymentAPis } from "../services/userServices/PaymentServices";
// import { userSettingServicesApis } from "../services/userServices/UserSettingServices";
export const store = configureStore({
  reducer: {
      authentiaction: authReducer,
    //   [authentictionApis.reducerPath]: authentictionApis.reducer,
    [FetchApis.reducerPath]: FetchApis.reducer,
    //   [homepageservicesApis.reducerPath]: homepageservicesApis.reducer,
    //   [businessApis.reducerPath]: businessApis.reducer,
    //   [userSettingServicesApis.reducerPath]: userSettingServicesApis.reducer,
    //   [userPaymentAPis.reducerPath]: userPaymentAPis.reducer,
    //   [superAdminServicesApis.reducerPath]: superAdminServicesApis.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      //     authentictionApis.middleware,
      FetchApis.middleware
      //     homepageservicesApis.middleware,
      //     businessApis.middleware,
      //     userSettingServicesApis.middleware,
      //     userPaymentAPis.middleware,
      //     superAdminServicesApis.middleware
    ),
});

setupListeners(store.dispatch);
