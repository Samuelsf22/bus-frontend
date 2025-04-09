import { api } from "@/redux/api/api";

const busApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBuses: builder.query({
      query: ({ page, size }) => ({
        url: `/bus?page=${page}&size=${size}`,
        method: "GET",
      }),
    }),
    getBusById: builder.query({
      query: (id) => ({
        url: `/bus/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBusesQuery, useGetBusByIdQuery } = busApi;
