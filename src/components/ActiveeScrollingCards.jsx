import React from "react";
import { ActiveeCard } from "./ActiveeCard.jsx";
import "../assets/css/ActiveeCard.css";
import { backendUrl } from "../index.jsx";
import { NavLink } from "react-router-dom";

/**
 * Scrolling-Cards-Komponente von Activee. Akzeptiert eine Liste an items mit _id und name.
 * @param items
 * @param type
 * @returns {JSX.Element}
 * @constructor
 */
export function ActiveeScrollingCards({ items, type }) {
  if (type === "participant" && items.length === 0) {
    return (
      <div className="no-activities">
        <img className="general-sports-image" alt="general sports icon" src={`${backendUrl}/icons/sports/general_icon.svg`} />
        <div className="no-activities-text">
          <div>Du hast dir noch keine Aktivität gemerkt.</div>
          <NavLink className="no-activities-search" to="/search">
            Schau doch mal hier...
          </NavLink>
        </div>
      </div>
    );
  }
  if (type === "organisation" && items.length === 0) {
    return (
      <div className="no-activities">
        <img className="general-sports-image" alt="general sports icon" src={`${backendUrl}/icons/sports/general_icon.svg`} />
        <div className="no-activities-text">
          <div>Du hast noch keine Aktivität erstellt.</div>
        </div>
      </div>
    );
  }
  return (
    <div className="activee-scrolling-cards">
      {items.map((item, key) => (
        <ActiveeCard item={item} key={key} />
      ))}
    </div>
  );
}
