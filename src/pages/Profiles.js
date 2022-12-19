import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import "../assets/css/Profiles.css";
import { ActiveeButton } from "../components/ActiveeButton";
import { ActiveeDetails } from "../components/ActiveeDetails";
import AddIconBlack from "../assets/svgs/add_icon_black.svg";
import { CreateNewProfile } from "../components/CreateNewProfile";
import { WarningModal } from "../components/WarningModal";
import { handleCookieChange } from "../scripts/handleCookieChange";

export function Profiles() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken", "userId", "userType", "userTier"]);
  const [isCreateSubAccountVisible, setCreateSubAccountVisible] = useState(false);
  const [isWarningModalVisible, setWarningModalVisible] = useState(false);
  const [activeId, setActiveId] = useState();
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
      .then((data) => handleCookieChange(setCookie, data.token, data.id, data.type, data.tier))
      .then(() => navigate("/"));
  };
  const deleteProfile = () => {
    const url = "http://localhost:3033/account/delete-profile";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookies.userToken}` },
      body: JSON.stringify({ id: activeId }),
    };
    fetch(url, requestOptions).then((response) => {
      if (response.status === 200) {
        setWarningModalVisible(false);
        getAccountInfo();
        return;
      }
      console.log("Something went wrong while deleting profile");
    });
  };
  const handleWarningOpen = (itemId) => {
    setActiveId(itemId);
    setWarningModalVisible(true);
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
        {isCreateSubAccountVisible && (
          <>
            <CreateNewProfile
              isCreateSubAccountVisible={isCreateSubAccountVisible}
              setCreateSubAccountVisible={setCreateSubAccountVisible}
              firstName={accountInfo.first_name}
              lastName={accountInfo.last_name}
              address={accountInfo.address}
            />
            <div
              className="popup-backdrop darken"
              onClick={() => {
                setCreateSubAccountVisible(false);
              }}></div>
          </>
        )}
        {isWarningModalVisible && (
          <>
            <WarningModal
              onClick={() => deleteProfile()}
              isWarningModalVisible={isWarningModalVisible}
              setWarningModalVisible={setWarningModalVisible}
              title={"Profil löschen"}
              action={"löschen"}>
              <b>Willst du das Profil wirklich löschen?</b> <br /> Diese Handlung kann nicht rückgängig gemacht werden.
            </WarningModal>
            <div
              className="popup-backdrop darken"
              onClick={() => {
                setCreateSubAccountVisible(false);
              }}></div>
          </>
        )}
        <h1>Profilübersicht</h1>
        <div className="profiles-list">
          <div className="profiles-parent">
            <img
              className="profiles-parent-image"
              src={`http://localhost:3033/images/profiles/${accountInfo._id}.jpg`}
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
                    src={`http://localhost:3033/images/profiles/${item._id}.jpg`}
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
                  <ActiveeButton onClick={() => changeProfile(item._id)} buttonType="primary">
                    Wechseln
                  </ActiveeButton>
                  <ActiveeButton onClick={() => handleWarningOpen(item._id)} buttonType="warning">
                    Profil löschen
                  </ActiveeButton>
                </div>
              }
            />
          ))}
          {accountInfo.related_accounts.length < 4 && (
            <div className="profiles-add-button">
              <ActiveeButton
                iconSrc={AddIconBlack}
                buttonType="blank"
                onClick={() => {
                  setCreateSubAccountVisible(true);
                }}>
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
