import { AiFillMessage } from 'react-icons/ai'
import { Support } from '../../../models'

interface Props{
    data: Support | undefined
    setItem: React.Dispatch<React.SetStateAction<Support | undefined>>
    setShowMessage: React.Dispatch<React.SetStateAction<boolean>>
}
export default function SupportRow({ data, setItem, setShowMessage }:Props): JSX.Element {

    const onShowChat = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>{
        e.preventDefault()

        setItem(data)
        setShowMessage(true)
    }

    return (
        <tr>
            <th>{data?.id}</th>
            <td>{data?.subject}</td>
            <td>{data?.description}</td>
            <td>{data?.status}</td>
            <td>
                <div className="d-flex">
                    <a
                        href="#"
                        className="btn btn-primary shadow btn-xs sharp me-1"
                        onClick={onShowChat}
                    >
                        <AiFillMessage />
                    </a>
                </div>
            </td>
        </tr>
    )
}
