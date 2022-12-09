import React, { useEffect, useState } from "react";
import "../assets/css/Profile.css";
import AccountIcon from "../assets/svgs/account_icon_black.svg";
import EditIcon from "../assets/svgs/edit_icon_white.svg";
import GermanIcon from "../assets/svgs/german_icon.svg";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";

export function Profile() {
  const [cookies, setCookie] = useCookies(["userToken", "userType"]);
  const [accountInfo, setAccountInfo] = useState([]);
  useEffect(() => {
    getAccountInfo();
    document.title = "Dein Profil - activee";
  }, []);
  const getAccountInfo = () => {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch("http://localhost:1337/account/info", requestOptions)
      .then((response) => response.json())
      .then((data) => setAccountInfo(data));
  };
  if (cookies.userType) {
    return (
      <>
        <div className="profile-user-info">
          <img className="profile-user-picture" src={AccountIcon} alt="Profile" />
          <span className="profile-user-credentials">
            <div className="profile-user-name">
              {accountInfo.first_name} {accountInfo.last_name}
            </div>
            <div className="profile-user-email">{accountInfo.email}</div>
          </span>
          <NavLink className="profile-user-edit-link" to={`/profile/edit`}>
            <img className="profile-user-edit-icon" src={EditIcon} alt="Edit icon" />
          </NavLink>
        </div>
        {cookies.userType === "organisation" && <div className="profile-club-name">Club name</div>}
        <h2>Deine Angaben</h2>
        <div className="profile-general-info">
          <div className="profile-general-info-container">
            <span className="profile-general-info-name">Geboren am</span>
            <span className="profile-general-info-data">00.00.0000</span>
          </div>
          {cookies.userType === "organisation" && (
            <div className="profile-general-info-container">
              <span className="profile-general-info-name">Telefonnummer</span>
              <span className="profile-general-info-data">0123 123 123</span>
            </div>
          )}
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
        {cookies.userType === "participant" && (
          <>
            <h2>Präferenzen</h2>
            <h3>Sportarten</h3>
            <h3>Anfahrt</h3>
            <h3>Zeiten</h3>
          </>
        )}
      </>
    );
  } else {
    return;
  }
}
