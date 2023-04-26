import React, { useEffect, useState } from 'react'
import { CustumInput, CustumTextArea, CustumSelectForm } from '../../../Forms'
import ModalWrapper from '../ModalWrapper'
import { useGetClientPerteCategorieQuery } from '../../../../services/api/ClientApi/ClientPerteCategorie'
import { useGetProductQuery } from '../../../../services/api/ClientApi/ClientProductApi'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { GetProductModel, PerteCategorieModel } from '../../../../models'
import { useAddClientPerteMutation } from '../../../../services/api/ClientApi/ClientPerteApi'

type SelectType = {
    label: string,
    value: string | number
}

type Inputs = {
    dateFrom: string,
    dateTo: string,
    amount: string,
    id_product: string,
    id_perte_categorie: string,
    note: string
};

const DataToSelect = (data: PerteCategorieModel[] | GetProductModel[] | undefined): SelectType[] => {
    if (!data) return []

    var new_arr: SelectType[] = []

    data.map((dt) => new_arr.push({ label: dt.name, value: dt.id || 0 }))

    return new_arr
}

const schema = yup.object().shape({
    dateFrom: yup.string().required('Ce champ est obligatoire'),
    dateTo: yup.string().required('Ce champ est obligatoire'),
    amount: yup.string().required('Ce champ est obligatoire'),
    id_product: yup.string().required('Ce champ est obligatoire'),
    id_perte_categorie: yup.string().required('Ce champ est obligatoire'),
    note: yup.string().notRequired()
}).required();

interface Props {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: () => any
}
export default function AddPerteModal({ showModal, setShowModal, refetch }: Props): JSX.Element {

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
        <ModalWrapper showModal={showModal} title={'Add perte'} setShowModal={setShowModal} id='AddOrderModal'>
            <FormBody refetch={refetch} handleCloseModal={handleCloseModal} />
        </ModalWrapper>
    )
}

interface FormBodyProps {
    refetch: () => any,
    handleCloseModal: () => any
}
const FormBody = ({ refetch, handleCloseModal }: FormBodyProps) => {
    const [addPerte] = useAddClientPerteMutation()

    const { data: perteCategorieData } = useGetClientPerteCategorieQuery()
    const { data: productData } = useGetProductQuery()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (values: Inputs) => {
        addPerte(values).unwrap()
            .then(res => {
                refetch()
                handleCloseModal()
            })
            .catch(err => alert(err.data.message))
    }

    return (
        <div className="card-body">
            <div className="basic-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <CustumSelectForm
                            data={DataToSelect(perteCategorieData?.data)}
                            register={register}
                            error={errors.id_perte_categorie}
                            label={"Categorie"}
                            name={'id_perte_categorie'}
                        />

                        <CustumSelectForm
                            data={DataToSelect(productData?.data)}
                            register={register}
                            error={errors.id_product}
                            label={"Produit"}
                            name={'id_product'}
                        />

                        <CustumInput
                            register={register}
                            name={'amount'}
                            error={errors.amount}
                            type={'text'}
                            label={"Amount"}
                            placeholder={'4.56'}
                            className={'lg-input-cus'}
                        />
                    </div>

                    <div className="row">
                        <CustumInput
                            register={register}
                            name={'dateFrom'}
                            error={errors.dateFrom}
                            type={'date'}
                            label={"Date from"}
                            placeholder={'14/02/2022'}
                        />

                        <CustumInput
                            register={register}
                            name={'dateTo'}
                            error={errors.dateTo}
                            type={'date'}
                            label={"Date to"}
                            placeholder={'28/02/2022'}
                        />
                    </div>

                    <div className="row">
                        <CustumTextArea
                            register={register}
                            name={'note'}
                            error={errors.note}
                            label='Note (optional)'
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    )
}