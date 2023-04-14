import React from 'react'
import Main from '../../Main'
import './product.style.css'
import { ProductTable, StockTable } from '../../Table/Product'


export default function Product(): JSX.Element {
    return (
        <Main name={'Product'}>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="display-product-content">
                        <ProductTable />
                        <StockTable />
                    </div>
                </div>
            </div>
        </Main>
    )
}
