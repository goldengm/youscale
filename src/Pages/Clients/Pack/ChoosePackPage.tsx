import React, { useState } from 'react'
import style from './styles.module.css'
import { logOut } from '../../../services/auth/logout'
import { useGetClientAllPackQuery } from '../../../services/api/ClientApi/ClientPackApi'
import { Pack } from '../../../models'
import { useChossePackMutation } from '../../../services/api/ClientApi/ClientApi'

type splitResponse = {
    commande: Pack[]
    mensuel: Pack[]
}

const splitPack = (data: Pack[] | undefined): splitResponse => {
    if (!data) return { mensuel: [], commande: [] }

    var commande: Pack[] = []
    var mensuel: Pack[] = []

    data.map(dt => dt.price_per_month ? mensuel.push(dt) : commande.push(dt))

    return { 'commande': commande, mensuel: mensuel }
}

export default function ChoosePackPage(): JSX.Element {

    const { data, isSuccess } = useGetClientAllPackQuery()
    const [selected, setSelected] = useState<number>(0)
    const [type, setType] = useState<'commande' | 'mensuel'>('commande')
    const [choosePack] = useChossePackMutation()

    const forfait = splitPack(data?.data)

    const onSavePack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        choosePack({ id_pack: selected, contact: '+212' + '' ?? '+212000000000' }).unwrap()
            .then(res => {
                window.location.href = '/'
                localStorage.setItem('STEP', JSON.stringify('completed'))
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={style.container}>
            <div onClick={() => logOut()} className={style.logout}>
                <p>Se déconnecter</p>
            </div>

            <h1 className={style.title}>Choisissez votre pack</h1>

            <div className={style.swither}>
                <a
                    onClick={() => setType('commande')}
                    className={`${style.option} ${type === 'commande' && style.active}`}
                    href="#">Par commande</a>
                <a
                    onClick={() => setType('mensuel')}
                    className={`${style.option} ${type === 'mensuel' && style.active}`}
                    href="#">Mensuel</a>
            </div>
            <div className={style.packView}>
                {
                    type === 'commande' ?
                        isSuccess && forfait.commande.map(dt => <PackItems item={dt} setSelected={setSelected} type={type} selected={selected} />) :
                        isSuccess && forfait.mensuel.map(dt => <PackItems item={dt} setSelected={setSelected} type={type} selected={selected} />)
                }
            </div>

            <button onClick={onSavePack} className={style.continueBtn}>Choisir</button>
        </div>
    )
}

interface PackProps {
    item: Pack
    selected: number
    setSelected: React.Dispatch<React.SetStateAction<number>>
    type: "commande" | "mensuel"
}
const PackItems = ({ item, selected, setSelected, type }: PackProps): JSX.Element => {
    const title: string[] = ['Commande livre', 'Commande total', 'Membre d\'équipe', 'Commande par mois']

    const onSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setSelected(item.id)
    }

    return (
        <div className={`${style.pack} ${selected === item.id && style.isSelected}`}>
            <h3 className={style.titlePack}>{item.name}</h3>
            <p className={style.descPack}>
                {type === 'commande' ? item.item_inclued[0] : item.price_per_month}dh/{type === 'commande' ? 'commande' : 'mois'}
            </p>
            <div className={style.items}>
                {item.item_inclued.map((item, index) => item && <Item key={index} description={title[index]} value={item} />)}
                <Item description={'Support'} value={item.support} />
            </div>
            <div onClick={onSelect} className={style.chooseBtn}>Choisir</div>
        </div>
    )
}


interface ItemProps {
    description: string
    value: string
}
const Item = ({ description, value }: ItemProps): JSX.Element => {
    return (
        <div className={style.item}>
            <p className={style.description}>{description}</p>
            <p className={style.value}>{value ? value : 'Illimité'}</p>
        </div>
    )
}