import React, { useEffect } from 'react'
import { CustumInput, CustumTextArea, CustumSelectForm } from '../../../Forms'
import ModalWrapper from '../ModalWrapper'

interface Props {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddStockModal({ showModal, setShowModal }: Props): JSX.Element {

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
    <ModalWrapper showModal={showModal} setShowModal={setShowModal} id='AddOrderModal'>
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
            <CustumInput type={'text'} label={"Quantité"} placeholder={'12'} />
          </div>

          <div className="row">
            <CustumSelectForm label={"Ville"} name={'city'} />
            <CustumSelectForm label={"Produit"} name={'product'} />
          </div>

          <button type="submit" className="btn btn-primary">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  )
}