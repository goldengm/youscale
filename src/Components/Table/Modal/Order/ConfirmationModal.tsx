import React, { useEffect, useState } from 'react'
import { CustumInput, CustumSelectForm } from '../../../Forms'
import { CityModel, ErrorModel, GetClientOrderModel, GetProductModel, OrderOnlyModel, ProductOrder, StatusModel, countOrderByStatusModel } from '../../../../models'
import { TbPointFilled } from 'react-icons/tb'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetStatusQuery } from '../../../../services/api/ClientApi/ClientStatusApi';
import { useGetClientOrderByIdQuery, usePatchClientOrderMutation } from '../../../../services/api/ClientApi/ClientOrderApi';
import { showToastError } from '../../../../services/toast/showToastError';
import { CustumDropdown, MultiSelectElement, SendButton } from '../../../Input';
import { useGetProductQuery } from '../../../../services/api/ClientApi/ClientProductApi';
import { ProductOrderCard } from './Card';
import ModalWrapper from '../ModalWrapper'
import * as yup from "yup";
import { useGetCityQuery } from '../../../../services/api/ClientApi/ClientCityApi';

const FilterStatusData = (data: StatusModel[] | undefined): SelectType[] => {
    if (!data) return []

    var newArr: SelectType[] = []

    data.filter((dt: StatusModel) => {
        if (dt.checked === true) newArr.push({ label: dt.name, value: dt.name })
    })

    return newArr
}

const FilterStatusWithOrder = (data: countOrderByStatusModel[] | undefined): SelectType[] => {
    if (!data) return []

    var newArr: SelectType[] = []

    data.filter((dt: countOrderByStatusModel) => {
        if (dt.count > 0) newArr.push({ label: dt.name, value: dt.name })
    })

    return newArr
}

type SelectType = {
    label: string,
    value: string | number
}

interface GetStatusModel {
    code: Number;
    data: StatusModel[];
    countOrderByStatus: countOrderByStatusModel[];
}

type Inputs = {
    nom: string,
    telephone: string,
    prix: string,
    adresse: string,
    message: string,
    status: string,
    source: string,
    updownsell: string,
    changer: string,
    ouvrir: string
};

const schema = yup.object().shape({
    nom: yup.string().notRequired(),
    telephone: yup.string().notRequired(),
    prix: yup.string().notRequired(),
    adresse: yup.string().notRequired(),
    message: yup.string().notRequired(),
    status: yup.string().notRequired(),
    source: yup.string().notRequired(),
    updownsell: yup.string().notRequired(),
    changer: yup.string().notRequired(),
    ouvrir: yup.string().notRequired(),
}).required();

interface Props {
    id_orders: number[],
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    setStatus: React.Dispatch<React.SetStateAction<string | undefined>>
    statusConfirmation: string | undefined
    refetch: () => any
    driverObj: {
        moveNext: () => void
    }
}
export default function ConfirmationModal({ showModal, setShowModal, refetch, id_orders, setStatus, driverObj, statusConfirmation }: Props): JSX.Element {

    const { data: StatusData, refetch: RefetchStatus } = useGetStatusQuery()

    const [index, setIndex] = useState<number>(0)
    const { data: currentOrder, isSuccess, refetch: refetchCurrentOrder, isFetching } = useGetClientOrderByIdQuery({ id: id_orders[index] })

    useEffect(() => {
        refetchCurrentOrder()
    }, [index])

    const onSelectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        const { value } = e.target

        setStatus(value === "0" ? undefined : value)
    }

    useEffect(() => {
        var body = document.querySelector<HTMLBodyElement>('body');

        var modalBackdrop = document.createElement('div');
        modalBackdrop.className = 'modal-backdrop fade show';

        if (body) {
            body.classList.add('modal-open');
            body.style.overflow = 'hidden';
            body.style.paddingRight = '17px';

            body.appendChild(modalBackdrop);
        }
    }, [])

    const handleCloseModal = () => {
        var body = document.querySelector<HTMLBodyElement>('body');

        if (body) {
            body.classList.remove('modal-open');
            body.style.overflow = '';
            body.style.paddingRight = '';

            var existingBackdrop = document.querySelectorAll('.modal-backdrop.fade.show');

            if (existingBackdrop) existingBackdrop.forEach(it => it.remove());

            setShowModal(false)
            driverObj.moveNext()
        }
    }

    // if (id_orders.length === 0) {
    //     setStatus(undefined)
    //     handleCloseModal()
    // }

    console.log(id_orders.length)
    return (
        (isSuccess && id_orders.length > 0) ?
            <ModalWrapper title={'Confirmation'} showModal={showModal} closeModal={handleCloseModal} setShowModal={setShowModal} id='EditOrderModal'>
                <SelectStatusComponent data={FilterStatusWithOrder(StatusData?.countOrderByStatus)} label={'Status'} name={'status'} Onchange={onSelectStatus} statusConfirmation={statusConfirmation} />
                <div className="order-id-date">
                    <div>Order Id: {currentOrder.order[0].id}</div>
                    <div>Date: {new Date(currentOrder.order[0].date).toISOString().split('T')[0]}</div>
                </div>
                <EditProductSection refetch={refetch} id={id_orders[index]} editData={currentOrder.order[0].Product_Orders} />
                {isFetching ? <p>Chargement</p> : <FormBody handleCloseModal={handleCloseModal} RefetchStatus={RefetchStatus} currentOrder={currentOrder} StatusData={StatusData} refetch={refetch} setIndex={setIndex} id_orders={id_orders} index={index} />}
            </ModalWrapper> :
            <ModalWrapper title={'Confirmation'} showModal={showModal} setShowModal={setShowModal} id='EditOrderModal'>
                <div>Impossible</div>
            </ModalWrapper>
    )
}

