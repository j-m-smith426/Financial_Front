import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axios/axiosConfig";

export const billApi = createApi({
    reducerPath: 'billApi',
    baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    tagTypes: ["Bill"],
    endpoints: (builder) => ({
        getBillById: builder.query({
            query: (id) => ({ url: `${id}`, method: 'get' }),
        }),
        getBillsByDate: builder.query({
            query: (duration) => ({ url: 'duration', method: 'post', data: { begin: duration[0], end: duration[1] } }),
            providesTags: ['Bill']
        }),
        saveBill: builder.mutation({
            query: (bill) => ({
                url: 'save',
                method: 'POST',
                data: bill
            }),
            invalidatesTags: ['Bill']
        }),
        updateBill: builder.mutation({
            query: (bill) => ({
                url: 'update',
                method: 'PUT',
                data: bill
            }),
            invalidatesTags: ['Bill']
        }),
        deleteBill: builder.mutation({
            query: (id) => ({
                url: `delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Bill']
        })
    })
});

export const { useGetBillByIdQuery, useDeleteBillMutation, useSaveBillMutation, useUpdateBillMutation, useGetBillsByDateQuery } = billApi;
