import React, { useEffect, useState } from "react";
import "../assets/css/Profile.css";
import AccountIcon from "../assets/svgs/account_icon_black.svg";
import EditIcon from "../assets/svgs/edit_icon_white.svg";
import GermanIcon from "../assets/svgs/german_icon.svg";
import { Navigate, NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { VerticalButton } from "../components/VerticalButton";
import { HorizontalButton } from "../components/HorizontalButton";
import { TimeTable } from "../components/TimeTable";

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
    fetch("http://localhost:1337/account/info", requestOptions)
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
                <div key={key}>{item}</div>
              ))}
              <img className="profile-general-info-language-icon" src={GermanIcon} alt="language icon" />
            </span>
          </div>
        </div>
        {cookies.userType === "participant" && (
          <>
            <h2>Präferenzen</h2>
            <div className="profile-gender-selection">
              <VerticalButton iconUrl={EditIcon} isChecked={accountInfo.genders.includes("female")}>
                Weiblich
              </VerticalButton>
              <VerticalButton iconUrl={EditIcon} isChecked={accountInfo.genders.includes("male")}>
                Männlich
              </VerticalButton>
              <VerticalButton iconUrl={EditIcon} isChecked={accountInfo.genders.includes("mix")}>
                Mix
              </VerticalButton>
            </div>
            <h3>Sportarten</h3>
            <div className="profile-sports-selection">
              {accountInfo.sports.map((item, key) => (
                <HorizontalButton iconUrl={EditIcon} key={key}>
                  {item.name}
                </HorizontalButton>
              ))}
            </div>
            <h3>Anfahrt</h3>
            <div className="profile-transport-selection">
              <VerticalButton iconUrl={EditIcon} isChecked={accountInfo.transport.includes("on_foot")}>
                zu Fuß
              </VerticalButton>
              <VerticalButton iconUrl={EditIcon} isChecked={accountInfo.transport.includes("bicycle")}>
                Rad
              </VerticalButton>
              <VerticalButton iconUrl={EditIcon} isChecked={accountInfo.transport.includes("car")}>
                Auto
              </VerticalButton>
              <VerticalButton iconUrl={EditIcon} isChecked={accountInfo.transport.includes("bus")}>
                Bus
              </VerticalButton>
              <VerticalButton iconUrl={EditIcon} isChecked={accountInfo.transport.includes("train")}>
                Bahn
              </VerticalButton>
            </div>
            <div className="profile-general-info">
              <div className="profile-general-info-container">
                <span className="profile-general-info-name">Distanz</span>
                <span className="profile-general-info-data">{accountInfo.distance} km</span>
              </div>
            </div>
            <h3>Zeiten</h3>
            <TimeTable timeValues={accountInfo.times}></TimeTable>
            {accountInfo.children_accounts && <h2>Unterprofile</h2>}
          </>
        )}
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
