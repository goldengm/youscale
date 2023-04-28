import React from 'react'
import './pack.style.css'
import Main from '../../Main'
import { Tarif } from './Tarif'
import { Account } from './Account'
import { Transaction } from './Transaction'

export default function Pack() {
    return (
        <Main name='Pack'>
            <div className="content-body">
                <div className="container-fluid">
                    <PackTitlte title='Pack' />
                    <Tarif />
                    <PackTitlte title='Payment methods' />
                    <Account />
                    <Transaction />
                </div>
            </div>
        </Main>
    )
}

interface PackTitlteProps {
    title: string
}
const PackTitlte = ({ title }: PackTitlteProps): JSX.Element => {
    return (
        <div className="row page-titles">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active">
                    <a href="javascript:void(0)">{title}</a>
                </li>
            </ol>
        </div>
    )
}