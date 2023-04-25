import React, { useEffect, useState } from 'react'
import { CustumInput, CustumSelect, CustumTextArea } from '../../../Forms'
import ModalWrapper from '../ModalWrapper'

interface Props {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddPerteModal({ showModal, setShowModal }: Props): JSX.Element {

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
        <ModalWrapper showModal={showModal} title={'Add perte'} setShowModal={setShowModal} id='AddOrderModal'>
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
                        {/* <CustumSelect name='Categorie' />
                        <CustumSelect name='Produit' /> */}
                        {/* <CustumInput type={'text'} label={"Amount"} placeholder={'4.56'} className={'lg-input-cus'} /> */}
                    </div>
                    
                    <div className="row">
                    {/* 
                        <CustumInput type={'date'} label={"Date from"} placeholder={'14/02/2022'} />
                        <CustumInput type={'date'} label={"Date to"} placeholder={'28/02/2022'} /> */}
                    </div>

                    <div className="row">
                        {/* <CustumTextArea label='Note (optional)' /> */}
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    )
}