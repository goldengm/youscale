import React, { useState, useEffect } from 'react'
import { AddOrderModal, AddProductOrderModal, BulkEditAgentModal, EditOrderModal, ConfirmationModal } from '../Modal/Order'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { FaUserEdit } from 'react-icons/fa'
import { useGetColumnQuery } from '../../../services/api/ClientApi/ClientColumnApi'
import { ColumnModel, GetClientOrderModel, OrderQueryModel, ProductOrder } from '../../../models'
import { useBulkDeleteClientOrderMutation, useGetAllOrderIdQuery, useGetClientOrderExportModelQuery } from '../../../services/api/ClientApi/ClientOrderApi'
import { CSVLink } from "react-csv";
import { useGetStatusQuery } from '../../../services/api/ClientApi/ClientStatusApi'
import InfiniteScroll from 'react-infinite-scroll-component';
import TableWrapper from './TableWrapper'
import Row from './Row'
import './styles.css'

interface OrderModel { id: number, SheetId: string, checked?: boolean, id_city: number, id_team: number, Product_Orders: ProductOrder[], createdAt: Date, reportedDate: string, isSendLivo: string, telDuplicate: boolean }

type Order = {
    code: Number;
    data: GetClientOrderModel[];
    order: {
        id: number;
        id_city: number;
        isSendLivo: string;
        SheetId: string;
        id_team: number;
        Product_Orders: ProductOrder[];
        reportedDate: string;
        telDuplicate: boolean
        createdAt: Date;
    }[];
} | undefined


const GetColumn = (col: ColumnModel[] | undefined): string[] => {
    if (!col) return []

    var column: string[] = []

    col.map(dt => dt.active && column.push(dt.alias || dt.name))

    return [...column ]
}

interface TableProps {
    data: Order,
    setOrderQueryData: React.Dispatch<React.SetStateAction<OrderQueryModel>>
    setStatus: React.Dispatch<React.SetStateAction<string | undefined>>
    _skip: number,
    _setSkip: React.Dispatch<React.SetStateAction<number>>
    orders_id: number[]
    isLoading: boolean,
    refetch: () => any
}
export default function Table({ data, refetch, setOrderQueryData, _skip, _setSkip, setStatus, orders_id }: TableProps): JSX.Element {

    const [editData, setEditData] = useState<GetClientOrderModel>({ } as GetClientOrderModel)
    const [order, setOrder] = useState<OrderModel | undefined>()

    const fetchData = async () => {
        _setSkip(_skip + 50)
    }

    const [showProductOrderModal, setShowProductOrderModal] = useState(false)
    const [showOrderModal, setShowOrderModal] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const { data: ColumnData } = useGetColumnQuery()

    const [id_orders, setIdOrders] = useState<number[]>()

    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [rowData, setRowData] = useState<{ id: number, checked?: boolean, isSendLivo: string, SheetId: string, id_city: number, id_team: number, Product_Orders: ProductOrder[], createdAt: Date, reportedDate: string, telDuplicate: boolean }[] | undefined>();

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
            {showConfirmationModal && <ConfirmationModal refetch={refetch} showModal={showConfirmationModal} setShowModal={setShowConfirmationModal} id_orders={orders_id ?? []} />}
            {showEditModal && <EditOrderModal showModal={showEditModal} setShowModal={setShowEditModal} refetch={refetch} dataEdit={editData} id_order={String(order?.id)} />}
            {showProductOrderModal && <AddProductOrderModal editData={order?.Product_Orders} id={order?.id ?? 0} refetch={refetch} showModal={showProductOrderModal} setShowModal={setShowProductOrderModal} />}

            <div className="card">
                <TableHeader setShowConfirmationModal={setShowConfirmationModal} setShowModal={setShowOrderModal} id_orders={id_orders} refetch={refetch} _skip={_skip} setOrderQueryData={setOrderQueryData} setStatus={setStatus} />
                <InfiniteScroll
                    dataLength={data?.data.length || 0}
                    next={fetchData}
                    hasMore={true} // Replace with a condition based on your data source
                    loader={<p>...</p>}
                    endMessage={<p>No more data to load.</p>}
                >
                    <TableWrapper column={GetColumn(ColumnData?.data)} handleCheckAll={handleCheckAll}>
                        {
                            data ? data?.data.map((dt, index) => <Row
                                handleCheckRow={handleCheckRow}
                                row={dt}
                                setIdOrders={setIdOrders}
                                setOrder={setOrder}
                                setEditData={setEditData}
                                setShowEditModal={setShowEditModal}
                                setShowOrderModal={setShowProductOrderModal}
                                refetch={refetch}
                                order={rowData ? rowData[index] : undefined}
                                column={ColumnData?.data}
                            />) : <></>
                        }

                    </TableWrapper>
                </InfiniteScroll>
            </div>
        </div>
    )
}

