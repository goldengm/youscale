import React, { useEffect } from 'react'
import Row from './Row'
import { AddOrderModal } from '../Modal/Order'
import './styles.css'

export default function Table() {
    const [showOrderModal, setShowOrderModal] = React.useState(false)

    return (
        <div className="col-12">

            {showOrderModal && <AddOrderModal showModal={showOrderModal} setShowModal={setShowOrderModal} />}

            <div className="card">
                <TableHeader setShowModal={setShowOrderModal} />
                <div className="card-body">
                    <div className="table-responsive">
                        <table id="example3" className="display table-custum">
                            <thead>
                                <tr>
                                    <th />
                                    <th>Order Id</th>
                                    <th>Date</th>
                                    <th>Produit</th>
                                    <th>Nom</th>
                                    <th>Telephone</th>
                                    <th>Ville</th>
                                    <th>Prix</th>
                                    <th>Status</th>
                                    <th>Message</th>
                                    <th>Adresse</th>
                                    <th>Source</th>
                                    <th>Agent</th>
                                    <th>Last Action</th>
                                    <th>Up/Downsell</th>
                                    <th>Changer</th>
                                    <th>Ouvrir</th>
                                    <th>history</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Row />
                                <Row />
                                <Row />
                            </tbody>
                        </table>
                    </div>
                </div>
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