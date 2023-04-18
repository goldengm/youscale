import React from 'react'

export default function API(): JSX.Element {
    return (
        <div className="row">
            <h3 className="mt-4 mb-3">API</h3>
            <APICard img={'/cus_img/goo_sheet.png'} title={'Google Sheets'} />
            <APICard img={'/cus_img/shopify.png'} title={'Shopify'} />
            <APICard title={'Shipping Companies'} />
        </div>
    )
}

interface APICardProps {
    title: string,
    img?: string
}
const APICard = ({ title, img }: APICardProps): JSX.Element => {
    return (
        <div className="col-xl-3 col-xxl-3 col-sm-6">
            <div className="card overflow-hidden">
                <div className="social-graph-wrapper widget-facebook">
                    {
                        img &&
                        <img src={img} className='api-img' alt="api-img" />
                    }
                </div>
                <div className="col-6 api-col">
                    <div className="pt-3 pb-3 ps-0 pe-0 text-center">
                        <h4 className="m-1">
                            <span className="counter">{title}</span>
                        </h4>
                        <button type="button" className="btn btn-outline-primary btn-xs">
                            Integrate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}