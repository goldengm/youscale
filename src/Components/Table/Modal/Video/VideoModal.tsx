import React, { useEffect } from 'react'
import ModalWrapper from '../ModalWrapper'

interface Props {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  urlVideo: string
}
export default function VideoModal({ showModal, setShowModal, urlVideo }: Props): JSX.Element {

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
    <ModalWrapper title={'Video'} showModal={showModal} setShowModal={setShowModal} id='AddOrderModal'>
      <FormBody handleCloseModal={handleCloseModal} urlVideo={urlVideo} />
    </ModalWrapper>
  )
}

interface FormBodyProps{
  handleCloseModal: () => void
  urlVideo: string
}
const FormBody = ({ handleCloseModal, urlVideo }:FormBodyProps) => {

  return (
    <div className="card-body">
      <div className="basic-form">
        <iframe width="390" height="315" src={urlVideo} allowFullScreen></iframe>
      </div>
    </div>
  )
}