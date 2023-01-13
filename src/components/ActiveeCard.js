import React from "react";
import "../assets/css/ActiveeCard.css";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../index";

/**
 * Card-Komponente von Activee
 * @param item
 * @returns {JSX.Element}
 * @constructor
 */
export function ActiveeCard({ item }) {
  const navigate = useNavigate();
  return (
    <span className="activee-card" onClick={() => navigate(`/activity/${item._id}`)}>
      <img
        className="activee-card-image"
        src={`${backendUrl}/images/activities/${item._id}.jpg`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = `${backendUrl}/images/activities/default_activity_image.jpg`;
        }}
        alt="card"
      />
      <div className="activee-card-info">
        <img className="activee-card-icon" src={`${backendUrl}/icons/sports/${item.sport._id}_icon.svg`} alt="sport" />
        <span className="activee-card-name">{item.name}</span>
      </div>
    </span>
  );
}
