import React, { useState, useEffect } from 'react'
import { RiFileDownloadFill } from 'react-icons/ri'
import { AddStatusModal, AddCityModal, EditCityModal } from '../../Table/Modal/Setting';
import { useGetStatusQuery, usePatchStatusMutation } from '../../../services/api/ClientApi/ClientStatusApi';
import { ColumnModel, StatusModel } from '../../../models';
import 'react-nestable/dist/styles/index.css';
import { useGetColumnQuery, usePatchColumnMutation } from '../../../services/api/ClientApi/ClientColumnApi';

export default function OrderSetting() {
    const [showAddStatusModal, setShowAddStatusModal] = useState<boolean>(false)
    const [showAddCityModal, setShowAddCityModal] = useState<boolean>(false)
    const [showEditCityModal, setShowEditCityModal] = useState<boolean>(false)

    const { data: statusData, refetch: refetchStatus } = useGetStatusQuery()
    const { data, refetch } = useGetColumnQuery()

    return (
        <div className="row">
            {showAddStatusModal && <AddStatusModal setShowModal={setShowAddStatusModal} showModal={showAddStatusModal} refetch={refetchStatus} />}
            {showAddCityModal && <AddCityModal setShowModal={setShowAddCityModal} showModal={showAddCityModal} />}
            {showEditCityModal && <EditCityModal setShowModal={setShowEditCityModal} showModal={showEditCityModal} />}

            <h3 className="mt-4 mb-3">Order Settings</h3>
            <Status setShowAddStatusModal={setShowAddStatusModal} statusData={statusData?.data} refetchStatus={refetchStatus} />
            <CSVExport statusData={data?.data} refetchStatus={refetchStatus} />
            <ChangeColumn />
            <ColumnOfOrder />
            <City setShowAddCityModal={setShowAddCityModal} setShowEditCityModal={setShowEditCityModal} />
            <ConfSetting />
        </div>
    )
}

