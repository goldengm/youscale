import React, { useEffect } from 'react'
import { CustumInput, CustumTextArea, CustumSelectForm } from '../../../Forms'
import ModalWrapper from '../ModalWrapper'

interface Props {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function EditOrderModal({ showModal, setShowModal }: Props) {

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
    <ModalWrapper showModal={showModal} setShowModal={setShowModal} id='EditOrderModal'>
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
            <CustumInput type={'text'} label={"Destinataire"} placeholder={'Patrick Doe'} />
            <CustumInput type={'text'} label={"Telephone"} placeholder={'778143610'} />
            <CustumInput type={'text'} label={"Prix"} placeholder={'36540'} />
            <CustumInput type={'text'} label={"Adresse"} placeholder={'Bl 4 st.Jean'} />
            <CustumTextArea label={"Commentaire"} />
          </div>

          <div className="row">
            <CustumSelectForm label={"Status"} name={'status'} />
            <CustumSelectForm label={"Source"} name={'source'} />
            <CustumSelectForm label={"Up/Downsell"} name={'updownsell'} />
            <CustumSelectForm label={"Changer"} name={'changer'} />
            <CustumSelectForm label={"Ouvrir"} name={'ouvrir'} />
          </div>
          <button type="submit" className="btn btn-primary">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  )
}