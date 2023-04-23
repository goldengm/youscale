import React, { useState } from 'react'
import { BiMessageRoundedDetail } from 'react-icons/bi'
import { DisplayChangeOuvrir, DisplayCity, DisplaySource, DisplayTeamMember, DisplayUpDown, DisplayStatus } from './OrderRowElement'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { AddProductOrderModal, EditOrderModal, HistoryOrderModal, ReportOrderModal } from '../Modal/Order'
import { ColumnModel, GetClientOrderModel, OptionsType, ProductOrder } from '../../../models'
import './styles.css'

const mock_status: OptionsType[] = [
    { label: 'Nouveau', value: 'Nouveau' },
    { label: 'Delete', value: 'Delete' },
    { label: 'Confirme', value: 'Confirme' },
    { label: 'Reporte', value: 'Reporte' },
    { label: 'Expedie', value: 'Expedie' }
]

interface RowProps {
    row: GetClientOrderModel,
    order: { id: number, SheetId: string, checked?: boolean, id_city: number, id_team: number, Product_Orders: ProductOrder[], createdAt: Date, reportedDate: string } | undefined,
    refetch: () => void,
    column: ColumnModel[] | undefined
}
export default function Row({ row, order, refetch, column }: RowProps): JSX.Element {

    const [showOrderModal, setShowOrderModal] = useState<boolean>(false)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false)
    const [showReportModal, setShowReportModal] = useState<boolean>(false)

    const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { value } = e.target

        if (value === 'Reporte') setShowReportModal(true)
    }

    return (
        <tr className='tr-custum'>
            {showOrderModal && <AddProductOrderModal showModal={showOrderModal} setShowModal={setShowOrderModal} />}
            {showEditModal && <EditOrderModal showModal={showEditModal} setShowModal={setShowEditModal} />}
            {showHistoryModal && <HistoryOrderModal showModal={showHistoryModal} setShowModal={setShowHistoryModal} />}
            {showReportModal && <ReportOrderModal showModal={showReportModal} setShowModal={setShowReportModal} />}

            <td></td>

            {
                column && column.map(dt => {
                    if (dt.active) {
                        var formatDtName = dt.name.replace(' ', '_').split(' ').join('')

                        if (formatDtName === 'Order_id') {
                            return <td>{order?.SheetId ?? row[formatDtName]}</td>
                        }

                        if (formatDtName === 'Telephone') {
                            return (
                                <td>
                                    <IoLogoWhatsapp size={25} color={'green'} />
                                    <a data-bs-toggle="modal" data-bs-target="#basicModal" href="javascript:void(0);">
                                        <strong>{row[formatDtName]}</strong>
                                    </a>
                                </td>
                            )
                        }

                        if (formatDtName === 'Agent') {
                            return (
                                <td>
                                    <DisplayTeamMember name='Malick Lafia' />
                                </td>
                            )
                        }

                        if (formatDtName === 'Up/Downsell') {
                            return (
                                <td>
                                    <DisplayUpDown name='Downsell' />
                                </td>
                            )
                        }

                        if (formatDtName === 'Source') {
                            return (
                                <td>
                                    <DisplaySource name='Facebook' />
                                </td>
                            )
                        }

                        if (formatDtName === 'Changer') {
                            return (
                                <td>
                                    <DisplayChangeOuvrir name='Oui' />
                                </td>
                            )
                        }

                        if (formatDtName === 'Ouvrir') {
                            return (
                                <td>
                                    <DisplayChangeOuvrir name='Non' />
                                </td>
                            )
                        }

                        if (formatDtName === 'Ville') {
                            return (
                                <td>
                                    <DisplayCity name='City' />
                                </td>
                            )
                        }

                        if (formatDtName === 'Status') {
                            return (
                                <td>
                                    <DisplayStatus
                                        onChange={handleChangeStatus}
                                        options={mock_status}
                                        name='Status'
                                    />
                                </td>
                            )
                        }

                        if (formatDtName === 'Message') {
                            return (
                                <td>
                                    <div className="bootstrap-popover d-inline-block">
                                        <BiMessageRoundedDetail
                                            size={30}
                                            data-bs-container="body"
                                            data-bs-toggle="popover"
                                            data-bs-placement="top"
                                            data-bs-content={row[formatDtName]}
                                            title="Message"
                                            aria-describedby="popover437986"
                                        />
                                    </div>
                                </td>
                            )
                        }

                        if (formatDtName === 'Produit') {
                            return (
                                <td>
                                    <a
                                        onClick={() => setShowOrderModal(true)}
                                        href="#addProductToOrder"
                                        className="badge badge-outline-dark"
                                    >
                                        {`
                                        ${order?.Product_Orders[0]?.quantity}*
                                        ${order?.Product_Orders[0]?.Product?.name}
                                        ${order?.Product_Orders.length === 1 ? '' : `+ ${order?.Product_Orders.length && order.Product_Orders.length - 1} Autres`}
                                    `}
                                    </a>
                                </td>
                            )
                        }

                        if (formatDtName === 'Date') return <td>{row['Date']}</td>

                        return <td>{row[formatDtName]}</td>
                    }
                })
            }

            <td>
                <a
                    onClick={() => setShowHistoryModal(true)}
                    href="javascript:void(0);"
                >
                    <strong>View</strong>
                </a>
            </td>
            
            <td>
                <div className="d-flex">
                    <a
                        onClick={() => setShowEditModal(true)}
                        href="#"
                        className="btn btn-primary shadow btn-xs sharp me-1"
                    >
                        <i className="fas fa-pencil-alt" />
                    </a>
                    <a href="#" className="btn btn-danger shadow btn-xs sharp">
                        <i className="fa fa-trash" />
                    </a>
                </div>
            </td>
        </tr>
    )
}
