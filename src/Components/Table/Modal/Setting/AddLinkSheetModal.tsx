import React, { useEffect, useState } from 'react'
import { CustumInput } from '../../../Forms'
import ModalWrapper from '../ModalWrapper'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useGetLinkSheetQuery, useIntegrateSheetMutation, usePatchSheetMutation } from '../../../../services/api/ClientApi/ClientIntegrateSheetApi';
import { showToastError } from '../../../../services/toast/showToastError';
import { ErrorModel, GetSheetIntegrationModel } from '../../../../models';

type Inputs = {
    spreadsheetId: string
    range: string
    name: string
};

const schema = yup.object().shape({
    spreadsheetId: yup.string().required('Ce champ est obligatoire'),
    range: yup.string().required('Ce champ est obligatoire'),
    name: yup.string().required('Ce champ est obligatoire')
}).required();

interface Props {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddLinkSheetModal({ showModal, setShowModal }: Props): JSX.Element {

    const { data, refetch } = useGetLinkSheetQuery();
    const [row, setRow] = useState<GetSheetIntegrationModel[]>([])

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

    useEffect(() => {
        data && setRow(data?.data)
    }, [data])

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
        <ModalWrapper showModal={showModal} title={'API integration'} setShowModal={setShowModal} id='AddOrderModal'>
            <p style={{ display: 'grid' }}>
                You need to share your spread sheet with this address:
                <code>appsheet@fluent-edition-339019.iam.gserviceaccount.com</code>
            </p>
            <a href="javascript:void(0)" onClick={() => setRow(prev => [...prev, { SheetID: '', range_: '' } as GetSheetIntegrationModel])} className="badge badge-outline-light">Nouveau sheet +</a>
            {row.map(dt => <FormBody handleCloseModal={handleCloseModal} data={dt} refetch={refetch} />)}

            <br />
            <a href='/load/SheetIntegration.xlsx' className="btn btn-outline-primary btn-xs export-btn">Copier le model</a>
        </ModalWrapper>
    )
}

interface FormBodyProps {
    handleCloseModal: () => any
    refetch: () => any
    data: GetSheetIntegrationModel | undefined
}
const FormBody = ({ handleCloseModal, data, refetch }: FormBodyProps) => {

    const [integrateSheet] = useIntegrateSheetMutation();
    const [patchSheet] = usePatchSheetMutation();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (values: Inputs) => {
        if (!data?.id) {
            integrateSheet(values).unwrap().then((result: any) => {
                handleCloseModal()
                refetch()
            }).catch((err: { data: ErrorModel | { message: string }, status: number }) => {
                if (err.data) {
                    if ('errors' in err.data && Array.isArray(err.data.errors) && err.data.errors.length > 0) showToastError(err.data.errors[0].msg);
                    else if ('message' in err.data) showToastError(err.data.message);
                }
            })
        } else {
            patchSheet({
                id: data.id,
                ...values
            }).unwrap().then((result: any) => {
                handleCloseModal()
                refetch()
            }).catch((err: { data: ErrorModel | { message: string }, status: number }) => {
                if (err.data) {
                    if ('errors' in err.data && Array.isArray(err.data.errors) && err.data.errors.length > 0) showToastError(err.data.errors[0].msg);
                    else if ('message' in err.data) showToastError(err.data.message);
                }
            })
        }
    }

    return (
        <div className="card-body">
            <div className="basic-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <CustumInput
                            defaultValue={data?.SheetID ?? ''}
                            register={register}
                            name={'spreadsheetId'}
                            error={errors.spreadsheetId}
                            type={'text'}
                            label={"SheetID"}
                            placeholder={'SheetID'}
                        />

                        <CustumInput
                            defaultValue={data?.range_ ?? ''}
                            register={register}
                            name={'range'}
                            error={errors.range}
                            type={'text'}
                            label={"range_"}
                            placeholder={'range_'}
                        />
                    </div>

                    <CustumInput
                        className={'lg-input-cus'}
                        defaultValue={data?.name ?? ''}
                        register={register}
                        name={'name'}
                        error={errors.name}
                        type={'text'}
                        label={"name"}
                        placeholder={'Stock Janvier'}
                    />

                    <button type="submit" className="badge badge-md badge-success">Ajouter</button>
                </form>
            </div>
        </div>
    )
}