import React, { useState } from 'react'
import './styles.css'
import { Pack } from '../../models'
import { useGetClientAllPackQuery } from '../../services/api/ClientApi/ClientPackApi'
import { useChossePackMutation } from '../../services/api/ClientApi/ClientApi'
import { logOut } from '../../services/auth/logout'

export default function ChoosePackPage(): JSX.Element {
    const { data } = useGetClientAllPackQuery()
    const [selected, setSelected] = useState<number>(0)
    const [choosePack] = useChossePackMutation()

    const onSavePack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()

        choosePack({ id_pack: selected }).unwrap()
        .then(res=> {
            window.location.href = '/'
            localStorage.setItem('STEP', JSON.stringify('completed'))
        })
        .catch(err=> console.log(err))
    }

    return (
        <div>
            <div className='quest-header'>
                <a onClick={()=> logOut()} href="/" >Se deconnecter</a>
            </div>
            <section className='question-sec'>
                <h1>{'Choisissez votre pack'}</h1>

                <div className="pack-choose-list">
                    {data && data.data.map(dt => <PackItems item={dt} setSelected={setSelected} selected={selected} />)}
                </div>

                <div className="ques-btn-list">
                    <button onClick={onSavePack} className={`ques-btn next`}>{'Enregistrer'}</button>
                </div>
            </section>
        </div>
    )
}

interface PackItemsProps {
    item: Pack
    selected: number
    setSelected: React.Dispatch<React.SetStateAction<number>>
}
const PackItems = ({ item, selected, setSelected }: PackItemsProps): JSX.Element => {

    const onSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        e.preventDefault()
        setSelected(item.id)
    }

    return (
        <div className="col-xl-4">
            <div className={`card ${ selected === item.id && 'selected_pack' }`} onClick={onSelect}>
                <div className="card-header">
                    <h4 className="card-title">{item.name}</h4>
                </div>
                <span className="pack-price">{item.price_per_month}dh/monthly</span>
            </div>
        </div>
    )
}