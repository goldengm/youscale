import React, { useEffect, useState } from 'react'
import { CustumInput } from '../../../Forms'
import { MultiSelectElement } from '../../../Input'
import ModalWrapper from '../ModalWrapper'
import './product.style.css'

interface Props {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddProductModal({ showModal, setShowModal }: Props): JSX.Element {

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
        <ModalWrapper showModal={showModal} setShowModal={setShowModal} id='AddProductModal'>
            <FormBody />
        </ModalWrapper>
    )
}

const FormBody = () => {
    const [selected, setSelected] = useState<[]>([]);

    const options = [
        { label: "Grapes", value: "grapes" },
        { label: "Mango", value: "mango" },
        { label: "Strawberry", value: "strawberry", disabled: true },
    ];

    return (
        <div className="card-body">
            <div className="basic-form">
                <form>
                    <div className="row">
                        <CustumInput type={'text'} label={"Name"} placeholder={'Nivea'} />
                        <CustumInput type={'text'} label={"Price of buying"} placeholder={'12.55'} />
                    </div>
                    <AddVariant />
                    <div className="row">
                        <MultiSelectElement options={options} selected={selected} onChange={setSelected} />
                    </div>

                    <button type="submit" className="btn btn-primary add-btn">
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    )
}

const AddVariant = (): JSX.Element => {
    return (
        <div className="row variant-row">
            <CustumInput type={'text'} label={"Variant"} placeholder={'Mountain'} />
            <button type="button" className="btn btn-outline-primary btn-xs add-variant-btn">
                Add
            </button>
        </div>
    )
}