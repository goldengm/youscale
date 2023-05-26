import React, { useState, useEffect } from 'react'
import './pack.style.css'
import Main from '../../Main'
import { Tarif } from './Tarif'
import { Account } from './Account'
import { Transaction } from './Transaction'
import { PaymentMethod } from './PaymentMethod'
import { useGetClientPaymentMethodQuery } from '../../../services/api/ClientApi/ClientPaymentMethodApi'
import { useGetClientPackQuery } from '../../../services/api/ClientApi/ClientPackApi'

interface Bank {
    id: number;
    name: string;
    bank: string;
    rib: string;
}
export default function PackContainer() {
    const { data: dataPack, isLoading, refetch } = useGetClientPackQuery()
    const { data } = useGetClientPaymentMethodQuery()
    const [currentBank, setCurrentBank] = useState<Bank | undefined>()

    useEffect(() => {
        setCurrentBank(data?.data[0] ? data?.data[0].Bank_Information : undefined)
    }, [data])

    function computeDateDifference(startDate: Date, endDate: Date): number {
        const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

        // Convert both dates to UTC to avoid issues with daylight saving time
        const startUtc = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const endUtc = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

        // Calculate the difference in days
        const diffInDays = Math.floor((endUtc - startUtc) / millisecondsPerDay);

        return diffInDays;
    }

    return (
        <Main name='Pack'>
            <div className="content-body">
                <div className="container-fluid">
                    {dataPack?.data && <PackTitlte title={`Pack <p class='expire-txt'>your pack will expire in ${computeDateDifference(new Date(), new Date(dataPack.data.Subscription.date_expiration) )} days</p>`} />}
                    <Tarif data={dataPack} isLoading={isLoading} refetch={refetch} />
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
                    <a dangerouslySetInnerHTML={{ __html: title }} href="javascript:void(0)"></a>
                </li>
            </ol>
        </div>
    )
}