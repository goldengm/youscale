import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ShippingModel, ShippingCitiesModel } from '../../../models'
import { CLIENT_SHIPPING_COMPANIE_URL } from '../../url/API_URL'

const token =  localStorage.getItem('token')
export const ClientShippingApi = createApi({
    reducerPath: 'ClientShippingApi',
    baseQuery: fetchBaseQuery({baseUrl: CLIENT_SHIPPING_COMPANIE_URL}),
    endpoints: (builder) =>({
        getShipping : builder.query<{code: Number, data: ShippingModel[]}, void>({
            query:() => ({
                method: 'GET',
                url: '/',
                headers: { Authorization: `Bear ${token}` },
            })
        }),

        verifyShippingCities : builder.query<{code: Number, data: any[]}, {id_city: number | undefined, id_shipping: number | undefined}>({
            query:(arg) => ({
                method: 'GET',
                url: '/city/verify',
                headers: { Authorization: `Bear ${token}` },
                params: arg
            })
        }),

        getShippingCities : builder.query<{code: Number, data: ShippingCitiesModel[]}, {id_city: number | undefined, id_shipping: number | undefined}>({
            query:(arg) => ({
                method: 'GET',
                url: `/city`,
                params: arg,
                headers: { Authorization: `Bear ${token}` },
            })
        }),
        
        linkShipingCities : builder.mutation<void, {id_city: number | undefined, id_shipping: number | undefined}>({
            query : (data: {id_city: number | undefined, id_shipping: number | undefined}) => ({
                method : 'POST',
                url : '/city',
                body : data,
                headers: { Authorization: `Bear ${token}` },
            })
        }),

        removeShippingCities : builder.mutation<void, {id_city: number | undefined, id_shipping: number | undefined}>({
            query : (data: {id_city: number | undefined, id_shipping: number | undefined}) => ({
                method : 'DELETE',
                url : `/city`,
                body : data,
                headers: { Authorization: `Bear ${token}` },
            })
        })
    })
})

export const { useGetShippingQuery, useGetShippingCitiesQuery, useLinkShipingCitiesMutation, useRemoveShippingCitiesMutation, useVerifyShippingCitiesQuery }  = ClientShippingApi;