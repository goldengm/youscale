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
    const [item, setItem] = useState<GetProductModel>()

    return (
        <TableWrapper
            item={item}
            title='Product'
            column={['Nom', 'Prix']}
            refetch={refetch}
            AddBtn={<AddProductBtn setShowModal={setShowAddProductModal} />}
            showAddProductModal={showAddProductModal}
            showEditProductModal={showEditProductModal}
            showDeleteProductModal={showDeleteProductModal}
            setShowAddProductModal={setShowAddProductModal}
            setShowEditProductModal={setShowEditProductModal}
            setShowDeleteProductModal={setShowDeleteProductModal}
        >
            {isSuccess && data.data.map((dt, key) => !dt.isDeleted && <ProductRow data={dt} key={key} setShowDeleteModal={setShowDeleteProductModal} setShowEditModal={setShowEditProductModal} setItem={setItem} />)}
        </TableWrapper>
    )
}


interface AddProductBtnProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
const AddProductBtn = ({ setShowModal }: AddProductBtnProps): JSX.Element => {
    return (
        <a
            onClick={() => setShowModal(true)}
            type="button"
            className="btn btn-primary mb-2"
        >Add product
        </a>
    )
}