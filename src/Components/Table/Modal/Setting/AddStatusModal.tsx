import React, { useEffect, useState } from 'react'
import { CustumInput } from '../../../Forms'
import ModalWrapper from '../ModalWrapper'


interface Props {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddStatusModal({ showModal, setShowModal }: Props): JSX.Element {

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
        <ModalWrapper showModal={showModal} title={'Add status'} setShowModal={setShowModal} id='AddOrderModal'>
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
                        <CustumInput type={'text'} label={"Name"} placeholder={'Nom'} />
                    </div>

                    <div className="row">
                        <div className="form-check custom-checkbox mb-3 checkbox-info">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                defaultChecked={true}
                                id="customCheckBox2"
                            />
                            <label className="form-check-label" htmlFor="customCheckBox2">
                                Active
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    )
}