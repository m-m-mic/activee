import React, { useState } from "react";
import { backendUrl } from "../index";
import { ActiveeDetails } from "./ActiveeDetails";
import "../assets/css/RequiredItems.css";

/**
 * Liste an Mitbringsel einer Aktivität (in Form einer Details-Komponente)
 * @param items
 * @returns {JSX.Element}
 * @constructor
 */
export function RequiredItems({ items }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div onClick={() => setOpen(!open)}>
        <ActiveeDetails summary={<h2 className="required-items-title">Mitbringsel</h2>} />
      </div>
      {open ? (
        <div className="required-item-details">
          {items.map((item, key) => (
            <div key={key} className="required-item-expanded">
              <div className="required-item-image-container">
                <img
                  className="required-item-image"
                  src={`${backendUrl}/icons/required-items/${item._id}_icon_white.svg`}
                  alt="Item icon"
                />
              </div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="required-items">
          {items.map((item, key) => (
            <span className="required-item" key={key}>
              <img
                className="required-item-image"
                src={`${backendUrl}/icons/required-items/${item._id}_icon_white.svg`}
                alt="Item icon"
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
