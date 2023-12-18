import React from "react";

/**
 * Pop-Up Element, welches in MenuPopup.jsx verwendet wird
 * @param ImageSrc
 * @param onClick
 * @param children
 * @param isLast
 * @returns {JSX.Element}
 * @constructor
 */
export function PopupOption({ ImageSrc, onClick, children, isLast }) {
  return (
    <div>
      <div className="options-selection" onClick={onClick}>
        <img className="options-icon" src={ImageSrc} alt="Options icon" />
        {children}
      </div>
      {!isLast && <hr className="options-divider" />}
    </div>
  );
}
