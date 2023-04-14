import React, { useState } from 'react'
import ProductRow from './ProductRow'
import TableWrapper from './TableWrapper'

export default function ProductTable(): JSX.Element {
    return (
        <TableWrapper title='Product' column={['Nom', 'Prix']} AddBtn={<AddProductBtn />}>
            <ProductRow />
        </TableWrapper>
    )
}


interface AddProductBtnProps {
    //setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
const AddProductBtn = ( {  }: AddProductBtnProps ): JSX.Element => {
    return (
        <a 
            //onClick={ () => setShowModal(true) }
            type="button" 
            className="btn btn-primary mb-2" 
            >Add product
        </a>
    )
}