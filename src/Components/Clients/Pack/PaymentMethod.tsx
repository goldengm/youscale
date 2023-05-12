import React from 'react'
import { AdminPaymentMethodModel } from '../../../models'

interface PaymentMethod{
    data: AdminPaymentMethodModel[] | undefined
}
export const PaymentMethod = ({ data }:PaymentMethod): JSX.Element => {
    return (
        <div className='row'>
            { data && data.map((payment, key )=>  <Card key={key} logo={`data:image/jpeg;base64,${payment.image}`} name={payment.name} /> ) }
        </div>
    )
}

interface CardProps{
    logo:string | undefined,
    name:string
}
const Card = ({logo, name}: CardProps): JSX.Element => {
    return (
        <div className="col-xl-3 col-lg-6 col-sm-6">
            <div className="card">
                <div className="card-body">
                    <div className="new-arrival-product">
                        <div className="new-arrivals-img-contnent">
                            <img className="img-fluid" src={logo} alt="" />
                        </div>
                        <div className="new-arrival-content text-center mt-3">
                            <h4><a href="#">{name}</a></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}