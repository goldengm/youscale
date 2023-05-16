import React, { useState, useEffect } from 'react'
import Main from '../../Main'
import './style.css'
import { MdAttachMoney } from 'react-icons/md'
import { FiShoppingCart } from 'react-icons/fi'
import { FaTruckMoving } from 'react-icons/fa'
import { TbTruckDelivery } from 'react-icons/tb'
import { BsFillPatchCheckFill, BsPatchQuestion } from 'react-icons/bs'
import { CustomPie, CustomLine } from '../../Chart'
import { DashbordModel, orderStatistic, OrderReport, CostReport, RateReport, reportEarningNet, BestSellingProduct, BestCity } from '../../../models'
import { useGetAdsQuery } from '../../../services/api/ClientApi/ClientAdsApi'

interface Props {
    data: DashbordModel,
    setDate: React.Dispatch<React.SetStateAction<string[]>>,
    setUsingDate: React.Dispatch<React.SetStateAction<boolean>>,
    setIdTeam: React.Dispatch<React.SetStateAction<number>>,
    setProduct: React.Dispatch<React.SetStateAction<string>>,
    showDateFilter: boolean,
    showProductFilter: boolean,
    usingDate: boolean,
    showTeamFilter: boolean
}
export default function Dashbord({ data, setUsingDate, setDate, showDateFilter, setProduct, showProductFilter, showTeamFilter, setIdTeam, usingDate }: Props): JSX.Element {
    return (
        <Main name={'Dashbord'} showTeamFilter={showTeamFilter} setIdTeam={setIdTeam} setProduct={setProduct} usingDate={usingDate} setDate={setDate} setUsingDate={setUsingDate} showProductFilter={showProductFilter} showDateFilter={showDateFilter}>
            <div className="content-body">
                <div className="container-fluid">
                    <DisplayCard costPerLead={data.costPerLead} orderInProgress={data.orderInProgress}
                        costPerDelivred={data.costPerDelivred} rateOfConfirmed={data.rateOfConfirmed}
                        rateOfDelivred={data.rateOfDelivred} earningNet={data.earningNet}
                    />
                    <div>
                        <div className="row">
                            <OrderStatisticCard data={data.orderStatistic} />
                            <Report dataOrder={data.orderReport} dataEarningNet={data.reportEarningNet} dataCost={data.costReport} dataRate={data.rateReport} />
                        </div>
                        <div className="row">
                            <BestSellingProductCard data={data.bestSellingProduct} />
                            <BestCityCardComponent data={data.bestCity} />
                            <Ads />
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}

interface DisplayCardProps {
    costPerLead: number;
    orderInProgress: number;
    costPerDelivred: number;
    rateOfConfirmed: number;
    rateOfDelivred: number;
    earningNet: number;
}
const DisplayCard = ({ costPerLead, orderInProgress, costPerDelivred, rateOfConfirmed, rateOfDelivred, earningNet }: DisplayCardProps): JSX.Element => {
    return (
        <div className="row invoice-card-row">

            <Card bg={'warning'} value={earningNet} title={'Earning net'} icon={<MdAttachMoney size={35} color={'white'} />} />

            <Card bg={'success'} value={costPerLead} title={'Cost per lead'} icon={<FiShoppingCart size={35} color={'white'} />} />

            <Card bg={'info'} value={costPerDelivred} title={'Cost per delivered'} icon={<FaTruckMoving size={35} color={'white'} />} />

            <Card bg={'secondary'} value={rateOfConfirmed} title={'Rate of confirmed'} icon={<BsFillPatchCheckFill size={35} color={'white'} />} />

            <Card bg={'secondary'} value={rateOfDelivred} title={'Rate of delivred'} icon={<TbTruckDelivery size={35} color={'white'} />} />

        </div>
    )
}

interface CardProps {
    bg: string,
    value: number,
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
                        <h2 className="text-white invoice-num">{Number(value).toFixed(2)}</h2>
                        <span className="text-white fs-18">{title}</span>
                    </div>

                    <div className="tooltip-card"><BsPatchQuestion size={30} color={'white'} />
                        <span className="tooltiptext-card" >Formule here</span>
                    </div>
                    {/* <div className="tooltip-icon">
                        <BsPatchQuestion size={30} color={'white'} />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

const Ads = (): JSX.Element => {

    const { data: AdsData, isSuccess } = useGetAdsQuery()

    return (
        <div className="col-xl-3 col-xxl-4">
            <div className="card">
                <div className="card-body">
                    <div className="row align-items-center">
                        <p>Ads</p>
                        <div className="col-xl-6 ads-wh">
                            <div className="card-bx bg-blue ads-card">
                                {(isSuccess && AdsData.data) && <img className="pattern-img" src={`data:image/jpeg;base64,${AdsData.data.image}`} alt="ads" />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface OrderStatisticCardProps {
    data: orderStatistic
}
const OrderStatisticCard = ({ data }: OrderStatisticCardProps): JSX.Element => {
    let option = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: false
            }
        },
    }

    return (
        <div className="col-xl-6 col-xxl-4">
            <div className="card">
                <div className="card-header border-0 pb-0">
                    <div>
                        <h4 className="card-title mb-2">Order statistique</h4>
                    </div>
                </div>

                <div className="card-body">
                    <div className="mt-xl-0 mt-4">
                        <div className="col-md-6">
                            <ul className="card-list mt-4">
                                <li>
                                    <span className="bg-delivered circle" />
                                    Delivered<span>{data.data.datasets[0].data[0]}</span>
                                </li>
                                <li>
                                    <span className="bg-pending-1 circle" />
                                    Pending<span>{data.data.datasets[0].data[1]}</span>
                                </li>
                               
                                <li>
                                    <span className="bg-pending-2 circle" />
                                    Pending(2)<span>{data.data.datasets[0].data[2]}</span>
                                </li>

                                <li>
                                    <span className="bg-cancelled circle" />
                                    Cancelled<span>{data.data.datasets[0].data[3]}</span>
                                </li>
                                <li>
                                    <span className="bg-light circle" />
                                    Total order <span>{data.total}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-6">
                            <CustomPie data={data.data} options={option} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ReportProps {
    dataOrder: OrderReport,
    dataCost: CostReport,
    dataRate: RateReport,
    dataEarningNet: reportEarningNet
}
const Report = ({ dataOrder, dataCost, dataRate, dataEarningNet }: ReportProps): JSX.Element => {
    let option = {
        responsive: true,
        plugins: {
            legend: { position: "bottom" },
            title: {
                display: false,
            }
        }
    }

    const [dataChart, setDataChart] = useState<any>(dataOrder)
    const [modeChart, setModeChart] = useState<string>('order')

    useEffect(() => {
        if (modeChart === 'order') setDataChart(dataOrder)
        else if (modeChart === 'cost') setDataChart(dataCost)
        else if (modeChart === 'earning') setDataChart(dataEarningNet)
        else setDataChart(dataRate)
    })

    return (
        <div className="col-xl-6 col-xxl-8">
            <div className="card">
                <div className="card-header d-block d-sm-flex border-0">
                    <div className="me-3">
                        <h4 className="card-title mb-2">Report</h4>
                    </div>
                    <div className="card-tabs mt-3 mt-sm-0">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a
                                    onClick={() => {
                                        setModeChart('order')
                                        setDataChart(dataOrder)
                                    }}
                                    className="nav-link active"
                                    data-bs-toggle="tab"
                                    href="#Order"
                                    role="tab"
                                >
                                    Order
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    onClick={() => {
                                        setModeChart('earning')
                                        setDataChart(dataEarningNet)
                                    }}
                                    className="nav-link"
                                    data-bs-toggle="tab"
                                    href="#Earning"
                                    role="tab"
                                >
                                    Earning
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    onClick={() => {
                                        setModeChart('rate')
                                        setDataChart(dataRate)
                                    }}
                                    className="nav-link"
                                    data-bs-toggle="tab"
                                    href="#Rate"
                                    role="tab"
                                >
                                    Rate
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    onClick={() => {
                                        setModeChart('cost')
                                        setDataChart(dataCost)
                                    }}
                                    className="nav-link"
                                    data-bs-toggle="tab"
                                    href="#Cost"
                                    role="tab"
                                >
                                    Cost
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card-body tab-content">
                    <CustomLine data={dataChart} options={option} />
                </div>
            </div>
        </div>

    )
}

interface BestSellingProductProps {
    data: BestSellingProduct[]
}
const BestSellingProductCard = ({ data }: BestSellingProductProps): JSX.Element => {
    return (
        <div className="col-xl-3 col-xxl-4">
            <div className="card">
                <div className="card-header border-0 pb-0">
                    <div>
                        <h4 className="card-title mb-2">Best Selling Products</h4>
                    </div>
                </div>
                <div className="card-body">
                    {data && data.map((product, index) => <BestSellingCard key={index} price={product.price} count={product.count} price_product={product.price_product} name={product.name} />)}
                </div>
            </div>
        </div>
    )
}

interface BestSellingCardProps {
    name: string,
    price: number,
    count: number,
    price_product: number
}
const BestSellingCard = ({ name, price, count, price_product }: BestSellingCardProps): JSX.Element => {
    return (
        <div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
            <span>{name}</span>
            <span className="fs-18">
                <span className="text-black pe-2">{price_product}dhs/order </span>- {count} orders
            </span>
        </div>
    )
}

interface BestCityCardProps {
    data: BestCity[]
}
const BestCityCardComponent = ({ data }: BestCityCardProps): JSX.Element => {
    return (
        <div className="col-xl-3 col-xxl-4">
            <div className="card">
                <div className="card-header border-0 pb-0">
                    <div>
                        <h4 className="card-title mb-2">Best Cities</h4>
                    </div>
                </div>
                <div className="card-body">
                    {data && data.map((city, index) => <BestCityCard key={index} city={city.City_User.name} order={city.count} />)}
                </div>
            </div>
        </div>
    )
}

interface BestCitiesProps {
    city: string,
    order: number
}
const BestCityCard = ({ city, order }: BestCitiesProps): JSX.Element => {
    return (
        <div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
            <span>{city}</span>
            <span className="fs-18">
                <span className="text-black pe-2">{order} order</span>
            </span>
        </div>
    )
}