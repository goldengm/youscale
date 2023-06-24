import React from 'react'
import Main from '../../Main'
import API from './API'
import OrderSetting from './OrderSetting'
import './setting.style.css'

export default function Setting() {
    
    return (
        <Main urlVideo={'https://www.youtube.com/watch?v=UtNXAwrUFok'} name='Setting' showDateFilter={false} showProductFilter={false} showTeamFilter={false}>
            <div className="content-body">
                <div className="container-fluid">
                    <API />
                    <OrderSetting />
                </div>
            </div>
        </Main>
    )
}