import React from 'react'
import Main from '../../Main'
import { Table } from '../../Table/Order'

export default function Order(): JSX.Element{
    return (
        <Main name={'Order'}>
            <div className="content-body">
                <div className="container-fluid">
                   <Table />
                </div>
            </div>
        </Main>
    )
}
