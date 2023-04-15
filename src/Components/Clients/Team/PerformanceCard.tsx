import React from 'react'

interface Props{
    children: JSX.Element
}
export default function PerformanceCard({ children }:Props) {
    return (
        <div className="col-xl-6 col-lg-6">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Performance</h4>
                </div>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    )
}
