import React from 'react'
import { GetStockModel } from '../../../models'

interface Props{
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    data: GetStockModel | undefined,
    setItem: React.Dispatch<React.SetStateAction<GetStockModel | undefined>>
}
export default function StockRow({ setShowEditModal, setShowDeleteModal, data, setItem }:Props): JSX.Element {

    const handleEditRow = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>{
        e.preventDefault()

        setShowEditModal(true)
        setItem(data)
    }

    const handleDeleteRow = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>{
        e.preventDefault()

        setShowDeleteModal(true)
        setItem(data)
    }

    return (
        <tr>
            <th>{data?.id}</th>
            <td>{data?.Product.name}</td>
            <td>{data?.City_User.name}</td>
            <td>{data?.quantity}</td>
            <td>
                <div className="d-flex">
                    <a
                        onClick={handleEditRow}
                        href="#"
                        className="btn btn-primary shadow btn-xs sharp me-1"
                    >
                        <i className="fas fa-pencil-alt" />
                    </a>
                    <a 
                        onClick={handleDeleteRow}
                        href="#" 
                        className="btn btn-danger shadow btn-xs sharp">
                        <i className="fa fa-trash" />
                    </a>
                </div>
            </td>
        </tr>
    )
}
