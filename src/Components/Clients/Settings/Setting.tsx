import React, { useState, useEffect } from 'react'
import Main from '../../Main'
import API from './API'
import OrderSetting from './OrderSetting'
import './setting.style.css'

export default function Setting() {
    return (
        <Main name='Setting'>
            <div className="content-body">
                <div className="container-fluid">
                    <API />
                    <OrderSetting />
                </div>
            </div>
        </Main>
    )
}