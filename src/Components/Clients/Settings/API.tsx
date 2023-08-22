import React, { useState } from 'react'
import { AddLinkSheetModal, ShippingModal } from '../../Table/Modal/Setting'

export default function API(): JSX.Element {

    const [showAddLinkSheetModal, setShowAddLinkSheetModal] = useState<boolean>(false)
    const [showShippingModal, setShowShippingModal] = useState<boolean>(false)

    const handleShowSheetModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setShowAddLinkSheetModal(true)
    }

    const handleShowShippingModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setShowShippingModal(true)
    }

    return (
        <div className="row">
            {showAddLinkSheetModal && <AddLinkSheetModal showModal={showAddLinkSheetModal} setShowModal={setShowAddLinkSheetModal} />}
            {showShippingModal && <ShippingModal showModal={showShippingModal} setShowModal={setShowShippingModal} />}

            <h3 className="mt-4 mb-3">API</h3>
            <div className="row">
                <APICard img={'/cus_img/goo_sheet.png'} title={'Google Sheets'} onClick={handleShowSheetModal} />
                <APICard img={'/cus_img/shopify.png'} title={'Shopify'} />
                <APICard title={'Shipping Companies'} onClick={handleShowShippingModal} />
            </div>
        </div>
    )
}

interface APICardProps {
    title: string,
    img?: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
}
const APICard = ({ title, img, onClick }: APICardProps): JSX.Element => {
    return (
        <div className="col-xl-3 col-xxl-3 col-sm-6 api_card">
            <div className="card overflow-hidden">
                <div className="social-graph-wrapper widget-facebook">
                    {img && <img src={img} className='api-img' alt="api-img" />}
                </div>
                <div className="col-6 api-col">
                    <div className="pt-3 pb-3 ps-0 pe-0 text-center">
                        <h4 className="m-1">
                            <span className="counter">{title}</span>
                        </h4>
                        <button
                            onClick={onClick}
                            type="button"
                            className="btn btn-outline-primary btn-xs"
                        >
                            Integrate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}