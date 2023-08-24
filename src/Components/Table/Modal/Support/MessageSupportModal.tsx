import React, { useEffect, useState } from 'react'
import ModalWrapper from '../ModalWrapper'
import io from 'socket.io-client'
import { ChatMessage, Cient, Support } from '../../../../models';
import { useGetClientQuery } from '../../../../services/api/ClientApi/ClientApi';
import { useGetSupportMessageQuery } from '../../../../services/api/ClientApi/ClientSupportApi';
import { BASE_URL } from '../../../../services/url/API_URL';

const socket = io(BASE_URL, { transports: ['websocket'] })
interface Props {
    item: Support | undefined
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function MessageSupportModal({ showModal, setShowModal, item }: Props): JSX.Element {

    const { data: client } = useGetClientQuery()
    const { data: message, refetch: refetchMessage } = useGetSupportMessageQuery({ id: item?.id ?? 0 })

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
            <FormBody data={item ?? {} as Support} client={client?.data} messageList={message?.data} refetchMessage={refetchMessage} />
        </ModalWrapper>
    )
}

interface FormBodyProps {
    data: Support
    client: Cient | undefined
    messageList: ChatMessage[] | undefined
    refetchMessage: () => any
}
const FormBody = ({ data, client, messageList, refetchMessage }: FormBodyProps) => {
    const [message, setMessage] = useState<string>('')

    const onWrite = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const { value } = e.target
        setMessage(value)
    }

    useEffect(() => {
        socket.on(String(data?.id) ?? '', (orderOption: {}) => {
            console.log('new message')
            refetchMessage()
        })
    }, [])

    const sendMessage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        socket.emit('message', { 'text': message, 'chatId': data.id, 'ClientId': client?.id ?? 0 })
    }

    return (
        <div className="card-body">
            <div
                id="dlab_W_TimeLine"
                className="widget-timeline dlab-scroll height370 ps ps--active-y custum-time-line"
            >
                <ul className="timeline">
                    <Event description={data.description} attachement={data.attachment} idUser={data.id_user ?? 0} date={data.createdAt ?? ''} />
                    {messageList && messageList.map((msg, index) => <Event key={index} idUser={msg.id_user ?? 0} description={msg.message} date={msg.createdAt ?? ''} />)}
                </ul>
            </div>
            <div className="comment-input">
                <input onChange={onWrite} value={message} placeholder='Ecrivez votre message ici' className="form-control" style={{ width: '80%' }} type="text" />
                <a onClick={sendMessage} href="#">Envoyer</a>
            </div>
        </div>
    )
}

interface EventProps {
    description: string
    attachement?: string
    idUser: number
    date: string
}
const Event = ({ description, date, attachement, idUser }: EventProps): JSX.Element => {
    return (
        <li>
            <a className={`timeline-panel text-muted ${!idUser && 'admin-msg'}`} href="#">
                {attachement && <img src={attachement} alt="attachement" className='chat-attachement' />}
                <span>{date.toString().slice(0, 10)}</span>
                <h6 className="mb-0">
                    {!idUser && 'admin: '} {description}
                </h6>
            </a>
        </li>
    )
}