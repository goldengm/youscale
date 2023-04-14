import React from 'react'
import StockRow from './StockRow'
import TableWrapper from './TableWrapper'

export default function StockTable(): JSX.Element {
    return (
        <TableWrapper title='Stock' column={['Produit', 'Ville', 'Quantite']} AddBtn={<AddStockBtn />}>
            <StockRow />
        </TableWrapper>
    )
}

interface AddStockBtnProps {
    //setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
const AddStockBtn = ( {  }: AddStockBtnProps ): JSX.Element => {
    return (
        <a 
            //onClick={ () => setShowModal(true) }
            type="button" 
            className="btn btn-primary mb-2" 
            >Add stock
        </a>
    )
}