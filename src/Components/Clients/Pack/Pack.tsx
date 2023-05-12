import React from 'react'
import './pack.style.css'
import Main from '../../Main'
import { Tarif } from './Tarif'
import { Account } from './Account'
import { Transaction } from './Transaction'
import { PaymentMethod } from './PaymentMethod'
import { useGetClientPaymentMethodQuery } from '../../../services/api/ClientApi/ClientPaymentMethodApi'

export default function Pack() {
    const { data, isLoading } = useGetClientPaymentMethodQuery()

    return (
        <Main name='Pack'>
            <div className="content-body">
                <div className="container-fluid">
                    <PackTitlte title='Pack' />
                    <Tarif />
                    <PackTitlte title='Payment methods' />
                    <Account />
                    <PaymentMethod data={data?.data} />
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