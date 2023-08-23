import React from 'react'
import { AddSupportModal } from '../Modal/Support'
import { Support } from '../../../models'

interface Props {
    title: string,
    children: JSX.Element | JSX.Element[] | any,
    column: string[],
    AddBtn: JSX.Element
    refetch?: () => any
    item?: Support | undefined
    showAddSupportModal?: boolean
    setShowCreateSupportModal?: React.Dispatch<React.SetStateAction<boolean>>
}
export default function TableWrapper({ children, title, column, AddBtn, refetch, showAddSupportModal, setShowCreateSupportModal }: Props): JSX.Element {

    const never = (): any => { }
    return (
        <div className="col product-table">
            {showAddSupportModal ? <AddSupportModal refetch={refetch ?? never()} showModal={showAddSupportModal} setShowModal={setShowCreateSupportModal ?? never()} /> : <></>}

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
