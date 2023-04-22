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

interface Props {
    setDate: React.Dispatch<React.SetStateAction<string[]>>,
    setUsingDate: React.Dispatch<React.SetStateAction<boolean>>,
    setIdTeam: React.Dispatch<React.SetStateAction<number>>,
    setProduct: React.Dispatch<React.SetStateAction<string>>,
    showDateFilter: boolean,
    showProductFilter: boolean,
    usingDate: boolean,
    showTeamFilter: boolean
}
export default function Dashbord({ setUsingDate, setDate, showDateFilter, setProduct, showProductFilter, showTeamFilter, setIdTeam, usingDate }:Props): JSX.Element {
    return (
        <Main name={'Dashbord'} showTeamFilter={showTeamFilter} setIdTeam={setIdTeam} setProduct={setProduct} usingDate={usingDate} setDate={setDate} setUsingDate={setUsingDate} showProductFilter={showProductFilter} showDateFilter={showDateFilter}>
            <div className="content-body">
                <div className="container-fluid">
                    <DisplayCard />
                    <div className="row">
                        <Ads />
                        <Report />
                        <BestSellingProduct />
                        <BestCity />
                    </div>
                </div>
            </div>
        </Main>
    )
}

const DisplayCard = (): JSX.Element => {
    return (
        <div className="row invoice-card-row">
            <div className="col-xl-3 col-xxl-3 col-sm-6">
                <div className="card bg-warning invoice-card">
                    <div className="card-body d-flex">
                        <div className="icon me-3">
                            <MdAttachMoney size={35} color={'white'} />
                        </div>
                        <div>
                            <h2 className="text-white invoice-num">2478</h2>
                            <span className="text-white fs-18">Earning net</span>
                            <p className="text-white fs-18">Order in progress: 0</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-xxl-3 col-sm-6">
                <div className="card bg-success invoice-card">
                    <div className="card-body d-flex">
                        <div className="icon me-3">
                            <FiShoppingCart size={35} color={'white'} />
                        </div>
                        <div>
                            <h2 className="text-white invoice-num">983</h2>
                            <span className="text-white fs-18">Cost per lead</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-xxl-3 col-sm-6">
                <div className="card bg-info invoice-card">
                    <div className="card-body d-flex">
                        <div className="icon me-3">
                            <FaTruckMoving size={35} color={'white'} />
                        </div>
                        <div>
                            <h2 className="text-white invoice-num">1256</h2>
                            <span className="text-white fs-18">Cost per delivered</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-xxl-3 col-sm-6">
                <div className="card bg-secondary invoice-card">
                    <div className="card-body d-flex">
                        <div className="icon me-3">
                            <BsFillPatchCheckFill size={35} color={'white'} />
                        </div>
                        <div>
                            <h2 className="text-white invoice-num">652</h2>
                            <span className="text-white fs-18">Rate of confirmed</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-xxl-3 col-sm-6">
                <div className="card bg-secondary invoice-card">
                    <div className="card-body d-flex">
                        <div className="icon me-3">
                            <TbTruckDelivery size={35} color={'white'} />
                        </div>
                        <div>
                            <h2 className="text-white invoice-num">652</h2>
                            <span className="text-white fs-18">Rate of delivred</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Ads = (): JSX.Element => {

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
                                <img
                                    className="pattern-img"
                                    src="images/custum/ads.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="row  mt-xl-0 mt-4">
                                <div className="col-md-6">
                                    <h4 className="card-title">Order statistique</h4>
                                    <ul className="card-list mt-4">
                                        <li>
                                            <span className="bg-blue circle" />
                                            Pending<span>20%</span>
                                        </li>
                                        <li>
                                            <span className="bg-success circle" />
                                            Delivered<span>40%</span>
                                        </li>
                                        <li>
                                            <span className="bg-warning circle" />
                                            Cancelled<span>15%</span>
                                        </li>
                                        <li>
                                            <span className="bg-light circle" />
                                            Total order <span>15%</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <CustomPie data={ORDER_STATS_DATA} options={option} />
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