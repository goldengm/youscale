import React, { useEffect, useState } from 'react'
import { ProductOrderCard } from './Card'
import ModalWrapper from '../ModalWrapper'
import { MultiSelectElement, SendButton } from '../../../Input'

interface Props {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddProductOrderModal({ showModal, setShowModal }: Props) {
  const [selected, setSelected] = useState<[]>([]);

  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  ];

  function handleModalStyles(showModal: boolean) {
    var body = document.querySelector<HTMLBodyElement>('body');
    var modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop fade show';

    if (showModal && body) {
      body.classList.add('modal-open');
      body.style.overflow = 'hidden';
      body.style.paddingRight = '17px';

      body.appendChild(modalBackdrop);
    } else if (body) {
      body.classList.remove('modal-open');
      body.style.overflow = '';
      body.style.paddingRight = '';

      var existingBackdrop = document.querySelector('.modal-backdrop.fade.show');
      if (existingBackdrop) existingBackdrop.remove();
    }

  }

  function handleModalDisplay(showModal: boolean) {
    var modal = document.getElementById('addProductToOrder');

    if (showModal && modal) {
      modal.style.display = 'block';
    } else if (modal) {
      modal.style.display = '';
    }
  }

  useEffect(() => {
    handleModalStyles(showModal)
    handleModalDisplay(showModal)
  }, [showModal])

  return (
    <ModalWrapper showModal={showModal} setShowModal={setShowModal} id='addProductToOrder'>
      <MultiSelectElement options={options} selected={selected} onChange={setSelected}/>
      <ProductOrderCard title={'Product Name'} />
      <SendButton value='Valider' onClick={()=> console.log('example')} />
    </ModalWrapper>
  )
}
