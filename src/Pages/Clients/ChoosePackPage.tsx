import React, { useState } from 'react'
import './styles.css'
import { Pack } from '../../models'
import { useGetClientAllPackQuery } from '../../services/api/ClientApi/ClientPackApi'
import { useChossePackMutation } from '../../services/api/ClientApi/ClientApi'
import { logOut } from '../../services/auth/logout'

export default function ChoosePackPage(): JSX.Element {
    const { data } = useGetClientAllPackQuery()
    const [selected, setSelected] = useState<number>(0)
    const [contact, setContact] = useState<string>()
    const [choosePack] = useChossePackMutation()

    const onSavePack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        choosePack({ id_pack: selected, contact: '+212'+contact ?? '+212000000000' }).unwrap()
            .then(res => {
                window.location.href = '/'
                localStorage.setItem('STEP', JSON.stringify('completed'))
            })
            .catch(err => console.log(err))
    }

    const IsContactValid = (): boolean => contact?.length === 9 ? true : false

    return (
        <div>
            <div className='quest-header'>
                <a onClick={() => logOut()} href="/" >Se deconnecter</a>
            </div>
            <div className='pack-sec'>
                <h1>{'Choisissez votre pack'}</h1>

                <div className="pack-choose-list">
                    {data && data.data.map(dt => <PackItems item={dt} setSelected={setSelected} selected={selected} />)}
                </div>

                <Input setContact={setContact} contact={contact} />
                {
                    !IsContactValid() ? <p className='error'>{"Vous devez saisir un contact valide avant de continuer"}</p> :
                        <div className="ques-btn-list">
                            <button onClick={onSavePack} disabled={!IsContactValid()} className={`ques-btn next`}>{'Enregistrer'}</button>
                        </div>
                }
            </div>
        </div>
    )
}

interface PackItemsProps {
    item: Pack
    selected: number
    setSelected: React.Dispatch<React.SetStateAction<number>>
}
const PackItems = ({ item, selected, setSelected }: PackItemsProps): JSX.Element => {
    const title: string[] = ['Commande livre', 'Commande total', 'Nombre team member', 'Nombre de commande permis']

    const onSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setSelected(item.id)
    }

    return (
        <div className="col-xl-4">
            <div className={`card ${selected === item.id && 'selected_pack'}`} onClick={onSelect}>
                <div className="card-header">
                    <h4 className="card-title">{item.name}</h4>
                </div>
                <span className="pack-price">{item.price_per_month}dh/monthly</span>
                <div className="card-body cust-pack-card">
                    <div className="basic-list-group">
                        <ul className="list-group">
                            {item.item_inclued.map((item, index) => <li key={index} className="list-group-item">{`${title[index]}: ${item}`}</li>)}
                        </ul>
                    </div>
                    <>
                        <button
                            type="button"
                            className="btn btn-outline-primary btn-xs pack-btn">
                            Choisir
                        </button>
                    </>
                </div>
            </div>
        </div>
    )
}

interface InputProps {
    setContact: React.Dispatch<React.SetStateAction<string | undefined>>
    contact: string | undefined
}
const Input = ({ setContact, contact }: InputProps) => {
    return (
        <div className={`mb-3 col-md-6`}>
            <label className="form-label">{'Votre contact'}</label>
            <div className="cust-input-content">
                <input
                    role='presentation'
                    autoComplete='off'
                    value={contact}
                    onChange={e => setContact(e.target.value)}
                    type={'number'}
                    className="form-control"
                    placeholder={'0798227737'}
                />
            </div>
        </div>
    )
}