import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SheetIntegrationModel, GetSheetIntegrationModel } from '../../../models/models'
import { CLIENT_SHEET_INTEGRATION_URL } from '../../url/API_URL'

const token =  localStorage.getItem('token')

export const ClientIntegrateSheetApi = createApi({
    reducerPath: 'ClientIntegrateSheetApi',
    baseQuery: fetchBaseQuery({baseUrl: CLIENT_SHEET_INTEGRATION_URL}),
    endpoints: (builder) =>({
        integrateSheet : builder.mutation<void, SheetIntegrationModel>({
            query : (data: SheetIntegrationModel) => ({
                method : 'POST',
                url : '/',
                body : data,
                headers: { Authorization: `Bear ${token}` },
            })
        }),

        getLinkSheet : builder.query<{code: Number, data:GetSheetIntegrationModel}, void>({
            query:() => ({
                method: 'GET',
                url: '/',
                headers: { Authorization: `Bear ${token}` },
            })
        }),
    })
})

export const { useIntegrateSheetMutation, useGetLinkSheetQuery }  = ClientIntegrateSheetApi;