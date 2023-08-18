import React, { useEffect, useState } from 'react'
import ModalWrapper from '../ModalWrapper'
import { useGetOrderCommentQuery, useMakeOrderCommentMutation } from '../../../../services/api/ClientApi/ClientOrderApi'
import './modal.style.css'
import { number } from 'yup';

type HistoryType = {
    message: string;
    createdAt: string;
}[];

interface Props {
    id_order: string,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function CommentOrderModal({ showModal, setShowModal, id_order }: Props): JSX.Element {

    const { data, refetch } = useGetOrderCommentQuery({ id_order })

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
        <ModalWrapper title={'Commentaire'} showModal={showModal} setShowModal={setShowModal} id='HistoryOrderModal'>
            <FormBody data={data?.data} id_order={id_order} refetch={refetch} />
        </ModalWrapper>
    )
}

interface FormBodyProps {
    data: HistoryType | undefined
    id_order: string
    refetch: () => any
}
const FormBody = ({ data, id_order, refetch }: FormBodyProps) => {
    const [comment, { isLoading }] = useMakeOrderCommentMutation()
    const [message, setMessage] = useState<string>('')

    const onWrite = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const { value } = e.target
        setMessage(value)
    }

    const MakeComment = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()

        const data = { message, id_order: Number(id_order) }

        comment(data).unwrap()
            .then(res => {
                refetch()
            })
            .catch(err => console.error(err))

        setMessage('')
    }

    return (
        <div className="card-body">
            <div
                id="dlab_W_TimeLine"
                className="widget-timeline dlab-scroll height370 ps ps--active-y custum-time-line"
            >
                <ul className="timeline">
                    {data && data.map(dt => <Event description={dt.message} date={dt.createdAt} />)}
                </ul>
            </div>
            {
                isLoading ? 'Traitement' :
                    <div className="comment-input">
                        <input onChange={onWrite} value={message} className="form-control" style={{ width: '80%'}} type="text" />
                        <a onClick={MakeComment} href="#">Commenter</a>
                    </div>
            }
        </div>
    )
}

interface EventProps {
    description: string,
    date: string
}
const Event = ({ description, date }: EventProps): JSX.Element => {
    return (
        <li>
            <div className="timeline-badge primary" />
            <a className="timeline-panel text-muted" href="#">
                <span>{date}</span>
                <h6 className="mb-0">
                    {description}
                </h6>
            </a>
        </li>
    )
}