interface FormBodyProps {
    StatusData: GetStatusModel | undefined
    RefetchStatus: () => void
    id_orders: number[]
    index: number
    handleCloseModal: () => void
    setIndex: React.Dispatch<React.SetStateAction<number>>
    refetch: () => any
    currentOrder: {
        code: Number;
        data: GetClientOrderModel;
        order: OrderOnlyModel[];
    }
}

const FormBody = ({ handleCloseModal, refetch, id_orders, setIndex, index, currentOrder, StatusData, RefetchStatus }: FormBodyProps) => {

    const { data: dataCity } = useGetCityQuery()
    const [patchOrder] = usePatchClientOrderMutation()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const [upDownData] = useState<SelectType[]>([
        { label: 'none', value: 'none' },
        { label: 'UpSell', value: 'UpSell' },
        { label: 'DownSell', value: 'UpSell' },
        { label: 'CrossSell', value: 'UpSell' }
    ])

    const FormatCity = (data: CityModel[]) => {
        var options: { label: string, value: string | number }[] = []

        data.map((dt) => {
            if (currentOrder.order[0].id_city === dt.id) options.push({ label: dt.name, value: dt.id || 0 })
            if (!dt.isDeleted && !dt.isFromSheet) {
                if (currentOrder.order[0].id_city !== dt.id) options.push({ label: dt.name, value: dt.id || 0 })
            }
        })

        return options
    }

    const onSubmit = (values: Inputs) => {

        const data = {
            ...values,
            id: Number(id_orders[index])
        }

        patchOrder(data).unwrap()
            .then(res => {
                refetch()
                console.log({ id_orders: id_orders.length, index: index + 1 })
                if (id_orders.length === (index + 1)) {
                    handleCloseModal()
                    return
                }

                reset()
            })
            .catch((err: { data: ErrorModel | { message: string }, status: number }) => {
                if (err.data) {
                    if ('errors' in err.data && Array.isArray(err.data.errors) && err.data.errors.length > 0) showToastError(err.data.errors[0].msg);
                    else if ('message' in err.data) showToastError(err.data.message);
                }
            })
    }

    const onNext =(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
        e.preventDefault()

        setIndex(prevIndex => prevIndex + 1)
    }

    return (
        <div className="card-body">
            <div className="basic-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='restant-txt'>restant: {id_orders.length - index}</div>
                    <div className="row">

                        <CustumSelectForm
                            defaultSelected={currentOrder.data['Up/Downsell']}
                            data={upDownData}
                            register={register}
                            error={errors.updownsell}
                            label={"Up/Downsell"}
                            name={'updownsell'}
                        />
                    </div>

                    <div className="row">
                        <CustumInput
                            defaultValue={currentOrder.order[0].nom}
                            register={register}
                            name={'nom'}
                            error={errors.nom}
                            type={'text'}
                            label={"Destinataire"}
                            placeholder={'Patrick Doe'}
                        />

                        <CustumInput
                            defaultValue={currentOrder.order[0].telephone}
                            register={register}
                            name={'telephone'}
                            error={errors.telephone}
                            type={'text'}
                            label={"Telephone"}
                            placeholder={'778143610'}
                        />

                        <CustumDropdown refetch={refetch} options={FormatCity(dataCity ? dataCity.data : [])} name='id_city' data={dataCity ? dataCity.data : []} order={{ id: currentOrder.order[0].id, id_city: currentOrder.order[0].id_city, id_team: currentOrder.order[0].id_team, createdAt: currentOrder.order[0].createdAt }} />

                        <CustumInput
                            defaultValue={currentOrder.order[0].prix}
                            register={register}
                            name={'prix'}
                            error={errors.prix}
                            type={'text'}
                            label={"Prix"}
                            placeholder={'36540'}
                        />

                        <CustumInput
                            defaultValue={currentOrder.order[0].adresse}
                            register={register}
                            name={'adresse'}
                            error={errors.adresse}
                            type={'text'}
                            label={"Adresse"}
                            placeholder={'Bl 4 st.Jean'}
                        />
                    </div>

                    <div className="row">
                        <CustumSelectForm
                            defaultSelected={currentOrder.order[0].status}
                            data={FilterStatusData(StatusData?.data)}
                            register={register}
                            error={errors.status}
                            label={"Status"}
                            name={'status'}
                        />
                        {
                            currentOrder.order[0].isSendLivo === 'not_send' ?
                                <TbPointFilled size={40} color={'gray'} />
                                : currentOrder.order[0].isSendLivo === 'error_send' ?
                                    <TbPointFilled size={40} color={'red'} />
                                    :
                                    <TbPointFilled size={40} color={'green'} />
                        }
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Enregistrer
                    </button>
                    <a href='#' onClick={onNext} className="btn light btn-light next-btn">
                        Suivant
                    </a>
                </form>
            </div>
        </div>

    )
}

