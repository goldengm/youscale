import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ClientOrderModel, GetClientOrderModel, PatchClientOrderModel, ProductOrder, OrderQueryModel } from '../../../models'
import { CLIENT_ORDER_URL } from '../../url/API_URL'

const token =  localStorage.getItem('token')

export const ClientOrderApi = createApi({
    reducerPath: 'ClientOrderApi',
    baseQuery: fetchBaseQuery({baseUrl: CLIENT_ORDER_URL}),
    endpoints: (builder) =>({
        getClientOrder : builder.query<{code: Number, data:GetClientOrderModel[], order: {id: number, id_city: number, id_team: number, Product_Orders: ProductOrder[], createdAt: Date, SheetId: string, reportedDate: string, isSendLivo: string}[]}, OrderQueryModel>({
            query:(arg) => ({
                method: 'GET',
                url: '/',
                headers: { Authorization: `Bear ${token}` },
                params: arg
            })
        }),

        getSheetOrder : builder.query<{}, void>({
            query:() => ({
                method: 'GET',
                url: '/sheet',
                headers: { Authorization: `Bear ${token}` }
            })
        }),
        
        addClientOrder : builder.mutation<void, ClientOrderModel>({
            query : (data: ClientOrderModel) => ({
                method : 'POST',
                url : '/',
                body : data,
                headers: { Authorization: `Bear ${token}` },
            })
        }),

        patchClientOrder : builder.mutation<void, PatchClientOrderModel>({
            query : (data: PatchClientOrderModel) => ({
                method : 'PATCH',
                url : `/${data.id}`,
                body : data,
                headers: { Authorization: `Bear ${token}` },
            })
        }),

        deleteClientOrder : builder.mutation<void, any>({
            query : (id: any) => ({
                method : 'DELETE',
                url : `/${id}`,
                headers: { Authorization: `Bear ${token}` },
            })
        }),

        getClientOrderExportModel : builder.query<{code: Number, data:{}[], header: {label: string, key: string}[]}, {id_orders: string}>({
            query:(arg) => ({
                method: 'GET',
                url: '/export',
                headers: { Authorization: `Bear ${token}` },
                params: arg
            })
        }),

        getOrderHistory : builder.query<{code: Number, data:{message: string, createdAt: string}[]}, {id_order: string}>({
            query:(arg) => ({
                method: 'GET',
                url: '/history',
                headers: { Authorization: `Bear ${token}` },
                params: arg
            })
        }),

    })
})

export const { useAddClientOrderMutation, useGetClientOrderQuery, useDeleteClientOrderMutation, usePatchClientOrderMutation, useGetClientOrderExportModelQuery, useGetSheetOrderQuery, useGetOrderHistoryQuery }  = ClientOrderApi;