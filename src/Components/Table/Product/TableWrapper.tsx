import React from 'react'
import { AddProductModal, DeleteProductModal, EditProductModal } from '../Modal/Product'
import { GetProductModel } from '../../../models'

interface Props {
    title: string,
    children: JSX.Element | JSX.Element[] | any,
    column: string[],
    AddBtn: JSX.Element
    refetch?: () => any
    item?: GetProductModel | undefined
    showAddProductModal?: boolean
    showEditProductModal?: boolean
    showDeleteProductModal?: boolean
    setShowAddProductModal?: React.Dispatch<React.SetStateAction<boolean>>
    setShowEditProductModal?: React.Dispatch<React.SetStateAction<boolean>>
    setShowDeleteProductModal?: React.Dispatch<React.SetStateAction<boolean>>
}
export default function TableWrapper({ children, title, column, item, AddBtn, refetch, showAddProductModal, showEditProductModal, showDeleteProductModal, setShowAddProductModal, setShowEditProductModal, setShowDeleteProductModal }: Props): JSX.Element {

    const never = (): any => { }
    return (
        <div className="col-lg-12 product-table">
            {showAddProductModal ? <AddProductModal refetch={refetch ?? never()} showModal={showAddProductModal} setShowModal={setShowAddProductModal ?? never()} /> : <></>}
            {showEditProductModal ? <EditProductModal refetch={refetch ?? never()} showModal={showEditProductModal} setShowModal={setShowEditProductModal ?? never()} item={item} /> : <></>}
            {showDeleteProductModal ? <DeleteProductModal refetch={refetch ?? never()} showModal={showDeleteProductModal} setShowModal={setShowDeleteProductModal ?? never()} item={item} /> : <></>}

            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">{title}</h4>
                    {AddBtn}
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-responsive-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {column.map((col: string, key: number) => <th key={key}>{col}</th>)}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {children}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
