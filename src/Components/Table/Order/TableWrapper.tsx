import React from 'react'

interface Props{
    children: JSX.Element | JSX.Element[],
    column: string[],
    handleCheckAll: () => void
}
export default function TableWrapper({ children, column, handleCheckAll }:Props): JSX.Element {
    return (
        <div className="card-body">
            <div className="table-responsive responsive-cus">
                <table id="example3" className="table table-responsive-sm display table-custum">
                    <thead>
                        <tr>
                            <th>
                                <input 
                                    type="checkbox" 
                                    className="check_all" 
                                    onChange={handleCheckAll}
                                />
                            </th>
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
