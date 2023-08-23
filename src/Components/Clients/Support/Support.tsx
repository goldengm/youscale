import React, { useState, useEffect } from 'react'
import { SupportTable } from '../../Table/Support'
import io from 'socket.io-client'
import Main from '../../Main'

export default function Product(): JSX.Element {

    const closeTutorial = () => { };

    useEffect(() => {
        const socket = io('http://127.0.0.1:8500', { transports: ['websocket'] })
    }, [])

    return (
        <Main
            urlVideo={'https://www.youtube.com/watch?v=EkhWLahQ8ww'}
            name={'Support'}
            showDateFilter={false}
            showProductFilter={false}
            showTeamFilter={false}
            showTutorial={false}
            closeTutorial={closeTutorial}
        >
            <div className="content-body">
                <div className="container-fluid">
                    <div className="display-product-content">
                        <SupportTable />
                    </div>
                </div>
            </div>
        </Main>
    )
}
