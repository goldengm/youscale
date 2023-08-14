import React, { useEffect, useState } from 'react'
import { CustumInput } from '../../../Forms'
import { MultiSelectElement } from '../../../Input'
import ModalWrapper from '../ModalWrapper'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { VariantModel, ErrorModel } from '../../../../models';
import { useAddVariantMutation, useGetVariantQuery } from '../../../../services/api/ClientApi/ClientVariantApi';
import { useAddProductMutation } from '../../../../services/api/ClientApi/ClientProductApi';
import { showToastError } from '../../../../services/toast/showToastError';
import { showToastSucces } from '../../../../services/toast/showToastSucces';
import './product.style.css'

type Inputs = {
    name: string,
    price_selling: string
};

const schema = yup.object().shape({
    name: yup.string().max(14, 'Maximum 14 caractères').required('Ce champ est obligatoire'),
    price_selling: yup.string().required('Ce champ est obligatoire')
}).required();

const clearVariant = (variants: { label: string, value: string }[]) => {
    const filterVariants = variants.map(vr => vr.value)
    return filterVariants
}

const FormatVariant = (variants: VariantModel[] | undefined) => {
    if (!variants) return []
    const formatVariants = variants.map(vr => ({ label: vr.name, value: vr.name }))
    return formatVariants
}

interface Props {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: () => any
}
export default function AddProductModal({ showModal, setShowModal, refetch }: Props): JSX.Element {

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
        }
    }

    return (
        <ModalWrapper title={'Add Product'} showModal={showModal} setShowModal={setShowModal} id='AddProductModal'>
            <FormBody handleCloseModal={handleCloseModal} refetch={refetch} setShowModal={setShowModal} />
        </ModalWrapper>
    )
}

interface FormBodyProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: () => any,
    handleCloseModal: () => any
}
const FormBody = ({ setShowModal, refetch, handleCloseModal }: FormBodyProps) => {
    const [selected, setSelected] = useState<[]>([]);

    const [addProd] = useAddProductMutation()
    const { data: variantData, refetch: refetchVariant } = useGetVariantQuery()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (values: Inputs) => {
        const data = {
            ...values,
            variant: clearVariant(selected),
        }

        addProd(data).unwrap()
            .then(res => {
                console.log(res)
                refetch()
                handleCloseModal()
            })
            .catch((err: { data: ErrorModel, status: number }) => showToastError(err.data.errors[0].msg))
    }

    return (
        <div className="card-body">
            <div className="basic-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <CustumInput
                            register={register}
                            name={'name'}
                            error={errors.name}
                            type={'text'}
                            label={"Nom"}
                            placeholder={'Nivea'}
                        />

                        <CustumInput
                            register={register}
                            name={'price_selling'}
                            error={errors.price_selling}
                            type={'text'}
                            label={"prix d'achat"}
                            placeholder={'12.55'}
                        />
                    </div>
                    <AddVariant refetchVariant={refetchVariant} />
                    <div className="row">
                        <MultiSelectElement
                            options={FormatVariant(variantData?.data)}
                            selected={selected}
                            onChange={setSelected}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary add-btn">
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    )
}

interface AddVariantProps {
    refetchVariant: () => any
}
const AddVariant = ({ refetchVariant }: AddVariantProps): JSX.Element => {

    const [addVariant] = useAddVariantMutation()
    const [variant, setVariant] = useState<string>('')

    const handleChangeVariant = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setVariant(value)
    }

    const handleAddVariant = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (variant === '') return
        addVariant({ name: variant }).unwrap()
            .then((res: any) => {
                showToastSucces('Variant ajouté')
                refetchVariant()
                setVariant('')
            })
            .catch((err: {data: ErrorModel | {message : string}, status: number}) => {
                if (err.data) {
                    if ('errors' in err.data && Array.isArray(err.data.errors) && err.data.errors.length > 0) showToastError(err.data.errors[0].msg);
                    else if ('message' in err.data) showToastError(err.data.message);
                }
            })

    } // err.data.message

    return (
        <div className="row variant-row">
            <CustumInput
                onChange={handleChangeVariant}
                name={'variant'}
                error={undefined}
                register={() => console.log('nothing')}
                type={'text'}
                label={"Variant"}
                placeholder={'Mountain'}
            />
            <button
                onClick={handleAddVariant}
                type="button"
                className="btn btn-outline-primary btn-xs add-variant-btn"
            >
                Add
            </button>
        </div>
    )
}