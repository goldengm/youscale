import React, { useState } from 'react'
import ProductRow from './ProductRow'
import TableWrapper from './TableWrapper'
import { AddProductModal, EditProductModal, DeleteProductModal } from '../Modal/Product'
import { useGetProductQuery } from '../../../services/api/ClientApi/ClientProductApi'
import { GetProductModel } from '../../../models'

export default function ProductTable(): JSX.Element {

    const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false)
    const [showEditProductModal, setShowEditProductModal] = useState<boolean>(false)
    const [showDeleteProductModal, setShowDeleteProductModal] = useState<boolean>(false)
    
    const { data, isSuccess, refetch } = useGetProductQuery()
    const [ item, setItem ] = useState<GetProductModel>()

    return (
        <TableWrapper title='Product' column={['Nom', 'Prix']} AddBtn={<AddProductBtn setShowModal={setShowAddProductModal} />}>
            
            { showAddProductModal ? <AddProductModal refetch={refetch} showModal={showAddProductModal} setShowModal={setShowAddProductModal}  /> : <></> }
            { showEditProductModal ? <EditProductModal refetch={refetch} showModal={showEditProductModal} setShowModal={setShowEditProductModal} item={item}  /> : <></> }
            { showDeleteProductModal ? <DeleteProductModal refetch={refetch} showModal={showDeleteProductModal} setShowModal={setShowDeleteProductModal} item={item}  /> : <></> }

            { isSuccess && data.data.map((dt, key) => <ProductRow data={dt} key={key} setShowDeleteModal={setShowDeleteProductModal} setShowEditModal={setShowEditProductModal} setItem={setItem} /> ) }
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