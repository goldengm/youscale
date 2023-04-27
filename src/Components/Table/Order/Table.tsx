import React, { useState, useEffect } from 'react'
import Row from './Row'
import { AddOrderModal } from '../Modal/Order'
import TableWrapper from './TableWrapper'
import './styles.css'
import { useGetColumnQuery } from '../../../services/api/ClientApi/ClientColumnApi'
import { ColumnModel, GetClientOrderModel, OrderQueryModel, ProductOrder } from '../../../models'
import { RotatingLines } from 'react-loader-spinner'
import { useGetClientOrderExportModelQuery } from '../../../services/api/ClientApi/ClientOrderApi'
import { CSVLink } from "react-csv";
import { useGetStatusQuery } from '../../../services/api/ClientApi/ClientStatusApi'

type Order = {
    code: Number;
    data: GetClientOrderModel[];
    order: {
        id: number;
        id_city: number;
        SheetId: string;
        id_team: number;
        Product_Orders: ProductOrder[];
        reportedDate: string;
        createdAt: Date;
    }[];
} | undefined

const GetColumn = (col: ColumnModel[] | undefined): string[] => {
    if (!col) return []

    var column: string[] = []

    col.map(dt => dt.active && column.push(dt.alias || dt.name))

    return [...column, 'history']
}

interface TableProps {
    data: Order,
    setOrderQueryData: React.Dispatch<React.SetStateAction<OrderQueryModel>>,
    refetch: () => any
}
export default function Table({ data, refetch, setOrderQueryData }: TableProps): JSX.Element {
    const [showOrderModal, setShowOrderModal] = React.useState(false)
    const { data: ColumnData } = useGetColumnQuery()

    const [id_orders, setIdOrders] = useState<number[]>()

    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [rowData, setRowData] = useState<{ id: number, checked?: boolean, SheetId: string, id_city: number, id_team: number, Product_Orders: ProductOrder[], createdAt: Date, reportedDate: string }[] | undefined>();

    useEffect(() => {
        setRowData(data?.order);
    }, [data?.order]);

    const handleCheckAll = () => {
        const newRows = data?.order && data?.order.map((row) => ({
            ...row,
            checked: !selectAll,
        }));
        setSelectAll(!selectAll);

        const newIdOrders = newRows && newRows.filter((row) => row.checked).map((row) => row.id);
        setIdOrders(newIdOrders);

        setRowData(newRows); // Do whatever you want with the checked rows
    };

    const handleCheckRow = (id: number) => {
        const newRows = rowData && rowData.map((row) => {
            if (row.id === id) {
                return {
                    ...row,
                    checked: !row.checked,
                };
            }
            return row;
        });

        const newIdOrders = newRows && newRows.filter((row) => row.checked).map((row) => row.id);
        setIdOrders(newIdOrders);
        setRowData(newRows); // Do whatever you want with the checked rows
    };

    return (
        <div className="col-12">
            {showOrderModal && <AddOrderModal refetch={refetch} showModal={showOrderModal} setShowModal={setShowOrderModal} />}

            <div className="card">
                <TableHeader setShowModal={setShowOrderModal} id_orders={id_orders} refetch={refetch} setOrderQueryData={setOrderQueryData} />
                <TableWrapper column={GetColumn(ColumnData?.data)} handleCheckAll={handleCheckAll}>
                    {
                        data ? data.data.map((dt, index) => <Row
                            handleCheckRow={handleCheckRow}
                            row={dt}
                            setIdOrders={setIdOrders}
                            refetch={refetch}
                            order={rowData ? rowData[index] : undefined}
                            column={ColumnData?.data}
                        />) :
                            <RotatingLines
                                strokeColor="grey"
                                strokeWidth="3"
                                animationDuration="0.75"
                                width="50"
                                visible={true}
                            />
                    }
                </TableWrapper>
            </div>
        </div>
    )
}

interface TableHeaderProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setOrderQueryData: React.Dispatch<React.SetStateAction<OrderQueryModel>>,
    refetch: () => any,
    id_orders: number[] | undefined
}
const TableHeader = ({ setShowModal, refetch, id_orders, setOrderQueryData }: TableHeaderProps): JSX.Element => {
    return (
        <div className="card-header">
            <AddOrderBtn setShowModal={setShowModal} />
            <ImportBtn id_orders={id_orders} />
            <SearchBar setOrderQueryData={setOrderQueryData} refetch={refetch} />
            <StatusDropdown name="Status" setOrderQueryData={setOrderQueryData} refetch={refetch} />
        </div>
    )
}

interface AddOrderBtnProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
const AddOrderBtn = ({ setShowModal }: AddOrderBtnProps): JSX.Element => {
    return (
        <a
            onClick={() => setShowModal(true)}
            type="button"
            className="btn btn-primary mb-2"
        >Add order
        </a>
    )
}

interface ImportBtnProps {
    id_orders: number[] | undefined
}
const ImportBtn = ({ id_orders }: ImportBtnProps): JSX.Element => {

    const { data: exportData, refetch } = useGetClientOrderExportModelQuery({
        id_orders: JSON.stringify(id_orders)
    })

    useEffect(() => {
        refetch()
    }, [id_orders])

    const headers: { label: string, key: string }[] = []

    return (
        <button
            onClick={() => console.log(id_orders)}
            type="button"
            className="btn btn-rounded btn-warning">
            <span className="btn-icon-start text-warning">
                <i className="fa fa-download color-warning" />
            </span>
            <CSVLink separator={';'} filename={'youscale_order.csv'} className="all-status-txt" data={exportData ? exportData?.data : []} headers={exportData ? exportData?.header : headers}>Export data</CSVLink>
        </button>
    )
}

interface SearchBarProps {
    setOrderQueryData: React.Dispatch<React.SetStateAction<OrderQueryModel>>,
    refetch: any
}
const SearchBar = ({ setOrderQueryData, refetch }: SearchBarProps): JSX.Element => {
    return (
        <input
            onChange={(e) => {
                setOrderQueryData({ search: e.target.value, status: '' })
                refetch()
            }}
            type="text"
            className="form-control input-rounded search-bar-custum"
            placeholder="Rechercher une commande"
        />
    )
}

interface Props {
    name: string,
    setOrderQueryData: React.Dispatch<React.SetStateAction<OrderQueryModel>>,
    refetch: any
}
const StatusDropdown = ({ name, setOrderQueryData, refetch }: Props): JSX.Element => {
    const { data: dataStatus, isSuccess } = useGetStatusQuery()

    const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        e.preventDefault()

        const { value } = e.target

        setOrderQueryData({ status: value, search: '' })
        refetch()
    }

    return (
        <div className="col-auto my-1">
            <select
                onChange={handleChangeStatus}
                className="me-sm-2 form-control wide"
                id="inlineFormCustomSelect"
            >
                <option selected={true}>{name}</option>
                { isSuccess && dataStatus.countOrderByStatus.map((status: any, index) => <option value={status.name}>{status.name} ({status.count})</option>) }
            </select>
        </div>
    )
}