interface StatusProps {
    setShowAddStatusModal: React.Dispatch<React.SetStateAction<boolean>>,
    statusData: StatusModel[] | undefined,
    refetchStatus: () => any
}
const Status = ({ setShowAddStatusModal, statusData, refetchStatus }: StatusProps): JSX.Element => {

    return (
        <div className="col-xl-6 col-lg-6">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Status</h4>

                    <a
                        onClick={() => setShowAddStatusModal(true)}
                        type="button"
                        className="btn btn-primary mb-2">
                        Add status
                    </a>
                </div>
                <div className="card-body">
                    <div className="row">
                        {statusData && statusData.map(dt => <StatusCheckbox dt={dt} refetch={refetchStatus} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

interface StatusCheckboxProps {
    dt: StatusModel,
    refetch: () => any
}
const StatusCheckbox = ({ dt, refetch }: StatusCheckboxProps): JSX.Element => {
    const [patchStatus] = usePatchStatusMutation()

    const handleStatusCheckbox = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {

        const data = { id: dt.id ?? 0, checked: !dt.checked }

        patchStatus(data).unwrap()
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                alert(err.data.message)
            })

        refetch()
    }

    return (
        <div className="col-xl-4 col-xxl-6 col-6">
            <div className="form-check custom-checkbox mb-3">
                <input
                    onClick={handleStatusCheckbox}
                    defaultChecked={dt.checked}
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox1"
                />
                <label className="form-check-label" htmlFor="customCheckBox1">
                    {dt.name}
                </label>
            </div>
        </div>
    )
}

interface CSVExportProps {
    statusData: ColumnModel[] | undefined,
    refetchStatus: () => any
}
const CSVExport = ({ statusData, refetchStatus }: CSVExportProps): JSX.Element => {
    return (
        <div className="col-xl-6 col-lg-6">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Export csv column</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        {statusData && statusData.map(dt => <CSVStatusCheckbox dt={dt} refetch={refetchStatus} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

interface CSVStatusCheckboxProps {
    dt: ColumnModel,
    refetch: () => any
}
const CSVStatusCheckbox = ({ dt, refetch }: CSVStatusCheckboxProps): JSX.Element => {

    const [patchColumn] = usePatchColumnMutation()

    const handleStatusCheckbox = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {

        const data = { id: dt.id ?? 0, isExported: !dt.isExported }

        patchColumn(data).unwrap()
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                alert(err.data.message)
            })

        refetch()
    }

    return (
        <div className="col-xl-4 col-xxl-6 col-6">
            <div className="form-check custom-checkbox mb-3">
                <input
                    onClick={handleStatusCheckbox}
                    defaultChecked={dt.isExported}
                    type="checkbox"
                    className="form-check-input"
                    id="customCheckBox1"
                />
                <label className="form-check-label" htmlFor="customCheckBox1">
                    {dt.name}
                </label>
            </div>
        </div>
    )
}

const ChangeColumn = (): JSX.Element => {
    return (
        <div className="col-xl-6 col-lg-6">
            <div className="card">
                <div className="card-body">
                    <div className="basic-form">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Add alias to column</label>
                                <select
                                    className="default-select  form-control wide"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>

                            </div>
                            <div className="col mt-2 mt-sm-0">
                                <input type="text" className="form-control" placeholder="alias" />
                            </div>

                            <button type="button" className="btn btn-outline-primary btn-xs">
                                Change
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ColumnOfOrder = (): JSX.Element => {
    useEffect(() => {
        setTimeout(() => {
            const draggables = document.querySelectorAll('.col-order')

            const activeContainer = document.querySelector('.active-column')
            const innactiveContainer = document.querySelector('.inactive-column')

            draggables.forEach(draggable => {
                draggable.addEventListener('dragstart', () => {
                    draggable.classList.add('dragging')
                })

                draggable.addEventListener('dragend', () => {
                    draggable.classList.remove('dragging')
                })
            })

            activeContainer?.addEventListener('dragover', e => {

                e.preventDefault()
                const draggable = document.querySelector('.dragging')

                draggable && activeContainer.appendChild(draggable)
            })

            innactiveContainer?.addEventListener('dragover', e => {
                e.preventDefault()
                const draggable = document.querySelector('.dragging')


                draggable && innactiveContainer.appendChild(draggable)
            })

        }, 2000);
    })

    return (
        <div className="col-12">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Column</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card-content">
                                <div className="nestable">
                                    <div className="dd" id="nestable">
                                        <h3>Active</h3>
                                        <ol className="dd-list active-column">
                                            <li draggable={true} className="dd-item col-order" data-id={3}>
                                                <div className="dd-handle">Order ID</div>
                                            </li>
                                            <li draggable={true} className="dd-item col-order" data-id={1}>
                                                <div className="dd-handle">Product</div>
                                            </li>
                                            <li draggable={true} className="dd-item col-order" data-id={13}>
                                                <div className="dd-handle">Nom</div>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card-content">
                                <div className="nestable">
                                    <div className="dd" id="nestable2">
                                        <h3>Innactive</h3>
                                        <ol className="dd-list inactive-column">
                                            <li draggable={true} className="dd-item col-order" data-id={14}>
                                                <div className="dd-handle">Telephone</div>
                                            </li>
                                            <li draggable={true} className="dd-item col-order" data-id={15}>
                                                <div className="dd-handle">Date</div>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface CityProps {
    setShowAddCityModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowEditCityModal: React.Dispatch<React.SetStateAction<boolean>>
}
const City = ({ setShowAddCityModal, setShowEditCityModal }: CityProps): JSX.Element => {

    return (
        <div className="col-12">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">City</h4>

                    <a
                        onClick={() => setShowAddCityModal(true)}
                        type="button"
                        className="btn btn-primary mb-2"
                    >
                        Add city
                    </a>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-responsive-sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nom</th>
                                                <th>Prix</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>1</th>
                                                <td>Abidjan</td>
                                                <td>1200 dhs</td>
                                                <td>
                                                    <div className="d-flex">
                                                        <a onClick={() => setShowEditCityModal(true)} href="#" className="btn btn-primary shadow btn-xs sharp me-1">
                                                            <i className="fas fa-pencil-alt" />
                                                        </a>
                                                        <a href="#" className="btn btn-danger shadow btn-xs sharp">
                                                            <i className="fa fa-trash" />
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-6">
                            <DragAndDropFile />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface DragAndDropFileProps {
    refetch?: any
}
function DragAndDropFile({ }: DragAndDropFileProps) {
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState<any>(null);

    const handleDragOver = (event: any) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];
        setFile(selectedFile);
        setDragging(false);
    };

    function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files || event.target.files.length === 0) {
            setFile(undefined)
            return
        }
        const file = event.target.files[0];

        setFile(file)
    }

    return (
        <div
            className="drag-and-drop-file"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {dragging ? (
                <>
                    <RiFileDownloadFill />
                    <div className='drag-txt'>Déposer le fichier ici</div>

                </>
            ) : (
                <>
                    <RiFileDownloadFill size={50} color='gray' />
                    <label htmlFor="payment_image" className='drag-txt'>Glissez et deposez un fichier excel</label>
                    <input type="file" id="payment_image" onChange={handleFileSelect} name="payment_image" accept="text/csv" />
                </>
            )}
            {file && <p className='drag-txt'> : {file.name}</p>}
            {file && <button onClick={() => console.log('send data')}>Envoyer</button>}
        </div>
    );
}

const ConfSetting = (): JSX.Element => {

    return (
        <div className="col-12">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Configuration</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label col-form-label-sm">Default confirmation pricing</label>
                            <div className="col-sm-10">
                                <input
                                    type="number"
                                    placeholder="10"
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label col-form-label-sm">Default delivery pricing</label>
                            <div className="col-sm-10">
                                <input
                                    type="number"
                                    placeholder="10"
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label col-form-label-sm">Default time between each action</label>
                            <div className="col-sm-10">
                                <input
                                    type="number"
                                    placeholder="10"
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label col-form-label-sm">Start world order</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    placeholder="salam"
                                    className="form-control form-control-sm"
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label col-form-label-sm">Automated message</label>
                            <textarea className="form-control" rows={4} id="comment" defaultValue={""} />
                        </div>
                    </div>

                    <button type="button" className="btn btn-primary btn-sm">
                        Enregistrer
                    </button>
                    <br /><br />
                    <button type="button" className="btn btn-outline-info btn-xxs">
                        Modifier le mot de passe
                    </button>
                </div>
            </div>
        </div>
    )
}