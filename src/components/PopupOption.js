import React from "react";

export function PopupOption({ ImageSrc, onClick, children, isLast }) {
  return (
    <div>
      <div className="options-selection" onClick={onClick}>
        <img className="options-icon" src={ImageSrc} alt="Options icon" />
        {children}
      </div>
      {!isLast && <hr />}
    </div>
  );
}
