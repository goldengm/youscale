import React from 'react'

interface Props{
    children: JSX.Element | JSX.Element[],
    column: string[]
}
export default function TableWrapper({ children, column }:Props): JSX.Element {
    return (
        <div className="card-body">
            <div className="table-responsive">
                <table id="example3" className="display table-custum">
                    <thead>
                        <tr>
                            <th />
                            { column.map((col: string, key: number) => <th key={key}>{col}</th>) }
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