interface EditProductSectionProps {
    id: number
    refetch: () => any
    editData?: ProductOrder[] | undefined
}

interface selectedProductModel {
    label: string;
    value: number | undefined | string;
    quantity: number;
    variant: string[];
    allVariant: string[] | undefined;
}

const EditProductSection = ({ editData, refetch, id }: EditProductSectionProps): JSX.Element => {
    const [patchOrder] = usePatchClientOrderMutation()
    const { data: ProductData, isSuccess } = useGetProductQuery({ isHidden: false })

    const FormatDataOption = (data: GetProductModel[]) => {
        var objArr: { label: string, value: string, allVariant: string[], variant: [] }[] = []

        for (let i = 0; i < data.length; i++) {
            if (!data[i].isDeleted)
                objArr.push({ label: data[i].name, value: String(data[i].id), allVariant: data[i].variant, variant: [] })
        }

        return objArr
    }

    const FormatAccessArray = (data: any) => {
        var objArr: { id: number, quantity: number, variant: [] }[] = []


        for (let i = 0; i < data.length; i++) {
            objArr.push({ id: data[i].value, quantity: data[i].quantity || 1, variant: data[i].variant })
        }

        return objArr
    }

    const [selectedProduct, setSelectedProduct] = useState<selectedProductModel[]>([]);

    useEffect(() => {
        setSelectedProduct((editData) ? editData?.map((dt) => {
            return { label: dt.Product.name, value: dt.Product.id ? String(dt.Product.id) : '', quantity: dt.quantity, variant: dt.variant, allVariant: dt.Product.variant }
        }) : [])
    }, [])


    const onSubmit = () => {
        if (selectedProduct.length === 0) {
            showToastError('Please select at least one product')
            return
        }

        const data = {
            id_product_array: FormatAccessArray(selectedProduct)
        }

        patchOrder({ ...data, id }).unwrap()
            .then(res => {
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
        <div>
            {isSuccess ? <MultiSelectElement options={FormatDataOption(ProductData?.data)} selected={selectedProduct} onChange={setSelectedProduct} /> : <></>}

            {selectedProduct.map((dt, index) =>
                <ProductOrderCard
                    key={index}
                    dt={dt}
                    index={index}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                    title={dt.label}
                />
            )}

            <SendButton value='Modifier les produits' onClick={onSubmit} />
        </div>
    )
}

interface SelectStatusComponentProps {
    data: SelectType[]
    name: string
    label: string
    Onchange: (e: React.ChangeEvent<HTMLSelectElement>) => any
    statusConfirmation: string | undefined
}
const SelectStatusComponent = ({ data, label, name, Onchange, statusConfirmation }: SelectStatusComponentProps) => {
    return (
        <div className="mb-3 col-md-4">
            <label className="form-label">{label}</label>
            <select
                onChange={Onchange}
                name={name}
                className="me-sm-2 default-select form-control wide"
                id="inlineFormCustomSelect"
            >
                <option value={"0"}>{"All status"}</option>
                {data.map((dt) => <option selected={statusConfirmation === dt.value} value={dt.value}>{dt.label}</option>)}
            </select>
        </div>
    )
}