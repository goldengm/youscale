import React from 'react'
import { GetProductModel } from '../../../models'

interface Props{
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    data: GetProductModel | undefined,
    setItem: React.Dispatch<React.SetStateAction<GetProductModel | undefined>>
}
export default function ProductRow({ setShowEditModal, data, setItem }:Props): JSX.Element {

    const handleEditRow = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>{
        e.preventDefault()

        setShowEditModal(true)
        setItem(data)
    }

    return (
        <tr>
            <th>{data?.id}</th>
            <td>{data?.name}</td>
            <td>{data?.price_selling} dhs</td>
            <td>
                <div className="d-flex">
                    <a
                        onClick={handleEditRow}
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
