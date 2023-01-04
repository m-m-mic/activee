import React from "react";
import { VerticalButton } from "./VerticalButton";
import { handleGenderChange } from "../scripts/handlePreferenceChange";
import { backendUrl } from "../index";

export function GenderSelection({ data, setData, isEditMode }) {
  if (isEditMode) {
    return (
      <div className="profile-gender-selection">
        <VerticalButton
          onClick={() => handleGenderChange("female", data, setData)}
          iconUrl={`${backendUrl}/icons/genders/female_icon.svg`}
          isChecked={data.genders.includes("female")}>
          Weiblich
        </VerticalButton>
        <VerticalButton
          onClick={() => handleGenderChange("male", data, setData)}
          iconUrl={`${backendUrl}/icons/genders/male_icon.svg`}
          isChecked={data.genders.includes("male")}>
          Männlich
        </VerticalButton>
        <VerticalButton
          onClick={() => handleGenderChange("mix", data, setData)}
          iconUrl={`${backendUrl}/icons/genders/mix_icon.svg`}
          isChecked={data.genders.includes("mix")}>
          Mix
        </VerticalButton>
      </div>
    );
  } else {
    return (
      <div className="profile-gender-selection">
        <VerticalButton iconUrl={`${backendUrl}/icons/genders/female_icon.svg`} isChecked={data.genders.includes("female")}>
          Weiblich
        </VerticalButton>
        <VerticalButton iconUrl={`${backendUrl}/icons/genders/male_icon.svg`} isChecked={data.genders.includes("male")}>
          Männlich
        </VerticalButton>
        <VerticalButton iconUrl={`${backendUrl}/icons/genders/mix_icon.svg`} isChecked={data.genders.includes("mix")}>
          Mix
        </VerticalButton>
      </div>
    );
  }
}
