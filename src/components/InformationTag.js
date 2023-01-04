import React from "react";
import "../assets/css/InformationTag.css";

export function InformationTag({ iconUrl, children }) {
  return (
    <span className={iconUrl ? "information-tag" : "information-tag without-icon"}>
      {iconUrl && <img className="information-tag-icon" src={iconUrl} alt="tag icon" />}
      <div className="information-tag-text">{children}</div>
    </span>
  );
}
