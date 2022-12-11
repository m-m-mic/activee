import React from "react";
import { HorizontalButton } from "./HorizontalButton";
import { handleSportRemoval } from "../scripts/handlePreferenceChange";

export function SportSelection({ data, setData, isEditMode }) {
  if (isEditMode) {
    return (
      <div className="profile-sports-selection">
        {data.sports.map((item, key) => (
          <HorizontalButton
            onClick={() => handleSportRemoval(item.value, data, setData)}
            editMode
            iconUrl={`http://localhost:3033/icons/sports/${item.value}_icon.svg`}
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
          <HorizontalButton iconUrl={`http://localhost:3033/icons/sports/${item.value}_icon.svg`} key={key}>
            {item.name}
          </HorizontalButton>
        ))}
      </div>
    );
  }
}
