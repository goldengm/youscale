import React from 'react'

interface Props{
    title: string,
    children: JSX.Element | JSX.Element[] ,
    column: string[],
    AddBtn: JSX.Element
}
export default function TableWrapper({ children, title, column, AddBtn }:Props): JSX.Element {
    return (
        <div className="col-lg-12 product-table">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">{title}</h4>
                    {AddBtn}
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-responsive-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    { column.map((col: string, key: number)=> <th key={key}>{col}</th>) }
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {children}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
