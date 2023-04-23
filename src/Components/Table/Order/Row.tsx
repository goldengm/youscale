import React, { useState, useEffect } from 'react'
import { BiMessageRoundedDetail } from 'react-icons/bi'
import { DisplayChangeOuvrir, DisplayCity, DisplaySource, DisplayTeamMember, DisplayUpDown, DisplayStatus } from './OrderRowElement'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { AddProductOrderModal, EditOrderModal, HistoryOrderModal, ReportOrderModal } from '../Modal/Order'
import { CityModel, ColumnModel, GetClientOrderModel, OptionsType, ProductOrder, StatusModel } from '../../../models'
import './styles.css'
import { useGetSettingQuery } from '../../../services/api/ClientApi/ClientSettingApi'
import { useGetCityQuery } from '../../../services/api/ClientApi/ClientCityApi'
import { useGetStatusQuery } from '../../../services/api/ClientApi/ClientStatusApi'
import { usePatchClientOrderMutation } from '../../../services/api/ClientApi/ClientOrderApi'
import { useGetTeamMemberQuery } from '../../../services/api/ClientApi/ClientTeamMemberApi'

interface RowProps {
    row: GetClientOrderModel,
    order: { id: number, SheetId: string, checked?: boolean, id_city: number, id_team: number, Product_Orders: ProductOrder[], createdAt: Date, reportedDate: string } | undefined,
    refetch: () => void,
    column: ColumnModel[] | undefined
}
export default function Row({ row, order, refetch, column }: RowProps): JSX.Element {

    const [patchOrder] = usePatchClientOrderMutation()

    const { data: dataSetting } = useGetSettingQuery()
    const { data: dataCity } = useGetCityQuery()
    const { data: dataStatus, refetch: RefetchStatus } = useGetStatusQuery()
    const { data: dataTeamMember } = useGetTeamMemberQuery()

    useEffect(() => {
        RefetchStatus()
    }, [])

    const [message] = useState(dataSetting?.data.automated_msg || '');

    const [showOrderModal, setShowOrderModal] = useState<boolean>(false)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false)
    const [showReportModal, setShowReportModal] = useState<boolean>(false)

    const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { value } = e.target

        patchOrder({ id: order?.id, status: value }).unwrap().then(() => refetch && refetch())

        if (value === 'Reporte') setShowReportModal(true)
    }

    const handleChangeSource = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { value } = e.target

        patchOrder({ id: order?.id, source: value }).then(() => refetch())
    }

    const handleChangeTeam = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { value } = e.target

        patchOrder({ id: order?.id, id_team: Number(value), prev_id_team: order ? order.id_team : 0 }).unwrap().then(() => refetch && refetch()).catch((err) => { alert(err.data.message); refetch && refetch() })
    }

    const handleChangeOuvrir = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { value } = e.target

        patchOrder({ id: order?.id, ouvrir: value }).unwrap().then(() => refetch && refetch())
    }

    const handleChangeChanger = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { value } = e.target

        patchOrder({ id: order?.id, changer: value }).unwrap().then(() => refetch && refetch())
    }

    const handleChangeUpDown = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { value } = e.target

        patchOrder({ id: order?.id, updownsell: value }).unwrap().then(() => refetch && refetch())
    }

    const FilterStatusData = (data: StatusModel[] | undefined) => {
        if (!data) return []
        var newArr = data.filter((dt: StatusModel) => dt.checked === true)
        return newArr
    }

    const GetCityWhosFromSheet = (data: CityModel[] | undefined): CityModel[] => {
        if (!data) return []

        var newArr: CityModel[] = []

        for (let i = 0; i < data.length; i++) {
            if (data[i].isFromSheet === true) {
                newArr.push(data[i])
            }
        }

        return newArr
    }

    const handleClick = (phone_number: string) => {
        window.open(`https://wa.me/${phone_number}?text=${encodeURI(message)}`, "_blank");
    };

    return (
        <tr className='tr-custum'>
            {showOrderModal && <AddProductOrderModal editData={order?.Product_Orders} id={order?.id ?? 0} refetch={refetch} showModal={showOrderModal} setShowModal={setShowOrderModal} />}
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
                                    <IoLogoWhatsapp className='io-logo' onClick={() => handleClick('+212' + row[formatDtName])} size={25} color={'green'} />
                                    <a data-bs-toggle="modal" data-bs-target="#basicModal" href={`tel:+212${row[formatDtName]}`}>
                                        <strong>{row[formatDtName]}</strong>
                                    </a>
                                </td>
                            )
                        }

                        if (formatDtName === 'Agent') {
                            return (
                                <td>
                                    <DisplayTeamMember 
                                        onChange={handleChangeTeam}
                                        data={dataTeamMember?.data} 
                                        order={order}
                                    />
                                </td>
                            )
                        }

                        if (formatDtName === 'Up/Downsell') {
                            return (
                                <td>
                                    <DisplayUpDown 
                                        onChange={handleChangeUpDown}
                                        currentData={row}
                                    />
                                </td>
                            )
                        }

                        if (formatDtName === 'Source') {
                            return (
                                <td>
                                    <DisplaySource 
                                        onChange={handleChangeSource}  
                                        currentData={row}
                                    />
                                </td>
                            )
                        }

                        if (formatDtName === 'Changer') {
                            return (
                                <td>
                                    <DisplayChangeOuvrir 
                                        name='changer' 
                                        onChange={handleChangeChanger}
                                        currentData={row}
                                    />
                                </td>
                            )
                        }

                        if (formatDtName === 'Ouvrir') {
                            return (
                                <td>
                                    <DisplayChangeOuvrir 
                                        name='ouvrir' 
                                        onChange={handleChangeOuvrir}
                                        currentData={row}
                                    />
                                </td>
                            )
                        }

                        if (formatDtName === 'Ville') {
                            return (
                                <td>
                                    <DisplayCity refetch={refetch} name='id_city' data={order?.SheetId ? GetCityWhosFromSheet(dataCity?.data) : dataCity ? dataCity.data : []} order={order && order}  />
                                </td>
                            )
                        }

                        if (formatDtName === 'Status') {
                            return (
                                <td>
                                    <DisplayStatus
                                        currentData={row}
                                        statusData={FilterStatusData(dataStatus?.data)}
                                        onChange={handleChangeStatus}
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
