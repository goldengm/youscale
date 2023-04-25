import React, { useState } from 'react'
import StockRow from './StockRow'
import TableWrapper from './TableWrapper'
import { AddStockModal, EditStockModal, DeleteStockModal } from '../Modal/Product'
import { useGetStockQuery } from '../../../services/api/ClientApi/ClientStockApi'
import { GetStockModel } from '../../../models'

export default function StockTable(): JSX.Element {
    const [showAddStockModal, setShowAddStockModal] = useState<boolean>(false)
    const [showEditStockModal, setShowEditStockModal] = useState<boolean>(false)
    const [showDeleteStockModal, setShowDeleteStockModal] = useState<boolean>(false)

    const [ item, setItem ] = useState<GetStockModel>()
    const { data, refetch } = useGetStockQuery()

    return (
        <TableWrapper title='Stock' column={['Produit', 'Ville', 'Quantite']} AddBtn={<AddStockBtn setShowModal={setShowAddStockModal} />}>
            { showAddStockModal ? <AddStockModal showModal={showAddStockModal} setShowModal={setShowAddStockModal} refetch={refetch}  /> : <></> }
            { showEditStockModal ? <EditStockModal showModal={showEditStockModal} item={item} setShowModal={setShowEditStockModal} refetch={refetch}  /> : <></> }
            { showDeleteStockModal ? <DeleteStockModal showModal={showDeleteStockModal} item={item} setShowModal={setShowDeleteStockModal} refetch={refetch}  /> : <></> }

            { data?.data.map((dt, index)=> <StockRow 
                key={index}
                data={dt}
                setItem={setItem}
                setShowDeleteModal={setShowDeleteStockModal}
                setShowEditModal={setShowEditStockModal} 
            />) }

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