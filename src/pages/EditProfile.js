import React, { useEffect, useState } from "react";
import "../assets/css/Profile.css";
import { EditControls } from "../components/EditControls";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { TimeTable } from "../components/TimeTable";
import { GenderSelection } from "../components/GenderSelection";
import { TransportSelection } from "../components/TransportSelection";
import { SportSelection } from "../components/SportSelection";
import { setAddressStreetInput, setBirthday, setFirstNameInput, setLastNameInput } from "../scripts/validateProfileEditInput";

export function EditProfile() {
  const navigate = useNavigate();
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
  const updateAccountInfo = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
      body: JSON.stringify(accountInfo),
    };
    fetch("http://localhost:3033/account/info", requestOptions)
      .then((response) => response.json())
      .then((data) => setAccountInfo(data))
      .then(() => navigate("/profile"));
  };
  console.log(accountInfo);
  if (!accountInfo) {
    return null;
  }
  if (cookies.userToken) {
    return (
      <>
        <EditControls onConfirmClick={() => updateAccountInfo()} />
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
              <input
                className={setFirstNameInput ? "profile-input-name" : "profile-input-name warning"}
                defaultValue={accountInfo.first_name}
                onChange={(e) => setFirstNameInput(e.target.value, accountInfo, setAccountInfo)}
              />
              <input
                className="profile-input-name"
                defaultValue={accountInfo.last_name}
                onChange={(e) => setLastNameInput(e.target.value, accountInfo, setAccountInfo)}
              />
            </div>
            <div className="profile-user-email">{accountInfo.email}</div>
          </span>
        </div>
        {cookies.userType === "organisation" && <div className="profile-club-name"> {accountInfo.club} </div>}
        <h2>Deine Angaben</h2>
        <div className="profile-general-info">
          <div className="profile-general-info-container">
            <span className="profile-general-info-name">Geboren am</span>
            <span className="profile-general-info-data">
              <input
                className="profile-input"
                type="date"
                defaultValue={accountInfo.birthday}
                onChange={(e) => setBirthday(e.target.value, accountInfo, setAccountInfo)}
              />
            </span>
          </div>
          {cookies.userType === "organisation" && (
            <div className="profile-general-info-container">
              <span className="profile-general-info-name">Telefonnummer</span>
              <span className="profile-general-info-data">
                <input type="tel" className="profile-input" value={accountInfo.phone_number} />
              </span>
            </div>
          )}
          <div className="profile-general-info-container">
            <span className="profile-general-info-name">Adresse</span>
            <span className="profile-general-info-data address">
              <input
                className="profile-input-street"
                placeholder="Straße"
                defaultValue={accountInfo.address.street}
                onChange={(e) => setAddressStreetInput(e.target.value, accountInfo, setAccountInfo)}
              />
              <input
                className="profile-input-house-number"
                placeholder="Nr."
                value={accountInfo.address.house_number}
                onChange={(e) =>
                  setAccountInfo({ ...accountInfo, address: { ...accountInfo.address, house_number: e.target.value } })
                }
              />
              <br />
              <input
                className="profile-input-zip-code"
                placeholder="PLZ"
                value={accountInfo.address.zip_code}
                onChange={(e) =>
                  setAccountInfo({ ...accountInfo, address: { ...accountInfo.address, zip_code: e.target.value } })
                }
              />
              <input
                className="profile-input-city"
                placeholder="Stadt"
                value={accountInfo.address.city}
                onChange={(e) => setAccountInfo({ ...accountInfo, address: { ...accountInfo.address, city: e.target.value } })}
              />
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
            <GenderSelection data={accountInfo} setData={setAccountInfo} isEditMode />
            <h3>Sportarten</h3>
            <SportSelection data={accountInfo} setData={setAccountInfo} isEditMode />
            <h3>Anfahrt</h3>
            <TransportSelection data={accountInfo} setData={setAccountInfo} isEditMode />
            <div className="profile-general-info">
              <div className="profile-general-info-container">
                <span className="profile-general-info-name">Distanz</span>
                <span className="profile-general-info-data">
                  <input
                    type="number"
                    value={accountInfo.distance}
                    onChange={(e) => setAccountInfo({ ...accountInfo, distance: Number(e.target.value) })}
                  />{" "}
                  km
                </span>
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
