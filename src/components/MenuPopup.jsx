import React from "react";
import AccountIcon from "../assets/svgs/account_icon_black.svg";
import AccountSwitchIcon from "../assets/svgs/account_switch_icon_black.svg";
import ActivitiesIcon from "../assets/svgs/your_activities_icon_black.svg";
import SportsIcon from "../assets/svgs/sports_icon_black.svg";
import SettingsIcon from "../assets/svgs/settings_icon_black.svg";
import { PopupOption } from "./PopupOption.jsx";
import { useNavigate } from "react-router-dom";

/**
 * Menu-Pop-up, welches im Header dem Nutzer die Möglichkeit gibt, die wichtigsten Seiten zu erreichen
 * @param userType
 * @param setOptionsPopupVisible
 * @param setIsProfileSelectionVisible
 * @returns {JSX.Element}
 * @constructor
 */
export function MenuPopup({ userType, setOptionsPopupVisible, setIsProfileSelectionVisible }) {
  const navigate = useNavigate();
  return (
    <div
      className="options-popup"
      onClick={() => {
        setOptionsPopupVisible(false);
      }}>
      <PopupOption ImageSrc={AccountIcon} onClick={() => navigate("/profile")}>
        Dein Profil
      </PopupOption>
      {userType === "participant" && (
        <PopupOption ImageSrc={AccountSwitchIcon} onClick={() => setIsProfileSelectionVisible(true)}>
          Profil wechseln
        </PopupOption>
      )}
      <PopupOption ImageSrc={ActivitiesIcon} onClick={() => navigate("/your-activities")}>
        Deine Aktivitäten
      </PopupOption>
      <PopupOption ImageSrc={SportsIcon} onClick={() => navigate("/sports")}>
        Sportarten
      </PopupOption>
      <PopupOption ImageSrc={SettingsIcon} onClick={() => navigate("/settings")} isLast>
        Einstellungen
      </PopupOption>
    </div>
  );
}
