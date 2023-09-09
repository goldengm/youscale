import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FaPlayCircle } from 'react-icons/fa'
import style from './tutorial.module.css'

interface Props{
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>
}
export default function BottomRightStaticBtn({ setShowVideo }:Props) {
  return (
    <div className={style.BottomRightStaticBtn}>
        <div className={style.header}>
          <AiOutlineClose size={20} />
        </div>
        <div className={style.main}>
          <FaPlayCircle onClick={(e)=> setShowVideo(true)} size={80} className={style.playIcon} />
        </div>
        <div className={style.welcomeTxt}>
          Bonjour ! Explorons Youscale avec une vidéo d'une minute.
        </div>
    </div>
  )
}
