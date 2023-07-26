import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Cient } from '../../../models'
import { CLIENT_URL } from '../../url/API_URL'

const token =  localStorage.getItem('token')

export const ClientApi = createApi({
    reducerPath: 'ClientApi',
    baseQuery: fetchBaseQuery({baseUrl: CLIENT_URL}),
    endpoints: (builder) =>({
        getClient : builder.query<{code: Number, data: Cient}, void>({
            query:() => ({
                method: 'GET',
                url: '/',
                headers: { Authorization: `Bear ${token}` },
            })
        }),

        patchClient : builder.mutation<void, Cient>({
            query : (data: Cient) => ({
                method : 'PATCH',
                url : `/`,
                body : data,
                headers: { Authorization: `Bear ${token}` },
            })
        }),

        saveResponse : builder.mutation<void, { response : any}>({
            query : (data: { response : any} ) => ({
                method : 'POST',
                url : `/reponse`,
                body : data,
                headers: { Authorization: `Bear ${token}` },
            })
        }),

        chossePack : builder.mutation<void, { id_pack : number }>({
            query : (data: { id_pack : number } ) => ({
                method : 'POST',
                url : `/choose_pack`,
                body : data,
                headers: { Authorization: `Bear ${token}` },
            })
        }),
    })
})

export const { useGetClientQuery, usePatchClientMutation, useSaveResponseMutation, useChossePackMutation }  = ClientApi;