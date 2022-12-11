import React, { useEffect, useState } from "react";
import "../assets/css/Profile.css";
import EditIcon from "../assets/svgs/edit_icon_white.svg";
import { Navigate, NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { TimeTable } from "../components/TimeTable";
import { GenderSelection } from "../components/GenderSelection";
import { SportSelection } from "../components/SportSelection";
import { TransportSelection } from "../components/TransportSelection";

export function Profile() {
  const [cookies, setCookie] = useCookies(["userToken", "userType"]);
  const [accountInfo, setAccountInfo] = useState();
  useEffect(() => {
    getAccountInfo();
    document.title = "Dein Profil - activee";
  }, []);
  const getAccountInfo = () => {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch("http://localhost:3033/account/info", requestOptions)
      .then((response) => response.json())
      .then((data) => setAccountInfo(data));
  };
  if (!accountInfo) {
    return null;
  }
  if (cookies.userToken) {
    return (
      <>
        <div className="profile-user-info">
          <img
            className="profile-user-picture"
            src={`http://localhost:3033/images/profiles/${cookies.userId}.jpg`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "http://localhost:3033/images/profiles/default_account_icon.svg";
            }}
            alt="Profile"
          />
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
        {cookies.userType === "organisation" && <div className="profile-club-name"> {accountInfo.club} </div>}
        <h2>Deine Angaben</h2>
        <div className="profile-general-info">
          <div className="profile-general-info-container">
            <span className="profile-general-info-name">Geboren am</span>
            <span className="profile-general-info-data">{accountInfo.birthday}</span>
          </div>
          {cookies.userType === "organisation" && (
            <div className="profile-general-info-container">
              <span className="profile-general-info-name">Telefonnummer</span>
              <span className="profile-general-info-data">{accountInfo.phone}</span>
            </div>
          )}
          <div className="profile-general-info-container">
            <span className="profile-general-info-name">Adresse</span>
            <span className="profile-general-info-data">
              {accountInfo.address.street}, {accountInfo.address.house_number} <br />
              {accountInfo.address.zip_code} {accountInfo.address.city}
            </span>
          </div>
          <div className="profile-general-info-container language">
            <span className="profile-general-info-name">Sprachen</span>
            <span className="profile-general-info-data">
              {accountInfo.languages.map((item, key) => (
                <img
                  className="profile-general-info-language-icon"
                  src={`http://localhost:3033/flags/${item}_flag.jpg`}
                  alt="language icon"
                  key={key}
                />
              ))}
            </span>
          </div>
        </div>
        {cookies.userType === "participant" && (
          <>
            <h2>Präferenzen</h2>
            <GenderSelection data={accountInfo} />
            <h3>Sportarten</h3>
            <SportSelection data={accountInfo.sports} />
            <h3>Anfahrt</h3>
            <TransportSelection data={accountInfo.transport} />
            <div className="profile-general-info">
              <div className="profile-general-info-container">
                <span className="profile-general-info-name">Distanz</span>
                <span className="profile-general-info-data">{accountInfo.distance} km</span>
              </div>
            </div>
            <h3>Zeiten</h3>
            <TimeTable data={accountInfo.times}></TimeTable>
            {accountInfo.children_accounts && <h2>Unterprofile</h2>}
          </>
        )}
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
