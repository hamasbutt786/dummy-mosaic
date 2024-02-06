import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const base = 'https://dev.api.mosaica.io/';
export const projectData = createApi({
  reducerPath: "projectData",
  baseQuery: fetchBaseQuery({
    baseUrl: base,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("Auth");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      // headers.set("ngrok-skip-browser-warning", "any");
      return headers;
    },
  }),
  tagTypes: [
    "user",
    "percentageVerification",
    "RawMaterialsDataGet",
    "RawMaterialsDataGetAll",
    "facilityCountry",
    "supplierDetails",
    "SupplyChainFacilityLatest",
    "summary",
    "bccus",
    "login",
  ],
  endpoints: (builder) => ({
    //SignUp
    registerUsers: builder.mutation({
      query: (users) => ({
        url: "/users",
        method: "POST",
        body: users,
      }),
      invalidatesTags: ["user"],
    }),

    //Summary
    getSummary: builder.query({
      query: ({ params, businessId }) => ({
        url: `calculation/welcome-screen/${businessId}?startDate=2021-01-01&endDate=2024-01-01&skip=0&take=100000`,
        // params,
      }),
      providesTags: ["summary"],
    }),
    //Summary Timeline
    getSummaryTimeline: builder.query({
      query: () => ({
        url: `/po-data/timeline`,
      }),
      providesTags: ["percentageVerification"],
    }),
    //Summary Line Chart
    getSummaryLine: builder.query({
      query: () => ({
        url: `/transaction-certificates/yearOnYearProgress`,
      }),
      providesTags: ["percentageVerification"],
    }),
    //Summary Dot Map
    getSummaryDopMap: builder.query({
      query: () => ({
        url: `/transaction-certificates/findExpiredSellerInFacilityCountry`,
      }),
      providesTags: ["percentageVerification"],
    }),
    //Summary materail Group Percentage
    getSummaryMaterialGroupPercentage: builder.query({
      query: () => ({
        url: `/materialgroup/coreMaterialsPercentage`,
      }),
      providesTags: ["percentageVerification"],
    }),
    //Summary Facilities by Certification Status
    getSummaryFacilityCount: builder.query({
      query: () => ({
        url: `/scope-certificates/getCertificateStatusCounts`,
      }),
      providesTags: ["percentageVerification"],
    }),
    //RawMaterial screen endpoint
    getRawMaterialData: builder.query({
      query: ({ params, businessId }) => ({
        url: `/calculation/${businessId}`,
        params,
      }),
      providesTags: ["RawMaterialsDataGet"],
    }),
    getSellerFacilityCountry: builder.query({
      query: () => ({
        url: `/transaction-certificates/findSellerInFacilityCountry`,
      }),
      providesTags: ["facilityCountry"],
    }),

    //Scope Certificates update
    getScopeCertifiedfacility: builder.query({
      query: (params) => ({
        url: `/scope-certificates/scopeCertifiedFacilitiesList`,
        // url: `/scope-certificates/scopeDatalist`,
        params,
      }),
      providesTags: ["facilityCountry"],
    }),

    //transection Material
    getTransectionMaterial: builder.query({
      query: ({ params, businessId }) => ({
        // url: `/transaction-certificates/materialTransactionListTimeLine`,
        url: `/calculation/material-transaction/${businessId}`,
        params,
      }),
      providesTags: ["facilityCountry"],
    }),
    //Supplier Map
    getSupplierDetails: builder.query({
      query: ({ params, businessId }) => ({
        url: `/calculation/supplier-map/${businessId}`,
        params,
      }),
      providesTags: ["supplierDetails"],
    }),

    //scope certificates latest upper filteration
    getSupplyChainFacilityLatest: builder.query({
      query: ({ params, businessId }) => ({
        url: `/calculation/scope-certificate/${businessId}`,
        // url: `/scope-certificates/scopeData`,
        params,
      }),
      providesTags: ["SupplyChainFacilityLatest"],
    }),

    //Bccus Data
    getBccusRecieved: builder.query({
      query: ({ params, businessId }) => ({
        url: `/calculation/bccu-report/${businessId}`,
        params,
      }),
      providesTags: ["bccus"],
    }),
    login: builder.mutation({
      query: (payload) => ({
        // url: "/users/login ",
        url: "/users/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["login"],
    }),
    createVerifyClientId: builder.mutation({
      query: (payload) => ({
        url: "/users/validateClientId",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useRegisterUsersMutation,
  useGetSummaryQuery,
  useGetSummaryTimelineQuery,
  useGetSummaryLineQuery,
  useGetSupplierDetailsQuery,
  useLazyGetSupplierDetailsQuery,
  useLazyGetRawMaterialDataQuery,
  useGetRawMaterialDataQuery,
  useGetSellerFacilityCountryQuery,
  useGetSummaryDopMapQuery,
  useGetSummaryMaterialGroupPercentageQuery,
  useGetSummaryFacilityCountQuery,
  useLazyGetScopeCertifiedfacilityQuery,
  // useLazyGetScopeCertifiedfacilityMapQuery,
  useLazyGetTransectionMaterialQuery,
  useGetTransectionMaterialQuery,
  useLazyGetSupplyChainFacilityLatestQuery,
  useLazyGetBccusRecievedQuery,
  useGetSupplyChainFacilityLatestQuery,
  useLoginMutation,
  useCreateVerifyClientIdMutation
} = projectData;