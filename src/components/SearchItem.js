import React from "react";
import { InformationTag } from "./InformationTag";
import { useNavigate } from "react-router-dom";
import "../assets/css/SearchItem.css";
import { backendUrl } from "../index";

export function SearchItem({ item }) {
  const navigate = useNavigate();
  return (
    <div className="search-item" onClick={() => navigate(`/activity/${item._id}`)}>
      <div className="search-item-primary">
        <img
          className="search-item-image"
          src={`${backendUrl}/images/activities/${item._id}.jpg`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = `${backendUrl}/images/activities/default_activity_image.jpg`;
          }}
          alt="activity"
        />
        <span className="search-item-primary-info">
          <div className="search-item-title">
            <img className="search-item-sport-icon" src={`${backendUrl}/icons/sports/${item.sport._id}_icon.svg`} alt="sport" />
            <span className="search-item-name">{item.name}</span>
          </div>
          <div className="search-item-club">{item.club}</div>
          {item.league && (
            <div>
              <InformationTag>{item.league}</InformationTag>
            </div>
          )}
        </span>
      </div>
      <div className="search-item-details">
        <span>{item.age.age}</span>
        <span>{item.address.city}</span>
        <span>{item.gender.name}</span>
        <span>
          {item.dates[0].day.label}, {item.dates[0].starting_time}
        </span>
      </div>
    </div>
  );
}
