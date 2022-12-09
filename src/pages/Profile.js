import React from "react";
import { useUser } from "../layouts/Layout";
import "../assets/css/Profile.css";
import AccountIcon from "../assets/svgs/account_icon_black.svg";
import EditIcon from "../assets/svgs/edit_icon_white.svg";
import GermanIcon from "../assets/svgs/german_icon.svg";
import { NavLink } from "react-router-dom";

export function Profile() {
  const user = useUser();
  if (user === "participant") {
    return (
      <>
        <div className="profile-user-info">
          <img className="profile-user-picture" src={AccountIcon} alt="Profile" />
          <span className="profile-user-credentials">
            <div className="profile-user-name">User Name</div>
            <div className="profile-user-email">user.name@email.com</div>
          </span>
          <NavLink className="profile-user-edit-link" to={`/profile/edit?user=${user}`}>
            <img className="profile-user-edit-icon" src={EditIcon} alt="Edit icon" />
          </NavLink>
        </div>
        <h2>Deine Angaben</h2>
        <div className="profile-general-info">
          <div className="profile-general-info-container">
            <span className="profile-general-info-name">Geboren am</span>
            <span className="profile-general-info-data">00.00.0000</span>
          </div>
          <div className="profile-general-info-container">
            <span className="profile-general-info-name">Adresse</span>
            <span className="profile-general-info-data">
              Straße, Nr. <br />
              00000 Stadt
            </span>
          </div>
          <div className="profile-general-info-container language">
            <span className="profile-general-info-name">Sprachen</span>
            <span className="profile-general-info-data">
              <img className="profile-general-info-language-icon" src={GermanIcon} alt="language icon" />
            </span>
          </div>
        </div>
        <h2>Präferenzen</h2>
        <h3>Sportarten</h3>
        <h3>Anfahrt</h3>
        <h3>Zeiten</h3>
      </>
    );
  } else if (user === "organisation") {
    return (
      <>
        <div className="profile-user-info">
          <img className="profile-user-picture" src={AccountIcon} alt="Profile" />
          <span className="profile-user-credentials">
            <div className="profile-user-name">User Name</div>
            <div className="profile-user-email">user.name@email.com</div>
          </span>
          <NavLink className="profile-user-edit-link" to={`/profile/edit?user=${user}`}>
            <img className="profile-user-edit-icon" src={EditIcon} alt="Edit icon" />
          </NavLink>
        </div>
        <div className="profile-club-name">Club name</div>
        <h2>Deine Angaben</h2>
        <div className="profile-general-info">
          <div className="profile-general-info-container">
            <span className="profile-general-info-name">Geboren am</span>
            <span className="profile-general-info-data">00.00.0000</span>
          </div>
          <div className="profile-general-info-container">
            <span className="profile-general-info-name">Telefonnummer</span>
            <span className="profile-general-info-data">0123 123 123</span>
          </div>
          <div className="profile-general-info-container language">
            <span className="profile-general-info-name">Sprachen</span>
            <span className="profile-general-info-data">
              <img className="profile-general-info-language-icon" src={GermanIcon} alt="language icon" />
              <img className="profile-general-info-language-icon" src={GermanIcon} alt="language icon" />
            </span>
          </div>
        </div>
      </>
    );
  }
}
