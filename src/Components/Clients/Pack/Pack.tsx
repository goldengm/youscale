import React from 'react'
import './pack.style.css'
import Main from '../../Main'

export default function Pack() {
    return (
        <Main name='Pack'>
            <div className="content-body">
                <div className="container-fluid">
                    <PackTitlte title='Pack' />
                    <Tarif />
                    <PackTitlte title='Payment methods' />
                    <Account />
                    <ButtomCard />
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

const Tarif = (): JSX.Element => {
    return (
        <div className="row">
            <TarifItems title={'Free'} price={1200} isUsed={false} />
            <TarifItems title={'Basic'} price={1200} isUsed={false} />
            <TarifItems title={'Premium'} price={1200} isUsed={true} />
        </div>
    )
}

interface TarifItemsProps {
    title: string,
    price: number,
    isUsed: boolean
}
const TarifItems = ({ title, price, isUsed }: TarifItemsProps): JSX.Element => {
    return (
        <div className="col-xl-4">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">{title}</h4>
                </div>
                <span className="pack-price">{price}dh/monthly</span>
                <div className="card-body cust-pack-card">
                    <div className="basic-list-group">
                        <ul className="list-group">
                            <li className="list-group-item">Commande livre: 12.65</li>
                            <li className="list-group-item">Commande total:</li>
                            <li className="list-group-item">Nombre team member:</li>
                            <li className="list-group-item">Nombre de commande permis:</li>
                        </ul>
                    </div>
                    {
                        isUsed ?
                            <>
                                <button type="button" className="btn btn-secondary btn-xs pack-btn">
                                    Currently using
                                </button>
                                <p className='mb-0 subtitle expire-txt'>Plan expires: 2023-04-17T10:27:33.000Z</p>
                            </>
                            :
                            <>
                                <button type="button" className="btn btn-outline-primary btn-xs pack-btn">
                                    Upgrade
                                </button>
                            </>
                    }


                </div>
            </div>
        </div>
    )
}

const Account = (): JSX.Element => {
    return (
        <div className="row">
            <div className="col-xl-3 col-xxl-6 col-lg-6 col-sm-6">
                <div className="widget-stat card">
                    <div className="card-body  p-4">
                        <div className="media ai-icon">
                            <span className="me-3 bgl-danger text-danger">
                                <svg
                                    id="icon-revenue"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={30}
                                    height={30}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-dollar-sign"
                                >
                                    <line x1={12} y1={1} x2={12} y2={23} />
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </span>
                            <div className="media-body">
                                <p className="mb-1">Solde</p>
                                <h4 className="mb-0">364.5 dhs</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-xxl-6 col-lg-6 col-sm-6">
                <div className="widget-stat card bg-danger">
                    <div className="card-body  p-4">
                        <div className="media">
                            <span className="me-3">
                                <i className="flaticon-381-calendar-1" />
                            </span>
                            <div className="media-body text-white text-end">
                                <p className="mb-1">Montant du</p>
                                <h3 className="text-white">763 dhs</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ButtomCard = (): JSX.Element =>{
    return(
        <div className="row">
            <Bank />
            <PaymentAction />
        </div>
    )
}

const Bank = (): JSX.Element => {
    return (
        <div className="col-xl-6">
            <div className="card">
                <div className="card-body">
                    <BankInformation />
                </div>
            </div>
        </div>
    )
}

const PaymentAction = (): JSX.Element => {
    return (
        <div className="col-xl-6">
            <div className="card">
                <div className="card-body">
                    <CouponForm />
                    <RechargemetForm />
                </div>
            </div>
        </div>
    )
}

const BankInformation = (): JSX.Element => {
    return (
        <div className="basic-list-group">
            <ul className="list-group">
                <li className="list-group-item">Bank: <strong>SGBS</strong></li>
                <li className="list-group-item">Name: <strong>SIB</strong></li>
                <li className="list-group-item">RIB: <strong>079855484515</strong></li>
            </ul>
        </div>
    )
}

const CouponForm = (): JSX.Element => {
    return (
        <div className="basic-form coupon">
            <form>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Coupon</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" placeholder="KJKD55D" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">
                            Utiliser
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const RechargemetForm = (): JSX.Element => {
    return (
        <div className="basic-form coupon">
            <h5 className="card-title">Rechargement</h5>
            <form>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Montant</label>
                    <div className="col-sm-9">
                        <input type="number" className="form-control" placeholder="6500" />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="input-group">
                        <div className="form-file">
                            <input type="file" className="form-file-input form-control" />
                        </div>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">
                            Envoyer le paiement
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}