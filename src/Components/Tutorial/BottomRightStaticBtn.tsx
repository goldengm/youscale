import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlayCircle } from "react-icons/fa";
import style from "./tutorial.module.css";
// import { Button } from "reactstrap";
import { Button } from "../../common";

interface Props {
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function BottomRightStaticBtn({ setShowVideo }: Props) {
  var isClose = localStorage.getItem("videoDisplay");
  let [ShowDisable, setShowDisable] = useState<boolean>(true);

  const onClose = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.setItem("videoDisplay", "video");
    setShowDisable(true);
  };

  //let custumStyle = { display: isClose ? "none" : "block" };

  // useEffect(() => {
  //   if (ShowDisable) {
  //     custumStyle = { display: isClose ? "none" : "block" };
  //   }
  // }, [ShowDisable]);

  const showVidoBox = () => {
    setShowDisable(false);
  };

  return (
    <>
      {!ShowDisable && (
        <div
          //style={custumStyle}
          className={style.BottomRightStaticBtn}
          id="videoItem"
        >
          <div className={style.header}>
            <AiOutlineClose onClick={onClose} size={20} />
          </div>
          <div className={style.main}>
            <FaPlayCircle
              onClick={(e) => setShowVideo(true)}
              size={80}
              className={style.playIcon}
            />
          </div>
          <div className={style.welcomeTxt}>
            Bonjour ! Explorons Youscale avec une vidéo d'une minute.
          </div>
        </div>
      )}

      {ShowDisable && (
        <div>
          <Button
            style={{ zIndex: 1, position: "fixed", bottom: "20px", right: "20px" }}
            color="primary"
            value="Show Video"
            onClick={showVidoBox}
          />
          {/* <Button
            style={{ position: "fixed", bottom: "20px", right: "20px" }}
            onClick={showVidoBox}
          >
            Show Video
          </Button> */}
        </div>
      )}
    </>
  );
}
