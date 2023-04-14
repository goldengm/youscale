import React from 'react'

interface Props{
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>   
}
export default function StockRow({ setShowEditModal }:Props): JSX.Element {
    return (
        <tr>
            <th>1</th>
            <td>Iphone</td>
            <td>Abidjan</td>
            <td>12</td>
            <td>
                <div className="d-flex">
                    <a
                        onClick={() => setShowEditModal(true)}
                        href="#"
                        className="btn btn-primary shadow btn-xs sharp me-1"
                    >
                        <i className="fas fa-pencil-alt" />
                    </a>
                    <a href="#" className="btn btn-danger shadow btn-xs sharp">
                        <i className="fa fa-trash" />
                    </a>
                </div>
            </td>
        </tr>
    )
}
