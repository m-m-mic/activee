import React from "react";
import { VerticalButton } from "./VerticalButton";
import { handleGenderChange } from "../scripts/handlePreferenceChange";

export function GenderSelection({ data, setData, isEditMode }) {
  if (isEditMode) {
    return (
      <div className="profile-gender-selection">
        <VerticalButton
          onClick={() => handleGenderChange("female", data, setData)}
          iconUrl="http://localhost:3033/icons/genders/female_icon.svg"
          isChecked={data.genders.includes("female")}>
          Weiblich
        </VerticalButton>
        <VerticalButton
          onClick={() => handleGenderChange("male", data, setData)}
          iconUrl="http://localhost:3033/icons/genders/male_icon.svg"
          isChecked={data.genders.includes("male")}>
          Männlich
        </VerticalButton>
        <VerticalButton
          onClick={() => handleGenderChange("mix", data, setData)}
          iconUrl="http://localhost:3033/icons/genders/mix_icon.svg"
          isChecked={data.genders.includes("mix")}>
          Mix
        </VerticalButton>
      </div>
    );
  } else {
    return (
      <div className="profile-gender-selection">
        <VerticalButton iconUrl="http://localhost:3033/icons/genders/female_icon.svg" isChecked={data.genders.includes("female")}>
          Weiblich
        </VerticalButton>
        <VerticalButton iconUrl="http://localhost:3033/icons/genders/male_icon.svg" isChecked={data.genders.includes("male")}>
          Männlich
        </VerticalButton>
        <VerticalButton iconUrl="http://localhost:3033/icons/genders/mix_icon.svg" isChecked={data.genders.includes("mix")}>
          Mix
        </VerticalButton>
      </div>
    );
  }
}
