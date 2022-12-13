import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import "../assets/css/Profiles.css";
import { ActiveeButton } from "../components/ActiveeButton";
import { ActiveeDetails } from "../components/ActiveeDetails";

export function Profiles() {
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
          <div key={key}>
            <ActiveeDetails
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
                  <span className="profiles-child-container">
                    <div className="profiles-child-name">
                      {item.first_name} {item.last_name}
                    </div>
                  </span>
                </>
              }
              content={
                <div className="profiles-details-content">
                  <ActiveeButton buttonType="primary">Wechseln</ActiveeButton>
                  <ActiveeButton buttonType="warning">Unterprofil löschen</ActiveeButton>
                </div>
              }
            />
            <hr />
          </div>
        ))}
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
