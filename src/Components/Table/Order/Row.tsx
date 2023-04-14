import React, { useState } from 'react'
import { BiMessageRoundedDetail } from 'react-icons/bi'
import { DisplayChangeOuvrir, DisplayCity, DisplaySource, DisplayTeamMember, DisplayUpDown, DisplayStatus } from './OrderRowElement'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { AddProductOrderModal, EditOrderModal, HistoryOrderModal, ReportOrderModal } from '../Modal/Order'
import { OptionsType } from '../../../models'
import './styles.css'

const mock_status : OptionsType[] = [
    {label: 'Nouveau', value: 'Nouveau'},
    {label: 'Delete', value: 'Delete'},
    {label: 'Confirme', value: 'Confirme'},
    {label: 'Reporte', value: 'Reporte'},
    {label: 'Expedie', value: 'Expedie'}
]

export default function Row() {
    const [showOrderModal, setShowOrderModal] = useState<boolean>(false)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false)
    const [showReportModal, setShowReportModal] = useState<boolean>(false)

    const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { value } = e.target 
        
        if(value === 'Reporte') setShowReportModal(true)
    }

    return (
        <tr className='tr-custum'>
            {showOrderModal && <AddProductOrderModal showModal={showOrderModal} setShowModal={setShowOrderModal} />}
            {showEditModal && <EditOrderModal showModal={showEditModal} setShowModal={setShowEditModal} />}
            {showHistoryModal && <HistoryOrderModal showModal={showHistoryModal} setShowModal={setShowHistoryModal} />}
            {showReportModal && <ReportOrderModal showModal={showReportModal} setShowModal={setShowReportModal} />}

            <td></td>
            
            <td>DAKAR458</td>
            <td>31/03/2023</td>
            <td>
                <a 
                    onClick={() => setShowOrderModal(true)}
                    href="#addProductToOrder" 
                    className="badge badge-outline-dark"
                >
                    2* zakaria1212
                </a>
            </td>
            <td>M.COM., P.H.D.</td>
            <td>
                <IoLogoWhatsapp size={25} color={'green'} />
                <a data-bs-toggle="modal" data-bs-target="#basicModal" href="javascript:void(0);">
                    <strong>123 456 7890</strong>
                </a>
            </td>
            <td>
                <DisplayCity name='City' />
            </td>
            <td>1000</td>
            <td>
                <DisplayStatus 
                    onChange={handleChangeStatus}
                    options={mock_status}
                    name='Status' 
                />
            </td>
            <td>
                <div className="bootstrap-popover d-inline-block">
                    <BiMessageRoundedDetail
                        size={30}
                        data-bs-container="body"
                        data-bs-toggle="popover"
                        data-bs-placement="top"
                        data-bs-content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor."
                        title="Popover in Right"
                        aria-describedby="popover437986"
                    />
                </div>

            </td>
            <td>Adresse</td>
            <td>
                <DisplaySource name='Facebook' />
            </td>
            <td>
                <DisplayTeamMember name='Malick Lafia' />
            </td>
            <td>13 Mars</td>
            <td>
                <DisplayUpDown name='Downsell' />
            </td>
            <td>
                <DisplayChangeOuvrir name='Non' />
            </td>
            <td>
                <DisplayChangeOuvrir name='Oui' />
            </td>
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
