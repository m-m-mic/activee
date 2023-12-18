import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton.jsx";
import { useCookies } from "react-cookie";
import { handleLogout } from "../scripts/handleCookieChange";
import "../assets/css/Settings.css";

/**
 * Seite mit Nutzereinstellungen und Logout
 * @returns {JSX.Element}
 * @constructor
 */
export function Settings() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userToken", "userId", "userType", "userTier"]);

  useEffect(() => {
    if (cookies.userToken) {
      document.title = "Einstellungen - activee";
    }
  });

  if (cookies.userToken) {
    return (
      <>
        <h1>Einstellungen</h1>
        {cookies.userTier === "parent" && (
          <div>
            <ActiveeButton buttonType="primary" onClick={() => navigate("/settings/profiles")}>
              Profilübersicht
            </ActiveeButton>
          </div>
        )}
        <div className="settings-logout">
          <ActiveeButton
            buttonType="outline"
            onClick={() => {
              handleLogout(removeCookie, navigate);
            }}>
            Ausloggen
          </ActiveeButton>
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
