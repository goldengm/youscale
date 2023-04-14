import React from 'react'

export default function ProductRow(): JSX.Element {
    return (
        <tr>
            <th>1</th>
            <td>Kolor Tea Shirt For Man</td>
            <td>1200 dhs</td>
            <td>
                <div className="d-flex">
                    <a
                        //onClick={() => setShowEditModal(true)}
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
