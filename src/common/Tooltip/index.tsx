import React, { useState } from "react";
// import styles from "./Tooltip.module.css";
import { Tooltip } from "reactstrap";

interface TooltipProps {
  text: string;
  placement?: string;
  children: React.ReactNode;
  target: string;
}

const MyTooltip: React.FC<TooltipProps> = ({ text, children, target, placement }) => {

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      {children}
      <Tooltip
        placement={"right"}
        isOpen={tooltipOpen}
        target={target}
        toggle={toggle}
      >
        <b style={{ fontSize: 16 }}>{text}</b>
      </Tooltip>
    </>
  );
};

export default MyTooltip;
