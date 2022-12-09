import React from "react";
import AccountIcon from "../assets/svgs/account_icon_black.svg";
import AccountSwitchIcon from "../assets/svgs/account_switch_icon_black.svg";
import ActivitiesIcon from "../assets/svgs/your_activities_icon_black.svg";
import SportsIcon from "../assets/svgs/sports_icon_black.svg";
import SettingsIcon from "../assets/svgs/settings_icon_black.svg";
import { PopupOption } from "./PopupOption";

export function MenuPopup({ userType, setOptionsPopupVisible }) {
  if (userType === "participant") {
    return (
      <div
        className="options-popup"
        onClick={() => {
          setOptionsPopupVisible(false);
        }}>
        <PopupOption ImageSrc={AccountIcon} LinkUrl={`/profile`}>
          Dein Profil
        </PopupOption>
        <PopupOption ImageSrc={AccountSwitchIcon} LinkUrl="#">
          Profil wechseln
        </PopupOption>
        <PopupOption ImageSrc={ActivitiesIcon} LinkUrl={`/activities`}>
          Deine Aktivitäten
        </PopupOption>
        <PopupOption ImageSrc={SportsIcon} LinkUrl={`/sports`}>
          Sportarten
        </PopupOption>
        <PopupOption ImageSrc={SettingsIcon} LinkUrl={`/settings`} isLast>
          Einstellungen
        </PopupOption>
      </div>
    );
  } else if (userType === "organisation") {
    return (
      <div
        className="options-popup"
        onClick={() => {
          setOptionsPopupVisible(false);
        }}>
        <PopupOption ImageSrc={AccountIcon} LinkUrl={`/profile`}>
          Dein Profil
        </PopupOption>
        <PopupOption ImageSrc={ActivitiesIcon} LinkUrl={`/activities`}>
          Deine Aktivitäten
        </PopupOption>
        <PopupOption ImageSrc={SportsIcon} LinkUrl={`/sports`}>
          Sportarten
        </PopupOption>
        <PopupOption ImageSrc={SettingsIcon} LinkUrl={`/settings`} isLast>
          Einstellungen
        </PopupOption>
      </div>
    );
  }
}
