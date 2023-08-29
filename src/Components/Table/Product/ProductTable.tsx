import React, { useState, useEffect } from 'react'
import ProductRow from './ProductRow'
import TableWrapper from './TableWrapper'
import { useGetProductQuery } from '../../../services/api/ClientApi/ClientProductApi'
import { GetProductModel } from '../../../models'

interface Props {
    driverObj: {
        moveNext: () => void
    }
}
export default function ProductTable({ driverObj }:Props): JSX.Element {

    const [showHidden, setShowHidden] = useState<boolean>(false)
    const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false)
    const [showEditProductModal, setShowEditProductModal] = useState<boolean>(false)
    const [showDeleteProductModal, setShowDeleteProductModal] = useState<boolean>(false)

    const { data, isSuccess, refetch } = useGetProductQuery({ isHidden: showHidden })
    const [item, setItem] = useState<GetProductModel>()

    useEffect(() => {
        refetch()
    }, [showHidden])
    
    return (
        <TableWrapper
            item={item}
            title='Product'
            column={['Nom', 'Prix']}
            refetch={refetch}
            AddBtn={<AddProductBtn setShowModal={setShowAddProductModal} driverObj={driverObj} />}
            driverObj={driverObj}
            setShowHidden={setShowHidden}
            showAddProductModal={showAddProductModal}
            showEditProductModal={showEditProductModal}
            showDeleteProductModal={showDeleteProductModal}
            setShowAddProductModal={setShowAddProductModal}
            setShowEditProductModal={setShowEditProductModal}
            setShowDeleteProductModal={setShowDeleteProductModal}
        >
            {isSuccess && data.data.map((dt, key) => !dt.isDeleted && <ProductRow data={dt} key={key} refetch={refetch} setShowDeleteModal={setShowDeleteProductModal} setShowEditModal={setShowEditProductModal} setItem={setItem} />)}
        </TableWrapper>
    )
}


interface AddProductBtnProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    driverObj: {
        moveNext: () => void
    }
}
const AddProductBtn = ({ setShowModal, driverObj }: AddProductBtnProps): JSX.Element => {

    const handleShowProductModal=(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
        e.preventDefault()
        
        setShowModal(true)
        setTimeout(() => {
            driverObj.moveNext()
        }, 1000);
    }

    return (
        <a
            onClick={handleShowProductModal}
            type="button"
            className="btn btn-primary mb-2 add-product"
        >Add product
        </a>
    )
}