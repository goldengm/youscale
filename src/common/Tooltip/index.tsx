import React, { useState } from "react";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  return (
    <div
      className={styles["tooltip-container"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div className={styles["tooltip"]}>
          <div className={styles["tooltip-arrow"]} />
          <div className={styles["tooltip-content"]}>{text}</div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
