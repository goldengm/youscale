import React from 'react'
import Row from './Row'
import { AddOrderModal } from '../Modal/Order'
import TableWrapper from './TableWrapper'
import './styles.css'
import { useGetColumnQuery } from '../../../services/api/ClientApi/ClientColumnApi'
import { ColumnModel, GetClientOrderModel, ProductOrder } from '../../../models'

type Order = {
    code: Number;
    data: GetClientOrderModel[];
    order: {
        id: number;
        id_city: number;
        id_team: number;
        Product_Orders: ProductOrder[];
        createdAt: Date;
    }[];
} | undefined

const GetColumn = (col: ColumnModel[] | undefined) : string[] =>{
    if(!col) return []

    var column : string[] = []

    col.map(dt => dt.active && column.push(dt.name))

    return [...column, 'history']
}

interface TableProps{
    data: Order
}
export default function Table({ data }:TableProps): JSX.Element {
    const [showOrderModal, setShowOrderModal] = React.useState(false)
    const { data: ColumnData , isSuccess } = useGetColumnQuery()

    return (
        <div className="col-12">
            {showOrderModal && <AddOrderModal showModal={showOrderModal} setShowModal={setShowOrderModal} />}

            <div className="card">
                <TableHeader setShowModal={setShowOrderModal} />
                <TableWrapper column={GetColumn(ColumnData?.data)}>
                    <Row />
                    <Row />
                    <Row />
                </TableWrapper>
            </div>
        </div>
    )
}

interface TableHeaderProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
const TableHeader = ({setShowModal}: TableHeaderProps): JSX.Element => {
    return (
        <div className="card-header">
            <AddOrderBtn setShowModal={setShowModal} />
            <ImportBtn />
            <SearchBar />
            <StatusDropdown name="Status" />
        </div>
    )
}

interface AddOrderBtnProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
const AddOrderBtn = ( { setShowModal }: AddOrderBtnProps ): JSX.Element => {
    return (
        <a 
            onClick={ () => setShowModal(true) }
            type="button" 
            className="btn btn-primary mb-2" 
            >Add order
        </a>
    )
}

const ImportBtn = (): JSX.Element => {
    return (
        <button type="button" className="btn btn-rounded btn-warning">
            <span className="btn-icon-start text-warning">
                <i className="fa fa-download color-warning" />
            </span>
            Import CSV
        </button>
    )
}

const SearchBar = (): JSX.Element => {
    return (
        <input
            type="text"
            className="form-control input-rounded search-bar-custum"
            placeholder="Rechercher une commande"
        />
    )
}

interface Props {
    name: string
}
const StatusDropdown = ({ name }: Props): JSX.Element => {
    return (
        <div className="col-auto my-1">
            <select
                className="me-sm-2 default-select form-control wide"
                id="inlineFormCustomSelect"
            >
                <option selected={true}>{name}</option>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
            </select>
        </div>
    )
}