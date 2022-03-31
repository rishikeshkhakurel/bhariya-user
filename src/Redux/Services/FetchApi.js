import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import baseUrl from "../../common/utils/baseUrl";

export const FetchApis = createApi({
  reducerPath: "deliveryhistoryApis",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["deliveryHistory", "pendingorders"],
  endpoints: (builder) => ({
    getUserDeliveryData: builder.query({
      query: (userid) => {
        return {
          url: `postcreate/`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: ["deliveryHistory"],
    }),
    getAddPaymentCustomer: builder.query({
      query: () => {
        return {
          url: "addpaycustomer/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: ["pendingorders"],
    }),
    getPaymentMethod: builder.query({
      query: (value) => {
        return {
          url: "payoutoption/",
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: ["payment"],
    }),
    addPaymentMethod: builder.mutation({
      query: (value) => {
        return {
          url: "payoutoption/",
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: value,
        };
      },
      invalidatesTags: ["payment"],
    }),
    sendbulkdata: builder.mutation({
      query: (value) => {
        return {
          url: "csvfileupload/",
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: value,
        };
      },
      invalidatesTags: ["deliveryHistory"],
    }),
    sendRequestDeliveryForm: builder.mutation({
      query: (value) => {
        return {
          url: "postcreate/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: value,
        };
      },
      invalidatesTags: ["deliveryHistory"],
    }),
    getBusinessForm: builder.query({
      query: () => {
        return {
          url: "businessform/",
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: ["business"],
    }),
    getBranchDetails: builder.query({
      query: (value) => {
        return {
          url: "branchform/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    getuserSetting: builder.query({
      query: () => {
        return {
          url: "userdetail/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: ["userdetail"],
    }),
    setSearchUser: builder.query({
      query: (data) => {
        return {
          url: `search/?search=${data}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    getRecivingDetails: builder.query({
      query: () => {
        return {
          url: "recievingdetail/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    assigneToRider: builder.mutation({
      query: (data) => {
        return {
          url: `assignto/`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: data,
        };
      },
      invalidatesTags: ["pendingorders"],
    }),
    getRiderDetails: builder.query({
      query: () => {
        return {
          url: "riderdetail/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: ["rider"],
    }),
    setUserSettings: builder.mutation({
      query: (value) => {
        const { id, data } = value;
        return {
          url: `userdetail/${id}/`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: data,
        };
      },
      invalidatesTags: ["userdetail"],
    }),
    changePasswordUser: builder.mutation({
      query: (data) => {
        return {
          url: "changepassword/",
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: data,
        };
      },
      invalidatesTags: ["userdetail"],
    }),
    addBusinessForm: builder.mutation({
      query: (value) => {
        return {
          url: "businessform/",
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: value,
        };
      },
      invalidatesTags: ["business"],
    }),
    login: builder.mutation({
      query: (value) => {
        return {
          url: "login/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: value,
        };
      },
    }),
    patchEnteredValue: builder.mutation({
      query: (value) => {
        const { id, data } = value;
        return {
          url: `saveasdraft/${id}/`,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: data,
        };
      },
    }),
    getsaveasdraft: builder.query({
      query: () => {
        return {
          url: "saveasdraft/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    saveasdraft: builder.mutation({
      query: (value) => {
        return {
          url: "saveasdraft/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: value,
        };
      },
    }),
    deletesaveasdraftbyid: builder.mutation({
      query: (id) => {
        return {
          url: `saveasdraft/${id}/`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),
    onConfirmDelivey: builder.mutation({
      query: (value) => {
        return {
          url: `confirmalldraft/`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: value,
        };
      },
    }),
    getDeliveryHistoryDataByid: builder.query({
      query: (userId) => {
        return {
          url: `/postrude/${userId}/`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: ["deliveryHistory"],
    }),
    updateDeliveryHistoryDataByid: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/postrude/${id}/`,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: data,
        };
      },
      invalidatesTags: ["deliveryHistory"],
    }),
    getDeliveryNotes: builder.query({
      query: () => {
        return {
          url: `internalnote/`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: ["deliveryHistory"],
    }),
    addDeliveryNote: builder.mutation({
      query: (data) => {
        return {
          url: `internalnote/`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: data,
        };
      },
      invalidatesTags: ["deliveryHistory"],
    }),
    postDeliveryComment: builder.mutation({
      query: (data) => {
        return {
          url: `externalnote/`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: data,
        };
      },
      invalidatesTags: ["deliveryHistory"],
    }),
    getBusinessFormById: builder.query({
      query: (id) => {
        return {
          url: `businessform/${id}/`,
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: ["business"],
    }),
    getPendingPayment: builder.query({
      query: (id) => {
        return {
          url: `userpending/`,
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: ["business"],
    }),
    getPaymentHistory: builder.query({
      query: (id) => {
        return {
          url: `userhistory/`,
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: ["business"],
    }),
    updateBusinessFormById: builder.mutation({
      query: (value) => {
        const { id, data } = value;
        return {
          url: `businessform/${id}/`,
          method: "PATCH",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: data,
        };
      },
      invalidatesTags: ["business"],
    }),
  }),
});

export const {
  useGetUserDeliveryDataQuery,
  useGetAddPaymentCustomerQuery,
  useGetPaymentMethodQuery,
  useAddPaymentMethodMutation,
  useSendbulkdataMutation,
  useSendRequestDeliveryFormMutation,
  useGetBusinessFormQuery,
  useGetBranchDetailsQuery,
  useGetuserSettingQuery,
  useSetUserSettingsMutation,
  useSetSearchUserQuery,
  useGetRecivingDetailsQuery,
  useAssigneToRiderMutation,
  useGetRiderDetailsQuery,
  useChangePasswordUserMutation,
  useAddBusinessFormMutation,
  useLoginMutation,
  usePatchEnteredValueMutation,
  useGetsaveasdraftQuery,
  useSaveasdraftMutation,
  useDeletesaveasdraftbyidMutation,
  useOnConfirmDeliveyMutation,
  useGetDeliveryHistoryDataByidQuery,
  useUpdateDeliveryHistoryDataByidMutation,
  useGetDeliveryNotesQuery,
  useAddDeliveryNoteMutation,
  usePostDeliveryCommentMutation,
  useGetBusinessFormByIdQuery,
  useUpdateBusinessFormByIdMutation,
  useGetPendingPaymentQuery,
  useGetPaymentHistoryQuery,
} = FetchApis;
