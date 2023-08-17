import React, { useState, useEffect } from 'react'
import ProductRow from './ProductRow'
import TableWrapper from './TableWrapper'
import { useGetProductQuery } from '../../../services/api/ClientApi/ClientProductApi'
import { GetProductModel } from '../../../models'

export default function ProductTable(): JSX.Element {

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
            AddBtn={<AddProductBtn setShowModal={setShowAddProductModal} />}
            HideBtn={<HideProductBtn setShowHidden={setShowHidden} showHidden={showHidden} />}
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

interface HideProductBtnProps {
    setShowHidden: React.Dispatch<React.SetStateAction<boolean>>
    showHidden: boolean
}

const HideProductBtn = ({ setShowHidden, showHidden }: HideProductBtnProps): JSX.Element => {
    return (
        <a
            onClick={() => setShowHidden(!showHidden)}
            type="button"
        >{ showHidden ? 'Show product' : 'Show hidden'}
        </a>
    )
}