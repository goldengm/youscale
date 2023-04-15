import React from 'react'

interface Props{
    children: JSX.Element
}
export default function EarningCard({ children }:Props) {
    return (
        <div className="col-xl-6 col-lg-6 earning-card">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Earning</h4>
                </div>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    )
}
