import React, { useEffect } from 'react'
import ModalWrapper from '../ModalWrapper'
import { CustumInput } from '../../../Forms';

interface Props {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ReportOrderModal({ showModal, setShowModal }: Props): JSX.Element {
  
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
    <ModalWrapper title={'Report'} showModal={showModal} setShowModal={setShowModal} id='EditOrderModal'>
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
            <CustumInput type={'date'} label={"Date de report"} placeholder={'Date de report'} />
          </div>

          <button type="submit" className="btn btn-primary">
            Valider
          </button>
        </form>
      </div>
    </div>
  )
}