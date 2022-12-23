import React, { useEffect } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import { useCookies } from "react-cookie";
import { handleLogout } from "../scripts/handleCookieChange";

export function Settings() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userToken", "userId", "userType", "userTier"]);
  useEffect(() => {
    document.title = "Einstellungen - activee";
  });
  if (cookies.userToken) {
    return (
      <>
        <h1>Einstellungen</h1>
        {cookies.userTier === "parent" && (
          <>
            <NavLink to={`/settings/profiles`}>
              <ActiveeButton buttonType="primary">Profilübersicht</ActiveeButton>
            </NavLink>
            <br />
          </>
        )}
        <ActiveeButton
          buttonType="warning"
          onClick={() => {
            handleLogout(removeCookie, navigate);
          }}>
          Ausloggen
        </ActiveeButton>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