interface TableHeaderProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>
    setOrderQueryData: React.Dispatch<React.SetStateAction<OrderQueryModel>>
    setStatus: React.Dispatch<React.SetStateAction<string | undefined>>
    _skip: number,
    refetch: () => any,
    id_orders: number[] | undefined
}
const TableHeader = ({ setShowModal, refetch, id_orders, setOrderQueryData, _skip, setStatus, setShowConfirmationModal }: TableHeaderProps): JSX.Element => {
    return (
        <div className="card-header">
            <DeleteBulkOrder id_orders={id_orders} refetch={refetch} />
            <EditBulkOrder id_orders={id_orders} refetch={refetch} />
            <StartConfirmationBtn setShowModal={setShowConfirmationModal} />
            <AddOrderBtn setShowModal={setShowModal} />
            <ImportBtn id_orders={id_orders} />
            <SearchBar _skip={_skip} setOrderQueryData={setOrderQueryData} refetch={refetch} />
            <StatusDropdown _skip={_skip} name="Status" setOrderQueryData={setOrderQueryData} setStatus={setStatus} refetch={refetch} />
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
        >ajouter commande
        </a>
    )
}

const StartConfirmationBtn = ({ setShowModal }: AddOrderBtnProps): JSX.Element => {
    return (
        <a
            onClick={() => setShowModal(true)}
            type="button"
            className="btn btn-primary mb-2"
        >commencer confirmation
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
            <CSVLink separator={';'} filename={'youscale_order.csv'} className="all-status-txt" data={exportData ? exportData?.data : []} headers={exportData ? exportData?.header : headers}>export de données</CSVLink>
        </button>
    )
}

interface DeleteBulkOrderProps {
    id_orders: number[] | undefined
    refetch: () => any
}
const DeleteBulkOrder = ({ id_orders, refetch }: DeleteBulkOrderProps): JSX.Element => {

    const [bulkDelete] = useBulkDeleteClientOrderMutation()

    const handleDestroyOrder = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()
        id_orders && bulkDelete({ id_orders: id_orders }).then(res => {
            console.log(res)
            refetch()
        })
    }

    return (
        <RiDeleteBin6Fill
            size={25}
            className={id_orders && id_orders?.length > 0 ? 'del-order-hov' : ''}
            color={id_orders && id_orders?.length > 0 ? 'red' : 'gray'}
            onClick={handleDestroyOrder}
        />
    )
}

interface EditBulkOrderProps {
    id_orders: number[] | undefined
    refetch: () => any
}
const EditBulkOrder = ({ id_orders, refetch }: EditBulkOrderProps): JSX.Element => {

    const [showModal, setShowModal] = useState<boolean>(false)

    const handleDestroyOrder = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()
        if(!id_orders || id_orders?.length <= 0) return

        setShowModal(true)
    }

    return (
        <>
            { showModal && <BulkEditAgentModal id_orders={id_orders} showModal={showModal} setShowModal={setShowModal} refetch={refetch} />}
            <FaUserEdit
                size={25}
                className={id_orders && id_orders?.length > 0 ? 'del-order-hov' : ''}
                color={id_orders && id_orders?.length > 0 ? 'black' : 'gray'}
                onClick={handleDestroyOrder}
            />
        </>
    )
}

interface SearchBarProps {
    setOrderQueryData: React.Dispatch<React.SetStateAction<OrderQueryModel>>,
    _skip: number,
    refetch: any
}
const SearchBar = ({ setOrderQueryData, refetch, _skip }: SearchBarProps): JSX.Element => {
    return (
        <input
            onChange={(e) => {
                setOrderQueryData({ search: e.target.value, status: '', _skip: 0, _limit: _skip })
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
    setOrderQueryData: React.Dispatch<React.SetStateAction<OrderQueryModel>>
    setStatus: React.Dispatch<React.SetStateAction<string | undefined>>
    _skip: number,
    refetch: any
}
const StatusDropdown = ({ name, setOrderQueryData, refetch, _skip, setStatus }: Props): JSX.Element => {
    const { data: dataStatus, isSuccess } = useGetStatusQuery()

    const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()

        const { value } = e.target

        setStatus(value)
        setOrderQueryData({ status: value, search: '', _skip: 0, _limit: _skip })
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
                {isSuccess && dataStatus.countOrderByStatus.map((status, index) => status.checked && <option value={status.name}>{status.name} ({status.count})</option>)}
            </select>
        </div>
    )
}