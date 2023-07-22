import React, { useState } from 'react'
import './styles.css'
import { Pack } from '../../models'
import { useGetClientAllPackQuery } from '../../services/api/ClientApi/ClientPackApi'


export default function ChoosePackPage(): JSX.Element {
    const { data, refetch } = useGetClientAllPackQuery()

    return (
        <div>
            <div className='quest-header'>
                <a href="/" >Youscale</a>
            </div>
            <section className='question-sec'>
                <h1>{'Choisissez votre pack'}</h1>
                
                <div className="pack-choose-list">
                    
                </div>

                <div className="ques-btn-list">
                    <button className={`ques-btn next`}>{'Enregistrer'}</button>
                </div>
            </section>
        </div>
    )
}

interface PackItemsProps {
   item: Pack
}
const PackItems = ({ item  }: PackItemsProps): JSX.Element => {

    return (
        <div className="col-xl-4">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">{item.name}</h4>
                </div>
                <span className="pack-price">{item.price_per_month}dh/monthly</span>
            </div>
        </div>
    )
}