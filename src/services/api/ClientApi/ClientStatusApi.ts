import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { StatusModel, StatusPatchModel, countOrderByStatusModel } from '../../../models/models'
import { CLIENT_STATUS_URL } from '../../url/API_URL'

const token =  localStorage.getItem('token')

export const ClientStatusApi = createApi({
    reducerPath: 'ClientStatusApi',
    baseQuery: fetchBaseQuery({baseUrl: CLIENT_STATUS_URL}),
    endpoints: (builder) =>({
        getStatus : builder.query<{code: Number, data: StatusModel[], countOrderByStatus: countOrderByStatusModel[]}, void>({
            query:() => ({
                method: 'GET',
                url: '/',
                headers: { Authorization: `Bear ${token}` },
            })
        }),
        
        addStatus : builder.mutation<void, StatusModel>({
            query : (data: StatusModel) => ({
                method : 'POST',
                url : '/',
                body : data,
                headers: { Authorization: `Bear ${token}` },
            })
        }),

        patchStatus : builder.mutation<void, StatusPatchModel>({
            query : (data: StatusPatchModel) => ({
                method : 'PATCH',
                url : `/${data.id}`,
                body : data,
                headers: { Authorization: `Bear ${token}` },
            })
        }),

        deleteStatus : builder.mutation<void, any>({
            query : (id: any) => ({
                method : 'DELETE',
                url : `/${id}`,
                headers: { Authorization: `Bear ${token}` },
            })
        })
    })
})

export const { useGetStatusQuery, useAddStatusMutation, usePatchStatusMutation, useDeleteStatusMutation }  = ClientStatusApi;