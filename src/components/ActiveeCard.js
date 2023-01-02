import React from "react";
import "../assets/css/ActiveeCard.css";
import { useNavigate } from "react-router-dom";

export function ActiveeCard({ item, type }) {
  const navigate = useNavigate();
  return (
    <span className="activee-card" onClick={() => navigate(`/activity/${item._id}`)}>
      <img
        className="activee-card-image"
        src={`http://localhost:3033/images/activities/${item._id}.jpg`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = "http://localhost:3033/images/activities/default_activity_image.jpg";
        }}
        alt="card image"
      />
      <div className="activee-card-info">
        <img className="activee-card-icon" src={`http://localhost:3033/icons/sports/${item.sport._id}_icon.svg`} alt="sport" />
        <span className="activee-card-name">{item.name}</span>
      </div>
    </span>
  );
}
