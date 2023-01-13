import React, { useState } from "react";
import ExpandIconBlack from "../assets/svgs/expand_icon_black.svg";
import "../assets/css/ActiveeDetails.css";

/**
 * Details-Komponente von Activee
 * @param summary
 * @param content
 * @param onClick
 * @param open
 * @returns {JSX.Element}
 * @constructor
 */
export function ActiveeDetails({ summary, content, onClick, open = false }) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <details onClick={onClick} className="activee-details">
      <summary className="activee-details-summary" onClick={() => setIsOpen(!isOpen)}>
        {summary}
        <img
          className={isOpen ? "activee-details-expand-icon open" : "activee-details-expand-icon"}
          alt="Expand"
          src={ExpandIconBlack}
        />
      </summary>
      {content}
    </details>
  );
}
