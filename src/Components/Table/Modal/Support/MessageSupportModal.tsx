import React, { useEffect, useState } from 'react'
import ModalWrapper from '../ModalWrapper'
import { Support } from '../../../../models';

interface Props {
    item: Support | undefined
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function MessageSupportModal({ showModal, setShowModal, item }: Props): JSX.Element {

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
        <ModalWrapper title={'Chat'} showModal={showModal} setShowModal={setShowModal} id='HistoryOrderModal'>
            <FormBody data={item ?? {} as Support} />
        </ModalWrapper>
    )
}

interface FormBodyProps {
    data: Support
}
const FormBody = ({ data }: FormBodyProps) => {
    const [message, setMessage] = useState<string>('')

    const onWrite = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const { value } = e.target
        setMessage(value)
    }
    return (
        <div className="card-body">
            <div
                id="dlab_W_TimeLine"
                className="widget-timeline dlab-scroll height370 ps ps--active-y custum-time-line"
            >
                <ul className="timeline">
                    <Event description={data.description} attachement={data.attachment} date={data.createdAt ?? ''} />
                </ul>
            </div>
            <div className="comment-input">
                <input onChange={onWrite} value={message} placeholder='Ecrivez votre message ici' className="form-control" style={{ width: '80%' }} type="text" />
                <a href="#">Envoyer</a>
            </div>
        </div>
    )
}

interface EventProps {
    description: string
    attachement?: string
    date: string
}
const Event = ({ description, date, attachement }: EventProps): JSX.Element => {
    return (
        <li>
            <a className="timeline-panel text-muted" href="#">
            { attachement && <img src={attachement} alt="attachement" className='chat-attachement' /> }
                <span>{date.toString().slice(0, 10)}</span>
                <h6 className="mb-0">
                    {description}
                </h6>
            </a>
        </li>
    )
}