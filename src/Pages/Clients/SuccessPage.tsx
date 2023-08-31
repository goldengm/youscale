import React, { useEffect } from 'react'
import { setToken } from '../../services/auth/setToken';
import { setUserData } from '../../services/auth/setUserData';
import './styles.css'

export default function SuccessPage() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        const token = urlParams.get('token');
        const client = urlParams.get('client');

        if (token && client) {
            const user = JSON.parse(client)

            const verified = user.active
            const step = user.step

            setTimeout(() => {
                localStorage.setItem('STEP', !verified ? JSON.stringify('NOT_VERIFIED') : step ? JSON.stringify(step) : JSON.stringify('completed'))
                setToken(token)
                setUserData(user)
            }, 3000);
        }
    }, []);

    return (
        <div className="box">
            <div className="success alert">
                <div className="alert-body">
                    Success !
                </div>
                <a className='come-back' href="/">Revenir sur youscale</a>
            </div>
        </div>
    )
}
