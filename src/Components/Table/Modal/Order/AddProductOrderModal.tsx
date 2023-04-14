import React, { useEffect, useState } from 'react'
import { ProductOrderCard } from './Card'
import ModalWrapper from '../ModalWrapper'
import { MultiSelectElement, SendButton } from '../../../Input'

interface Props {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddProductOrderModal({ showModal, setShowModal }: Props): JSX.Element {
  const [selected, setSelected] = useState<[]>([]);

  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  ];

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
    <ModalWrapper showModal={showModal} setShowModal={setShowModal} id='addProductToOrder'>
      <MultiSelectElement options={options} selected={selected} onChange={setSelected}/>
      <ProductOrderCard title={'Product Name'} />
      <SendButton value='Valider' onClick={()=> console.log('example')} />
    </ModalWrapper>
  )
}
