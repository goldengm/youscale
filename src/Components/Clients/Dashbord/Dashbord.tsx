import React from 'react'
import Main from '../../Main'
import './style.css'
import { MdAttachMoney } from 'react-icons/md'
import { FiShoppingCart } from 'react-icons/fi'
import { FaTruckMoving } from 'react-icons/fa'
import { TbTruckDelivery } from 'react-icons/tb'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { ORDER_STATS_DATA, DATA_LINE } from '../../../services/mocks/mock-youscale-dashbord'
import { CustomPie, CustomLine } from '../../Chart'
import { DashbordModel, orderStatistic } from '../../../models'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
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
                    <div className="row">
                        <Ads data={data.orderStatistic} />
                        <Report />
                        <BestSellingProduct />
                        <BestCity />
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
                        <h2 className="text-white invoice-num">{value}</h2>
                        <span className="text-white fs-18">{title}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface AdsProps {
    data: orderStatistic
}
const Ads = ({ data }: AdsProps): JSX.Element => {

    const { data: AdsData, isSuccess } = useGetAdsQuery()

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
        <div className="col-xl-9 col-xxl-12">
            <div className="card">
                <div className="card-body">
                    <div className="row align-items-center">
                        <p>Ads</p>
                        <div className="col-xl-6">
                            <div className="card-bx bg-blue ads-card">
                                { (isSuccess && AdsData.data) && <img className="pattern-img" src={`data:image/jpeg;base64,${AdsData.data.image}`} alt="ads" /> }
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="row  mt-xl-0 mt-4">
                                <div className="col-md-6">
                                    <h4 className="card-title">Order statistique</h4>
                                    <ul className="card-list mt-4">
                                        <li>
                                            <span className="bg-blue circle" />
                                            Pending<span>{data.data.datasets[0].data[1]}</span>
                                        </li>
                                        <li>
                                            <span className="bg-success circle" />
                                            Delivered<span>{data.data.datasets[0].data[0]}</span>
                                        </li>
                                        <li>
                                            <span className="bg-warning circle" />
                                            Cancelled<span>{data.data.datasets[0].data[2]}</span>
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
            </div>
        </div>
    )
}

const Report = (): JSX.Element => {
    let option = {
        responsive: true,
        plugins: {
            legend: { position: "bottom" },
            title: {
                display: false,
            }
        }
    }

    return (
        <div className="col-xl-6 col-xxl-12">
            <div className="card">
                <div className="card-header d-block d-sm-flex border-0">
                    <div className="me-3">
                        <h4 className="card-title mb-2">Report</h4>
                    </div>
                    <div className="card-tabs mt-3 mt-sm-0">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a
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
                    <CustomLine data={DATA_LINE} options={option} />
                </div>
            </div>
        </div>

    )
}

const BestSellingProduct = (): JSX.Element => {
    return (
        <div className="col-xl-3 col-xxl-5">
            <div className="card">
                <div className="card-header border-0 pb-0">
                    <div>
                        <h4 className="card-title mb-2">Best Selling Products</h4>
                    </div>
                </div>
                <div className="card-body">
                    <BestSellingCard />
                    <BestSellingCard />
                    <BestSellingCard />
                    <BestSellingCard />
                </div>
            </div>
        </div>
    )
}

const BestSellingCard = (): JSX.Element => {
    return (
        <div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
            <span>IPhone 14</span>
            <span className="fs-18">
                <span className="text-black pe-2">1500dhs/order </span>- 1 orders
            </span>
        </div>
    )
}

const BestCity = (): JSX.Element => {
    return (
        <div className="col-xl-3 col-xxl-5">
            <div className="card">
                <div className="card-header border-0 pb-0">
                    <div>
                        <h4 className="card-title mb-2">Best Selling Products</h4>
                    </div>
                </div>
                <div className="card-body">
                    <BestCityCard />
                    <BestCityCard />
                    <BestCityCard />
                    <BestCityCard />
                </div>
            </div>
        </div>
    )
}

const BestCityCard = (): JSX.Element => {
    return (
        <div className="d-flex align-items-end mt-2 pb-3 justify-content-between">
            <span>Dakar</span>
            <span className="fs-18">
                <span className="text-black pe-2">1 order</span>
            </span>
        </div>
    )
}