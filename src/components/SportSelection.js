import React from "react";
import { HorizontalButton } from "./HorizontalButton";
import { backendUrl } from "../index";

/**
 * Auflistung aller Sportarten eines Nutzers im Profil
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
export function SportSelection({ data }) {
  return (
    <div className="profile-sports-selection">
      {data.sports.map((item, key) => (
        <HorizontalButton iconUrl={`${backendUrl}/icons/sports/${item._id}_icon.svg`} key={key}>
          {item.name}
        </HorizontalButton>
      ))}
    </div>
  );
}
