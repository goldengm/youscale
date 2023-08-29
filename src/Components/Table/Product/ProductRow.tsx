import React from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { GetProductModel } from '../../../models'
import { usePatchProductMutation } from '../../../services/api/ClientApi/ClientProductApi'
import { showToastSucces } from '../../../services/toast/showToastSucces'
import { showToastError } from '../../../services/toast/showToastError'

interface Props{
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    data: GetProductModel | undefined,
    setItem: React.Dispatch<React.SetStateAction<GetProductModel | undefined>>
    refetch: () => any
}
export default function ProductRow({ setShowEditModal, setShowDeleteModal, data, setItem, refetch }:Props): JSX.Element {

    const [patchProd] = usePatchProductMutation()

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

    const SwitchHideProduct = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()

        patchProd({
            id: data?.id || 0,
            isHidden: !data?.isHidden || false,
            name: data?.name ?? '',
            price_selling: String(data?.price_selling) ?? ''
        }).unwrap().then((res)=> {
            showToastSucces(data?.isHidden ? 'Your product has ben showed' : 'Your product has ben hidden')
            refetch()
        }).catch(err=>{
            console.log(err)
            showToastError('Ooops, something happen try again')
        })
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

                    <a  
                        onClick={handleDeleteRow}
                        href="#" 
                        className="btn btn-danger shadow btn-xs sharp">
                        <i className="fa fa-trash" />
                    </a>
                    { data?.isHidden ? <AiOutlineEyeInvisible onClick={SwitchHideProduct} size={25} /> : <AiOutlineEye onClick={SwitchHideProduct} size={25} /> }
                </div>
            </td>
        </tr>
    )
}
