import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import "../assets/css/Profiles.css";
import { ActiveeButton } from "../components/ActiveeButton";
import { ActiveeDetails } from "../components/ActiveeDetails";
import AddIconBlack from "../assets/svgs/add_icon_black.svg";

export function Profiles() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken", "userId", "userType", "userTier"]);
  const [accountInfo, setAccountInfo] = useState();
  useEffect(() => {
    getAccountInfo();
    document.title = "Profilübersicht - activee";
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
  const changeProfile = (profileId) => {
    const url = "http://localhost:3033/account/change-profile";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
      body: JSON.stringify({ id: profileId }),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => handleCookies(data.token, data.id, data.type, data.tier))
      .then(() => navigate("/"));
  };
  const handleCookies = (token, userId, userType, userTier) => {
    setCookie("userToken", token, {
      path: "/",
    });
    setCookie("userId", userId, {
      path: "/",
    });
    setCookie("userType", userType, {
      path: "/",
    });
    setCookie("userTier", userTier, {
      path: "/",
    });
  };
  if (cookies.userToken) {
    if (!accountInfo) {
      return null;
    }
    if (cookies.userTier === "child") {
      return <Navigate to="/404" />;
    }
    return (
      <>
        <h1>Profilübersicht</h1>
        <div className="profiles-list">
          <div className="profiles-parent">
            <img
              className="profiles-parent-image"
              src={`http://localhost:3033/images/profiles/${accountInfo.id}.jpg`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "http://localhost:3033/images/profiles/default_account_icon.svg";
              }}
              alt="Account icon"
            />
            <span className="profiles-parent-data">
              <div className="profiles-parent-name">
                {accountInfo.first_name} {accountInfo.last_name}
              </div>
              <div>Hauptprofil</div>
            </span>
          </div>
          <hr />
          {accountInfo.related_accounts.map((item, key) => (
            <ActiveeDetails
              key={key}
              summary={
                <>
                  <img
                    className="profiles-child-image"
                    src={`http://localhost:3033/images/profiles/${item.id}.jpg`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "http://localhost:3033/images/profiles/default_account_icon.svg";
                    }}
                    alt="Account icon"
                  />
                  <span className="profiles-child-data">
                    <div className="profiles-child-name">
                      {item.first_name} {item.last_name}
                    </div>
                  </span>
                </>
              }
              content={
                <div className="profiles-details-content">
                  <ActiveeButton onClick={() => changeProfile(item.id)} buttonType="primary">
                    Wechseln
                  </ActiveeButton>
                  <ActiveeButton buttonType="warning">Profil löschen</ActiveeButton>
                </div>
              }
            />
          ))}
          {accountInfo.related_accounts.length < 3 && (
            <div className="profiles-add-button">
              <ActiveeButton iconSrc={AddIconBlack} buttonType="blank">
                Neues Profil
              </ActiveeButton>
            </div>
          )}
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
