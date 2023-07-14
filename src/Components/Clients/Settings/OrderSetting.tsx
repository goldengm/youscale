import React, { useState, useEffect } from 'react'
import { RiFileDownloadFill } from 'react-icons/ri'
import { AddStatusModal, AddCityModal, EditCityModal, DeleteCityModal, EditPasswordModal } from '../../Table/Modal/Setting';
import { useGetStatusQuery, usePatchStatusMutation } from '../../../services/api/ClientApi/ClientStatusApi';
import { CityModel, ColumnModel, ColumnPatchModel, ErrorModel, StatusModel } from '../../../models';
import 'react-nestable/dist/styles/index.css';
import { useGetColumnQuery, usePatchColumnMutation } from '../../../services/api/ClientApi/ClientColumnApi';
import { useGetCityQuery } from '../../../services/api/ClientApi/ClientCityApi';
import { CLIENT_UPLOAD_CITY_URL } from '../../../services/url/API_URL';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useGetSettingQuery, usePatchSettingMutation } from '../../../services/api/ClientApi/ClientSettingApi';
import { showToastError } from '../../../services/toast/showToastError';
import { showToastSucces } from '../../../services/toast/showToastSucces';
import { ColorPicker } from '../../Input';

type Inputs = {
    default_conf_pricing: string,
    delfault_del_pricing: string,
    default_time: string,
    automated_msg: string
    startWrldOrder: string
};

const schema = yup.object().shape({
    default_conf_pricing: yup.string().notRequired(),
    delfault_del_pricing: yup.string().notRequired(),
    default_time: yup.string().notRequired(),
    automated_msg: yup.string().notRequired(),
    startWrldOrder: yup.string().notRequired()
}).required();

const SplitActiveInnactive = (data: ColumnModel[] | undefined) => {

    const active = data && data.filter(dt => dt.active && dt)
    const innactive = data && data.filter(dt => !dt.active && dt)

    var obj = {
        'active': active,
        'innactive': innactive
    }

    return obj
}

