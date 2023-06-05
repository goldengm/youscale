import React, { useState, useEffect } from 'react'
import Main from '../../Main'
import API from './API'
import OrderSetting from './OrderSetting'
import './setting.style.css'
import { useGetShippingQuery } from '../../../services/api/ClientApi/ClientShippingApi'

export default function Setting() {
    const { data } = useGetShippingQuery()

    console.log('useGetShippingQuery', data)
    return (
        <Main name='Setting' showDateFilter={false} showProductFilter={false} showTeamFilter={false}>
            <div className="content-body">
                <div className="container-fluid">
                    <API />
                    <OrderSetting />
                </div>
            </div>
        </Main>
    )
}