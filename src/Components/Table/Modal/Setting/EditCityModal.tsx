import React, { useEffect, useState } from 'react'
import { CustumInput } from '../../../Forms'
import ModalWrapper from '../ModalWrapper'


interface Props {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function EditCityModal({ showModal, setShowModal }: Props): JSX.Element {

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

    return (
        <ModalWrapper showModal={showModal} title={'Edit city'} setShowModal={setShowModal} id='AddOrderModal'>
            <FormBody />
        </ModalWrapper>
    )
}

const FormBody = () => {
    return (
        <div className="card-body">
            <div className="basic-form">
                <form>
                    <div className="row">
                        {/* <CustumInput type={'text'} label={"Name"} placeholder={'Nom'} />
                        <CustumInput type={'text'} label={"Price"} placeholder={'Prix'} /> */}
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    )
}