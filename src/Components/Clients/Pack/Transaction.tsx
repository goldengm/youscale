import React from 'react'

export const Transaction = (): JSX.Element =>{
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