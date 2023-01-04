import React from "react";
import { HorizontalButton } from "./HorizontalButton";
import { handleSportRemoval } from "../scripts/handlePreferenceChange";
import { backendUrl } from "../index";

export function SportSelection({ data, setData, isEditMode }) {
  if (isEditMode) {
    return (
      <div className="profile-sports-selection">
        {data.sports.map((item, key) => (
          <HorizontalButton
            onClick={() => handleSportRemoval(item._id, data, setData)}
            editMode
            iconUrl={`${backendUrl}/icons/sports/${item._id}_icon.svg`}
            key={key}>
            {item.name}
          </HorizontalButton>
        ))}
      </div>
    );
  } else {
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
}
