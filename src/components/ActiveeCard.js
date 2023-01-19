import React from "react";
import "../assets/css/ActiveeCard.css";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../index";

/**
 * Card-Komponente von Activee
 * @param item
 * @param sport
 * @param compact
 * @returns {JSX.Element}
 * @constructor
 */
export function ActiveeCard({ item, sport = false, compact = false }) {
  const navigate = useNavigate();
  return (
    <span
      className={`activee-card ${compact && "compact"}`}
      onClick={() => navigate(`/${sport ? "sport" : "activity"}/${item._id}`)}>
      <img
        className={`activee-card-image ${compact && "compact"}`}
        src={`${backendUrl}/images/${sport ? "sports" : "activities"}/${item._id}.jpg`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = `${backendUrl}/images/activities/default_activity_image.jpg`;
        }}
        alt="card"
      />
      <div className="activee-card-info">
        <img
          className="activee-card-icon"
          src={`${backendUrl}/icons/sports/${sport ? item._id : item.sport._id}_icon.svg`}
          alt="sport"
        />
        <span className="activee-card-name">{item.name}</span>
      </div>
    </span>
  );
}
