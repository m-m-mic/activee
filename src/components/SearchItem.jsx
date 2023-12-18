import React from "react";
import { ActiveeChip } from "./ActiveeChip.jsx";
import { useNavigate } from "react-router-dom";
import "../assets/css/SearchItem.css";
import { backendUrl } from "../index.jsx";
import { getBirthYear } from "../scripts/handleDates";
import ContactIconWhite from "../assets/svgs/contact_icon_white.svg";

/**
 * Ergebniselement der Suche (Aktivität)
 * @param item
 * @returns {JSX.Element}
 * @constructor
 */
export function SearchItem({ item }) {
  const navigate = useNavigate();
  return (
    <div className="search-item" onClick={() => navigate(`/activity/${item._id}`)}>
      <img
        className="search-item-image"
        src={`${backendUrl}/images/activities/${item._id}.jpg`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = `${backendUrl}/images/activities/default_activity_image.jpg`;
        }}
        alt="activity"
      />
      <div className="search-item-info">
        <div className="search-item-primary">
          <img className="search-item-sport-icon" src={`${backendUrl}/icons/sports/${item.sport._id}_icon.svg`} alt="sport" />
          <span className="search-item-name">{item.name}</span>
        </div>
        <div className="search-item-secondary">
          <div className="search-item-club">{item.club}</div>
          {item.league && (
            <div className="search-item-league">
              <ActiveeChip>{item.league}</ActiveeChip>
            </div>
          )}
        </div>
        <span className="search-item-detail">
          <img className="search-item-detail-image" src={ContactIconWhite} alt="location" />
          <span>
            {item.gender.name}, {getBirthYear(item.age.age)} {!item.age.isOlderThan && <> oder jünger</>}
            {item.age.isOlderThan && <> oder älter</>}
          </span>
        </span>
      </div>
    </div>
  );
}
