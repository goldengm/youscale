import React, { useEffect, useState } from 'react'
import { CustumInput } from '../../../Forms'
import { MultiSelectElement } from '../../../Input'
import ModalWrapper from '../ModalWrapper'
import './team.style.css'

interface Props {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddTeamModal({ showModal, setShowModal }: Props): JSX.Element {

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
        <ModalWrapper showModal={showModal} title={'Add team'} setShowModal={setShowModal} id='AddOrderModal'>
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
                        <CustumInput type={'text'} label={"Name"} placeholder={'Patrick Doe'} />
                        <CustumInput type={'email'} label={"Email"} placeholder={'her@mail.com'} />
                        <CustumInput type={'password'} label={"Password"} placeholder={'*****'} className={'lg-input-cus'} />
                    </div>

                    <div className="row">
                        <CustumInput type={'number'} label={"Salaire"} placeholder={'1455.25'} defaultValue={0} />
                        <CustumInput type={'number'} label={"Comission"} placeholder={'12.6'} defaultValue={0} />
                        <CustumInput type={'number'} label={"Upsell"} placeholder={'36.4'} defaultValue={0} />
                        <CustumInput type={'number'} label={"Downsell"} placeholder={'14.2'} defaultValue={0} />
                        <CustumInput type={'number'} label={"CrossSell"} placeholder={'8'} defaultValue={0} />
                        <CustumInput type={'number'} label={"Max order pending"} placeholder={'2'} defaultValue={0} />
                    </div>

                    <div className="row">
                        <AllAccess label={'All columns'} />
                        <AllAccess label={'All cities'} />
                        <AllAccess label={'All products'} />
                        <AllAccess label={'All pages'} />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    )
}

interface ColumnAccessProps{
    label: string,
    options?: { label: string, value: string, disabled?:boolean }[]
}
const AllAccess = ({ label }:ColumnAccessProps): JSX.Element => {
    const [isAll, setIsAll] = useState<boolean>(true)
    const [selected, setSelected] = useState<[]>([]);

    const options = [
        { label: "Grapes 🍇", value: "grapes" },
        { label: "Mango 🥭", value: "mango" },
        { label: "Strawberry 🍓", value: "strawberry", disabled: true },
    ];

    return (
        <div className='column-access-row'>
            <div className="form-check custom-checkbox mb-3 checkbox-info">
                <input
                    onClick={()=> setIsAll(!isAll)}
                    type="checkbox"
                    className="form-check-input"
                    defaultChecked={true}
                    id="customCheckBox2"
                />
                <label className="form-check-label" htmlFor="customCheckBox2">
                    {label}
                </label>
            </div>

            {!isAll && <MultiSelectElement options={options} selected={selected} onChange={setSelected} className={'lg-mse'} />}
        </div>
    )
}