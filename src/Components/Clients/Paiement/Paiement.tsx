import React, { useState, useEffect } from 'react'
import Main from '../../Main'
import { MdAttachMoney, MdDeleteForever } from 'react-icons/md'
import { FiShoppingCart } from 'react-icons/fi'
import { FaTruckMoving } from 'react-icons/fa'
import { AddPerteModal } from '../../Table/Modal/Paiement'
import './paiement.style.css'
import { DashbordQueryModel, TransactionModel } from '../../../models'
import { useGetPaiementDashbordQuery } from '../../../services/api/ClientApi/ClientPaiementDashbord'

export default function Paiement() {
    const [showAddPerteModal, setShowAddPerteModal] = useState<boolean>(false)

    const [product, setProduct] = useState<string>('')
    const [date, setDate] = useState<string[]>()
    const [usingDate, setUsingDate] = useState<boolean>(false)
    const [OrderQueryData, setOrderQueryData] = useState<DashbordQueryModel>({usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1]})
    const { data, isLoading, refetch } = useGetPaiementDashbordQuery(OrderQueryData)
  
    useEffect(() => { refetch() }, [])
  
    useEffect(() => {
      setOrderQueryData({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1] })
      refetch()
    }, [date, usingDate])
  
    useEffect(() => {
      setOrderQueryData({ usedate: Number(usingDate), datefrom: date?.[0], dateto: date?.[1], id_product_array: product })
      refetch()
    }, [product])

    return (
        <Main name='Paiement'>
            { showAddPerteModal && <AddPerteModal refetch={refetch} setShowModal={setShowAddPerteModal} showModal={showAddPerteModal} /> }
            <div className="content-body">
                <div className="container-fluid">
                    <DisplayCard />
                    <div className="row"><Goal /></div>
                    <div className="row">
                        <Transaction data={data?.data.transaction} setShowAddPerteModal={setShowAddPerteModal} />
                        <DetailsOfSpending />
                    </div>
                </div>
            </div>
        </Main>
    )
}

const DisplayCard = (): JSX.Element => {
    return (
        <div className="row invoice-card-row">
            <Card bg={'warning'} value={'2478'} title={'Earning net'} icon={<MdAttachMoney size={35} color={'white'} />} />
            <Card bg={'success'} value={'983'} title={'Chiffre d\'affaire'} icon={<FiShoppingCart size={35} color={'white'} />} />
            <Card bg={'info'} value={'1256'} title={'Spendings'} icon={<FaTruckMoving size={35} color={'white'} />} />
        </div>
    )
}

interface CardProps {
    bg: string,
    value: string,
    title: string,
    icon: JSX.Element
}
const Card = ({ bg, value, title, icon }: CardProps): JSX.Element => {
    return (
        <div className="col-xl-3 col-xxl-3 col-sm-6">
            <div className={`card bg-${bg} invoice-card`}>
                <div className="card-body d-flex">
                    <div className="icon me-3">
                        {icon}
                    </div>
                    <div>
                        <h2 className="text-white invoice-num">{value}</h2>
                        <span className="text-white fs-18">{title}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Goal = (): JSX.Element => {
    return (
        <div className="col-md-6">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Goals</h4>
                    <div className="d-flex align-items-center">
                        <div className="me-auto">
                            <div className="progress mt-4 goal-progress-line" style={{ height: 10 }}>
                                <div
                                    className="progress-bar bg-primary progress-animated"
                                    style={{ width: "45%", height: 10 }}
                                    role="progressbar"
                                >
                                    <span className="sr-only">60% Complete</span>
                                </div>
                            </div>
                            <div className="goal-form">
                                <input
                                    type="text"
                                    className="form-control input-rounded input-goal"
                                    placeholder="123.5"
                                />
                                <button type="button" className="btn btn-outline-primary btn-xs">
                                    Valider
                                </button>
                            </div>


                        </div>
                        <h2 className="fs-38">854</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface TransactionProps {
    setShowAddPerteModal: React.Dispatch<React.SetStateAction<boolean>>,
    data: TransactionModel[] | undefined
}
const Transaction = ({setShowAddPerteModal, data}:TransactionProps): JSX.Element => {
    return (
        <div className="col-xl-4 col-xxl-6 col-lg-6">
            <div className="card">
                <div className="card-header border-0 pb-0 table-header">
                    <h4 className="card-title">TRANSACTIONS</h4>
                    <a 
                        onClick={()=> setShowAddPerteModal(true)}
                        type="button" 
                        className="btn btn-danger mb-2">
                        Add perte
                    </a>
                </div>
                <div className="card-body">
                    <div
                        id="dlab_W_Todo1"
                        className="widget-media table-paiement"
                    >
                        <ul className="timeline">
                            { data && data.map((dt, index)=> <TransactionRow key={index} data={dt} /> ) }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface TransactionRowProps{
    data: TransactionModel
}
const TransactionRow = ({ data }:TransactionRowProps): JSX.Element => {
    return (
        <li>
            <div className="timeline-panel">
                <div className="media-body">
                    <h5 className="mb-1">{data.Perte_Categorie?.name} - <strong>{data.Product.name}</strong></h5>
                    <small className="d-block">{data.dateFrom.toString().slice(0, 10)} - {data.dateTo.toString().slice(0, 10)}</small>
                </div>
                <div className="dropdown">
                   <strong className='table-price'>{data.amount} dhs</strong>
                   <MdDeleteForever className='table-delete-icon' size={30} color='red' />
                </div>
            </div>
        </li>
    )
}

const DetailsOfSpending = (): JSX.Element => {
    return (
        <div className="col-xl-4 col-xxl-6 col-lg-6">
            <div className="card">
                <div className="card-header border-0 pb-0 table-header">
                    <h4 className="card-title">DETAILS OF SPENDING</h4>
                </div>
                <div className="card-body">
                    <div
                        id="dlab_W_Todo1"
                        className="widget-media table-paiement"
                    >
                        <ul className="timeline">
                            <SpendingRow />
                            <SpendingRow />
                            <SpendingRow />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SpendingRow = (): JSX.Element => {
    return (
        <li>
            <div className="timeline-panel">
                <div className="media-body">
                    <h5 className="mb-1"><strong>Tiktok ads</strong></h5>
                </div>
                <div className="dropdown">
                   <strong className='table-price'>200dhs</strong>
                </div>
            </div>
        </li>
    )
}
