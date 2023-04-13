import React, { useState } from 'react'
import { BiMessageRoundedDetail } from 'react-icons/bi'
import { DisplayChangeOuvrir, DisplayCity, DisplaySource, DisplayTeamMember, DisplayUpDown, DisplayStatus } from './OrderRowElement'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { AddProductOrderModal, EditOrderModal } from '../Modal/Order'
import './styles.css'

export default function Row() {
    const [showOrderModal, setShowOrderModal] = useState<boolean>(false)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)

    return (
        <tr className='tr-custum'>
            {showOrderModal && <AddProductOrderModal showModal={showOrderModal} setShowModal={setShowOrderModal} />}
            {showEditModal && <EditOrderModal showModal={showEditModal} setShowModal={setShowEditModal} />}

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
                <DisplayStatus name='Status' />
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
                <a href="javascript:void(0);">
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
