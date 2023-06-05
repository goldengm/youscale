import React, { useEffect } from 'react'
import { CustumInput } from '../../../Forms'
import ModalWrapper from '../ModalWrapper'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { showToastError } from '../../../../services/toast/showToastError';
import { ErrorModel, ShippingModel } from '../../../../models';
import { useGetClientQuery, usePatchClientMutation } from '../../../../services/api/ClientApi/ClientApi';
import { useGetShippingQuery } from '../../../../services/api/ClientApi/ClientShippingApi';

type Inputs = {
    livoToken: string
};

const schema = yup.object().shape({
    livoToken: yup.string().required('Ce champ est obligatoire').optional()
}).required();

interface Props {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ShippingModal({ showModal, setShowModal }: Props): JSX.Element {

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
        <ModalWrapper showModal={showModal} title={'Shipping companies'} setShowModal={setShowModal} id='AddOrderModal'>
            <FormBody handleCloseModal={handleCloseModal} />
        </ModalWrapper>
    )
}

interface FormBodyProps {
    handleCloseModal: () => any
}
const FormBody = ({ handleCloseModal }: FormBodyProps) => {

    const [patchClient] = usePatchClientMutation();
    const { data, refetch } = useGetClientQuery();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (values: Inputs) => {
        patchClient(values).unwrap().then((result: any) => {
            console.log(result)
            handleCloseModal()
            refetch()
        }).catch((err: { data: ErrorModel | { message: string }, status: number }) => {
            if (err.data) {
                if ('errors' in err.data && Array.isArray(err.data.errors) && err.data.errors.length > 0) showToastError(err.data.errors[0].msg);
                else if ('message' in err.data) showToastError(err.data.message);
            }
        })
    }

    return (
        <div className="card-body">
            <div className="basic-form">

                <Shipping />
                <p style={{ display: 'grid' }}>
                    <code>You need to go to your livo account and copy your token</code>
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CustumInput
                        defaultValue={data?.data?.livoToken || ''}
                        register={register}
                        name={'livoToken'}
                        className={'lg-input-cus'}
                        error={errors.livoToken}
                        type={'text'}
                        label={"Livo token"}
                        placeholder={'HDHGDHGDV54EZ44DFZ4X44545D45SD'}
                    />

                    <button type="submit" className="btn btn-primary">
                        Modifier
                    </button>
                </form>
            </div>
        </div>
    )
}

const Shipping = () => {
    const { data, isSuccess } = useGetShippingQuery()

    return (
        <div className="row">
            { isSuccess && data?.data.map((dt: ShippingModel)=> <ShippingCard item={dt} />) }
        </div>
    )
}

interface ShippingCardProps {
    item: ShippingModel
}
const ShippingCard = ({ item }: ShippingCardProps) => {
    return (
        <div style={{width: '33%'}} className="col-xl-3 col-lg-6 col-sm-6">
            <div className="card">
                <div className="card-body">
                    <div className="new-arrival-product">
                        <div className="new-arrivals-img-contnent" >
                            <img src={`data:image/jpeg;base64,${item.image}`} className='img-fluid' alt="" />
                        </div>
                        <div className="new-arrival-content text-center mt-3">
                            <h4>
                                <a href="#">{item.name}</a>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}