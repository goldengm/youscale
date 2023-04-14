import React, { useState } from 'react'
import ProductRow from './ProductRow'
import TableWrapper from './TableWrapper'
import { AddProductModal, EditProductModal } from '../Modal/Product'

export default function ProductTable(): JSX.Element {

    const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false)
    const [showEditProductModal, setShowEditProductModal] = useState<boolean>(false)

    return (
        <TableWrapper title='Product' column={['Nom', 'Prix']} AddBtn={<AddProductBtn setShowModal={setShowAddProductModal} />}>
            { showAddProductModal ? <AddProductModal showModal={showAddProductModal} setShowModal={setShowAddProductModal}  /> : <></> }
            { showEditProductModal ? <EditProductModal showModal={showEditProductModal} setShowModal={setShowEditProductModal}  /> : <></> }

            <ProductRow setShowEditModal={setShowEditProductModal} />
        </TableWrapper>
    )
}


interface AddProductBtnProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
const AddProductBtn = ( { setShowModal }: AddProductBtnProps ): JSX.Element => {
    return (
        <a 
            onClick={ () => setShowModal(true) }
            type="button" 
            className="btn btn-primary mb-2" 
            >Add product
        </a>
    )
}