import React, { useState } from 'react'
import StockRow from './StockRow'
import TableWrapper from './TableWrapper'
import { AddStockModal, EditStockModal } from '../Modal/Product'

export default function StockTable(): JSX.Element {
    const [showAddStockModal, setShowAddStockModal] = useState<boolean>(false)
    const [showEditStockModal, setShowEditStockModal] = useState<boolean>(false)

    return (
        <TableWrapper title='Stock' column={['Produit', 'Ville', 'Quantite']} AddBtn={<AddStockBtn setShowModal={setShowAddStockModal} />}>
            { showAddStockModal ? <AddStockModal showModal={showAddStockModal} setShowModal={setShowAddStockModal}  /> : <></> }
            { showEditStockModal ? <EditStockModal showModal={showEditStockModal} setShowModal={setShowEditStockModal}  /> : <></> }

            <StockRow setShowEditModal={setShowEditStockModal} />
        </TableWrapper>
    )
}

interface AddStockBtnProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
const AddStockBtn = ( { setShowModal }: AddStockBtnProps ): JSX.Element => {
    return (
        <a 
            onClick={ () => setShowModal(true) }
            type="button" 
            className="btn btn-primary mb-2" 
            >Add stock
        </a>
    )
}