export default function OrderSetting() {
    const [showAddStatusModal, setShowAddStatusModal] = useState<boolean>(false)
    const [showAddCityModal, setShowAddCityModal] = useState<boolean>(false)
    const [showEditCityModal, setShowEditCityModal] = useState<boolean>(false)

    const [showDeleteCityModal, setShowDeleteCityModal] = useState<boolean>(false)

    const [showEditPasswordModal, setShowEditPasswordModal] = useState<boolean>(false)

    const { data: statusData, refetch: refetchStatus } = useGetStatusQuery()
    const { data, refetch } = useGetColumnQuery()

    const [item, setItem] = useState<CityModel>()
    const { data: cityData, refetch: refetchData } = useGetCityQuery()

    const objData = SplitActiveInnactive(data?.data)

    return (
        <div className="row">
            {showAddStatusModal && <AddStatusModal setShowModal={setShowAddStatusModal} showModal={showAddStatusModal} refetch={refetchStatus} />}

            {showAddCityModal && <AddCityModal setShowModal={setShowAddCityModal} refetch={refetchData} showModal={showAddCityModal} />}
            {showEditCityModal && <EditCityModal item={item} setShowModal={setShowEditCityModal} refetch={refetchData} showModal={showEditCityModal} />}
            {showDeleteCityModal && <DeleteCityModal id_city={item?.id ? String(item?.id) : ''} setShowModal={setShowDeleteCityModal} refetch={refetchData} showModal={showDeleteCityModal} />}
            {showEditPasswordModal && <EditPasswordModal setShowModal={setShowEditPasswordModal} showModal={showEditPasswordModal} />}

            <h3 className="mt-4 mb-3">Order Settings</h3>
            <Status setShowAddStatusModal={setShowAddStatusModal} statusData={statusData?.data} refetchStatus={refetchStatus} />
            <CSVExport statusData={data?.data} refetchStatus={refetchStatus} />
            <ChangeColumn />
            <ColumnOfOrder objData={objData} refetch={refetch} />
            <City setShowAddCityModal={setShowAddCityModal} refetch={refetchData} setShowDeleteCityModal={setShowDeleteCityModal} setShowEditCityModal={setShowEditCityModal} data={cityData?.data} setItem={setItem} />
            <ConfSetting setShowEditPasswordModal={setShowEditPasswordModal} />
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
            .catch((err: { data: ErrorModel | { message: string }, status: number }) => {
                if (err.data) {
                    if ('errors' in err.data && Array.isArray(err.data.errors) && err.data.errors.length > 0) showToastError(err.data.errors[0].msg);
                    else if ('message' in err.data) showToastError(err.data.message);
                }
            })

        refetch()
    }

    const handleChangeColor = (color: string) => {

        const data = { id: dt.id ?? 0, color: color }

        patchStatus(data).unwrap()
            .then(res => {
                console.log(res)
            })
            .catch((err: { data: ErrorModel | { message: string }, status: number }) => {
                if (err.data) {
                    if ('errors' in err.data && Array.isArray(err.data.errors) && err.data.errors.length > 0) showToastError(err.data.errors[0].msg);
                    else if ('message' in err.data) showToastError(err.data.message);
                }
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
            <ColorPicker color={dt.color} handleChangeColor={handleChangeColor} />
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
            .then((res: any) => {
                console.log(res)
            })
            .catch((err: { data: ErrorModel | { message: string }, status: number }) => {
                if (err.data) {
                    if ('errors' in err.data && Array.isArray(err.data.errors) && err.data.errors.length > 0) showToastError(err.data.errors[0].msg);
                    else if ('message' in err.data) showToastError(err.data.message);
                }
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
                    {dt.alias ?? dt.name}
                </label>
            </div>
        </div>
    )
}

const ChangeColumn = (): JSX.Element => {

    const { data, refetch } = useGetColumnQuery()
    const [alias, setAlias] = useState<string>()
    const [id, setId] = useState<number>()
    const [patchColumn] = usePatchColumnMutation()

    useEffect(() => {
        setId(data?.data[0].id ?? 0)
        setAlias(data?.data[0].alias ?? 'no alias')
    }, [data])

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target

        setId(JSON.parse(value).id)
        setAlias(JSON.parse(value).alias ?? 'no alias')
    }

    const handleChangeAlias = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        setAlias(value)
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        patchColumn({ id, alias }).unwrap().then(() => {
            refetch()
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="col-xl-6 col-lg-6">
            <div className="card">
                <div className="card-body">
                    <div className="basic-form">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Add alias to column</label>
                                <select
                                    name={'alias'}
                                    onChange={handleChangeSelect}
                                    className="form-control"
                                >
                                    {data && data.data.map((dt: any) => (<option value={JSON.stringify(dt)}>{dt.name}</option>))}
                                </select>

                            </div>
                            <div className="col mt-2 mt-sm-0">
                                <input
                                    onChange={handleChangeAlias}
                                    type="text"
                                    className="form-control"
                                    placeholder="alias"
                                    value={alias}
                                />
                            </div>

                            {
                                alias &&
                                <button
                                    onClick={handleSubmit}
                                    type="button"
                                    className="btn btn-outline-primary btn-xs"
                                >
                                    Change
                                </button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ColumnOfOrderCardProps {
    refetch: () => any,
    objData: { active: ColumnModel[] | undefined, innactive: ColumnModel[] | undefined }
}
const ColumnOfOrder = ({ refetch, objData }: ColumnOfOrderCardProps): JSX.Element => {

    const [updated, setUpdated] = useState<boolean>(false)
    const [dataUpdated, setDataUpdated] = useState<ColumnPatchModel>()

    const [patchColumn] = usePatchColumnMutation()

    useEffect(() => {
        if (dataUpdated) {
            patchColumn(dataUpdated).unwrap()
                .then(res => console.log(res))
                .catch((err: { data: ErrorModel | { message: string }, status: number }) => {
                    if (err.data) {
                        if ('errors' in err.data && Array.isArray(err.data.errors) && err.data.errors.length > 0) showToastError(err.data.errors[0].msg);
                        else if ('message' in err.data) showToastError(err.data.message);
                    }
                })
        }
    }, [updated])

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

                const patchData: ColumnPatchModel = { id: draggable?.id, active: true }

                setDataUpdated(patchData)
                setUpdated(true)

                draggable && activeContainer.appendChild(draggable)
            })

            innactiveContainer?.addEventListener('dragover', e => {
                e.preventDefault()
                const draggable = document.querySelector('.dragging')

                const patchData: ColumnPatchModel = { id: draggable?.id, active: false }

                setDataUpdated(patchData)
                setUpdated(false)

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
                        <Column data={objData.active} className={'active-column'} title='Active columns' />
                        <Column data={objData.innactive} className={'inactive-column'} title='Inactive columns' />
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ColumnProps {
    title: string,
    className: string,
    data: ColumnModel[] | undefined
}
const Column = ({ title, className, data }: ColumnProps): JSX.Element => {
    return (
        <div className="col-md-6">
            <div className="card-content">
                <div className="nestable">
                    <div className="dd" id="nestable">
                        <h3>{title}</h3>
                        <ol className={`dd-list ${className}`}>
                            {
                                data?.map((dt, index) =>
                                    <li id={`${dt.id}`} key={index} draggable={true} className="dd-item col-order" data-id={index}>
                                        <div className="dd-handle">{dt.alias ?? dt.name}</div>
                                    </li>
                                )
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface CityProps {
    setShowAddCityModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowEditCityModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowDeleteCityModal: React.Dispatch<React.SetStateAction<boolean>>
    setItem: React.Dispatch<React.SetStateAction<CityModel | undefined>>,
    refetch: () => any
    data: CityModel[] | undefined
}
const City = ({ setShowAddCityModal, setShowEditCityModal, setShowDeleteCityModal, setItem, data, refetch }: CityProps): JSX.Element => {

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
                                            {data && data.map((dt, index) => !dt.isFromSheet && <CityRow key={index} item={dt} setItem={setItem} setShowDeleteCityModal={setShowDeleteCityModal} setShowEditCityModal={setShowEditCityModal} />)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-6">
                            <DragAndDropFile refetch={refetch} />
                            <a href='/load/model.csv' className="btn btn-outline-primary btn-xs export-btn">Copier le model</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface CityRowProps {
    setShowEditCityModal: React.Dispatch<React.SetStateAction<boolean>>,
    setItem: React.Dispatch<React.SetStateAction<CityModel | undefined>>,
    setShowDeleteCityModal: React.Dispatch<React.SetStateAction<boolean>>,
    item: CityModel
}
const CityRow = ({ setShowEditCityModal, setShowDeleteCityModal, setItem, item }: CityRowProps): JSX.Element => {

    const handleEdit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setItem(item)
        setShowEditCityModal(true)
    }

    const handleDelete = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setItem(item)
        setShowDeleteCityModal(true)
    }

    return (
        <tr>
            <th>{item.id}</th>
            <td>{item.name}</td>
            <td>{item.price} dhs</td>
            <td>
                <div className="d-flex">
                    <a onClick={handleEdit} href="#" className="btn btn-primary shadow btn-xs sharp me-1">
                        <i className="fas fa-pencil-alt" />
                    </a>
                    <a onClick={handleDelete} href="#" className="btn btn-danger shadow btn-xs sharp">
                        <i className="fa fa-trash" />
                    </a>
                </div>
            </td>
        </tr>
    )
}

interface DragAndDropFileProps {
    refetch: () => any
}
function DragAndDropFile({ refetch }: DragAndDropFileProps) {
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState<any>(null);

    const handleDragOver = (event: any) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const sendData = (data: File) => {

        const formData = new FormData();
        formData.append('file', data)

        const token = localStorage.getItem('token')

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        axios.post(CLIENT_UPLOAD_CITY_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res)
                refetch()
            })
            .catch((err: { data: ErrorModel | { message: string }, status: number }) => {
                if (err.data) {
                    if ('errors' in err.data && Array.isArray(err.data.errors) && err.data.errors.length > 0) showToastError(err.data.errors[0].msg);
                    else if ('message' in err.data) showToastError(err.data.message);
                }
            })
    }

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
            {file && <button onClick={() => sendData(file)}>Envoyer</button>}
        </div>
    );
}

interface ConfSettingProps {
    setShowEditPasswordModal: React.Dispatch<React.SetStateAction<boolean>>
}
const ConfSetting = ({ setShowEditPasswordModal }: ConfSettingProps): JSX.Element => {

    const { data, refetch } = useGetSettingQuery()
    const [patchSetting] = usePatchSettingMutation()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (values: Inputs) => {
        const datas = {
            ...values,
            id: data?.data.id ?? 0,
            default_conf_pricing: values.default_conf_pricing || String(data?.data.default_cof_ricing) || '0.0',
            delfault_del_pricing: values.delfault_del_pricing || String(data?.data.delfaulnpt_del_pricing) || '0.0',
            default_time: values.default_time || String(data?.data.default_time) || '0.0',
            startWrldOrder: values.startWrldOrder || String(data?.data.startWrldOrder) || 'none',
            automated_msg: values.automated_msg || String(data?.data.automated_msg) || 'nones'
        }

        patchSetting(datas).unwrap()
            .then(res => {
                console.log(res)
                showToastSucces('La configuration a été modifié')
                refetch()
            })
            .catch((err: { data: ErrorModel | { message: string }, status: number }) => {
                if (err.data) {
                    if ('errors' in err.data && Array.isArray(err.data.errors) && err.data.errors.length > 0) showToastError(err.data.errors[0].msg);
                    else if ('message' in err.data) showToastError(err.data.message);
                }
            })
    }


    return (
        <div className="col-12">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Configuration</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Default confirmation pricing</label>
                                <div className="col-sm-10">
                                    <input
                                        {...register('default_conf_pricing')}
                                        defaultValue={data?.data.default_cof_ricing || ''}
                                        type="number"
                                        min={0}
                                        max={1000}
                                        step={0.1}
                                        placeholder="10"
                                        className="form-control form-control-sm"
                                    />
                                    {errors && <p className='error'>{errors.default_conf_pricing?.message}</p>}
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Default delivery pricing</label>
                                <div className="col-sm-10">
                                    <input
                                        {...register('delfault_del_pricing')}
                                        defaultValue={data?.data.delfaulnpt_del_pricing || ''}
                                        min={0}
                                        max={1000}
                                        step={0.1}
                                        type="number"
                                        placeholder="10"
                                        className="form-control form-control-sm"
                                    />
                                    {errors && <p className='error'>{errors.delfault_del_pricing?.message}</p>}
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Default time between each action</label>
                                <div className="col-sm-10">
                                    <input
                                        {...register('default_time')}
                                        defaultValue={data?.data.default_time || ''}
                                        min={0}
                                        max={1000}
                                        step={0.1}
                                        type="number"
                                        placeholder="10"
                                        className="form-control form-control-sm"
                                    />
                                    {errors && <p className='error'>{errors.default_time?.message}</p>}
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Start world order</label>
                                <div className="col-sm-10">
                                    <input
                                        {...register('startWrldOrder')}
                                        defaultValue={data?.data.startWrldOrder}
                                        type="text"
                                        placeholder="salam"
                                        className="form-control form-control-sm"
                                    />
                                    {errors && <p className='error'>{errors.startWrldOrder?.message}</p>}
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Automated message</label>
                                <textarea
                                    {...register('automated_msg')}
                                    defaultValue={data?.data.automated_msg}
                                    className="form-control"
                                    rows={4} id="comment"
                                />
                                {errors && <p className='error'>{errors.automated_msg?.message}</p>}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-sm">
                            Enregistrer
                        </button>
                    </form>

                    <br /><br />
                    <button
                        onClick={() => setShowEditPasswordModal(true)}
                        type="button"
                        className="btn btn-outline-info btn-xxs">
                        Modifier le mot de passe
                    </button>
                </div>
            </div>
        </div>
    )
}
