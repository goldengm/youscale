import React, { useState } from 'react'
import './styles.css'
import { useSaveResponseMutation } from '../../services/api/ClientApi/ClientApi'
import { logOut } from '../../services/auth/logout'

interface QuestionCardModel {
  value: string
  order: number
}

export default function QuestionPage(): JSX.Element {
  const [currAnswer, setCurrAnswer] = useState<number>(1)

  const [q1] = useState<QuestionCardModel[]>([{
    order: 1,
    value: 'Je viens de commencer le e-commerce'
  },
  {
    order: 2,
    value: 'Je vends déjà sur internet'
  }
  ])

  const [q2] = useState<QuestionCardModel[]>([{
    order: 1,
    value: 'Shopify'
  },
  {
    order: 2,
    value: 'Youcan'
  },
  {
    order: 3,
    value: 'Woocommerce'
  },
  {
    order: 4,
    value: 'Wordpress'
  },
  {
    order: 5,
    value: 'Autre'
  }
  ])

  const [q3] = useState<QuestionCardModel[]>([{
    order: 1,
    value: 'Youtube ads'
  },
  {
    order: 2,
    value: 'Facebook ads'
  },
  {
    order: 3,
    value: 'Instagram vidéo'
  },
  {
    order: 4,
    value: 'Groupe facebook'
  },
  {
    order: 5,
    value: 'Recommandé par un ami'
  },
  {
    order: 6,
    value: 'De l\'un de nos agents'
  }

  ])

  const [q4] = useState<QuestionCardModel[]>([{
    order: 1,
    value: 'Comparer les gains entre produits'
  },
  {
    order: 2,
    value: 'Comparer entre les gens de confirmation'
  },
  {
    order: 3,
    value: 'Automatiser l’exportation  des commandes dans la société de livraison'
  },
  {
    order: 4,
    value: 'Savoir mon gain net en e-commerce'
  },
  {
    order: 5,
    value: 'Maitriser le cout par commande des Ads'
  }
  ])

  return (
    <div>
      <div className='quest-header'>
        <a onClick={()=> logOut()} href="/" >Se deconnecter</a>
      </div>
      {currAnswer === 1 && <Question value={1} title={'Quelle est votre situation ?'} data={q1} setCurrAnswer={setCurrAnswer} />}
      {currAnswer === 2 && <Question value={2} title={'Quel site utilisez-vous ?'} data={q2} setCurrAnswer={setCurrAnswer} />}
      {currAnswer === 3 && <Question value={3} title={'Comment avez-vous entendu parler de nous ?'} data={q3} setCurrAnswer={setCurrAnswer} />}
      {currAnswer === 4 && <QuestionMultiple value={4} title={'Quel est votre  but principal de l\'utilisation de notre système ?'} data={q4} setCurrAnswer={setCurrAnswer} />}
    </div>
  )
}

interface QuestionProps {
  title: string
  value: number
  data: QuestionCardModel[]
  setCurrAnswer: React.Dispatch<React.SetStateAction<number>>
}
const Question = ({ title, data, value, setCurrAnswer }: QuestionProps) => {
  const [select, setSelect] = useState<number>(0)

  const onSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    const currentValue = localStorage.getItem('questionTopics')
    if (currentValue) {
      const data = JSON.parse(currentValue)
      data[String(value)] = select

      localStorage.setItem('questionTopics', JSON.stringify(data))
    } else {
      const data: any = {}
      data[String(value)] = select

      localStorage.setItem('questionTopics', JSON.stringify(data))
    }

    if (value === 4) return
    setCurrAnswer(value + 1)
  }

  const onBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (value === 1) return
    setCurrAnswer(value - 1)
  }

  return (
    <section className='question-sec'>
      <h1>{title}</h1>
      <div className='list-question'>
        {data.map(qs => <QuestionCard order={qs.order} value={qs.value} select={select} setSelect={setSelect} />)}
      </div>

      <div className="ques-btn-list">
        {value !== 1 && <button onClick={onBack} className='ques-btn back'>Retour</button>}
        <button onClick={onSave} disabled={Boolean(!select)} className={`ques-btn next ${!select && 'next-disable'}`}>{value === 4 ? 'Valider' : 'Suivant'}</button>
      </div>

    </section>
  )
}

interface QuestionCardProps {
  value: string
  order: number
  select: number
  setSelect: React.Dispatch<React.SetStateAction<number>>
}
const QuestionCard = ({ value, order, setSelect, select }: QuestionCardProps): JSX.Element => {

  const onSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setSelect(order)
  }

  return (
    <div onClick={onSelect} className={`question-card ${select === order && 'select-card'}`}>
      <div className="question-card-circle">
      </div>
      <h4 className="question-card-value">{value}</h4>
    </div>
  )
}

const QuestionMultiple = ({ title, data, value, setCurrAnswer }: QuestionProps) => {
  const [select, setSelect] = useState<number[]>([])
  const [saveResponse] = useSaveResponseMutation()

  const onSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    const currentValue = localStorage.getItem('questionTopics')
    if (currentValue) {
      const data = JSON.parse(currentValue)
      data[String(value)] = select

      localStorage.setItem('questionTopics', JSON.stringify(data))
    } else {
      const data: any = {}
      data[String(value)] = select

      localStorage.setItem('questionTopics', JSON.stringify(data))
    }

    // send data to api and redirect to choose pack
    if(currentValue){
      const data = JSON.parse(currentValue)

      saveResponse({ response: data }).unwrap()
      .then(res => {
          window.location.href = '/choose_pack'
          localStorage.setItem('STEP', JSON.stringify('pack'))
      })
      .catch(err=> console.log(err))
    }
  }

  const onBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (value === 1) return
    setCurrAnswer(value - 1)
  }

  return (
    <section className='question-sec'>
      <h1>{title}</h1>
      <div className='list-question'>
        {data.map(qs => <QuestionMultipleCard order={qs.order} value={qs.value} select={select} setSelect={setSelect} />)}
      </div>

      <div className="ques-btn-list">
        {value !== 1 && <button onClick={onBack} className='ques-btn back'>Retour</button>}
        <button onClick={onSave} disabled={Boolean(!select)} className={`ques-btn next ${!select && 'next-disable'}`}>{value === 4 ? 'Valider' : 'Suivant'}</button>
      </div>

    </section>
  )
}

interface QuestionnMultipleCardProps {
  value: string
  order: number
  select: number[]
  setSelect: React.Dispatch<React.SetStateAction<number[]>>
}
const QuestionMultipleCard = ({ value, order, setSelect, select }: QuestionnMultipleCardProps): JSX.Element => {

  const onSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setSelect((prevSate)=> [...prevSate, order])
  }

  return (
    <div onClick={onSelect} className={`question-card ${select.includes(order) && 'select-card'}`}>
      <div className="question-card-circle">
      </div>
      <h4 className="question-card-value">{value}</h4>
    </div>
  )
}