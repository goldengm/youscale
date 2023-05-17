import React, { useState, useEffect } from 'react'
import './pack.style.css'
import Main from '../../Main'
import { Tarif } from './Tarif'
import { Account } from './Account'
import { Transaction } from './Transaction'
import { PaymentMethod } from './PaymentMethod'
import { useGetClientPaymentMethodQuery } from '../../../services/api/ClientApi/ClientPaymentMethodApi'

interface Bank {
    id: number;
    name: string;
    bank: string;
    rib: string;
}
export default function Pack() {
    const { data } = useGetClientPaymentMethodQuery()
    const [currentBank, setCurrentBank] = useState<Bank | undefined>()

    useEffect(() => {
        setCurrentBank(data?.data[0] ? data?.data[0].Bank_Information : undefined)
    }, [data])

    return (
        <Main name='Pack'>
            <div className="content-body">
                <div className="container-fluid">
                    <PackTitlte title='Pack' />
                    <Tarif />
                    <PackTitlte title='Payment methods' />
                    <Account />
                    <PaymentMethod data={data?.data} setCurrentBank={setCurrentBank} />
                    <Transaction data={currentBank} />
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