import React, { useEffect, useState } from 'react'
import ModalWrapper from '../ModalWrapper'
import { useDeleteClientOrderMutation, usePatchClientOrderMutation } from '../../../../services/api/ClientApi/ClientOrderApi';

interface Props {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    refetch: () => void,
    id_order: string,
}
export default function DeleteOrderModal({ showModal, setShowModal, refetch, id_order }: Props): JSX.Element {

    const [deleteOrder] = useDeleteClientOrderMutation()

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

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): any => {
        e.preventDefault()

        deleteOrder(id_order).unwrap()
            .then(res => {
               handleCloseModal()
               refetch()
            })
            .catch(err => alert(err.data.message))
    }

    return (
        <ModalWrapper title={'Report'} showModal={showModal} setShowModal={setShowModal} id='EditOrderModal'>
            <FormBody
                onClick={handleSubmit}
            />
        </ModalWrapper>
    )
}

interface FormBodyProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
}
const FormBody = ({ onClick }: FormBodyProps) => {

    return (
        <div className="card-body">
            <div className="basic-form">
                <div className="swal2-header">
                    <h2 className="swal2-title" id="swal2-title" style={{ display: "flex" }}>
                        Voulez vous vraiment supprimer cette commande ?
                    </h2>
                    <button 
                        onClick={onClick}
                        className="btn btn-danger btn sweet-wrong"
                    >Supprimer</button>
                </div>
            </div>
        </div>
    )
}