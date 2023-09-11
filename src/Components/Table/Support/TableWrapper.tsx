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
    setQuery: React.Dispatch<React.SetStateAction<{
        status?: string | undefined;
    }>>
}
export default function TableWrapper({ children, title, column, AddBtn, refetch, showAddSupportModal, setShowCreateSupportModal, setQuery }: Props): JSX.Element {

    const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        const { value } = e.target
        setQuery({ status: value === String('0') ? undefined : value })
    }

    const never = (): any => { }
    return (
        <div className="col product-table">
            {showAddSupportModal ? <AddSupportModal refetch={refetch ?? never()} showModal={showAddSupportModal} setShowModal={setShowCreateSupportModal ?? never()} /> : <></>}

            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">{title}</h4>
                    <div className="col-auto my-1">
                        <select onChange={changeStatus} className="me-sm-2 form-control wide" id="inlineFormCustomSelect">
                            <option value={0}>Status</option>
                            <option value={'pending'}>Pending</option>
                            <option value={'open'}>Open</option>
                            <option value={'in_progress'}>In progress</option>
                            <option value={'done'}>Done </option>
                        </select>
                    </div>
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
