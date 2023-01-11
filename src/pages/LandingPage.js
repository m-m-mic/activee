import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import ActiveeLogo50 from "../assets/pngs/50px_activee_logo.png";
import "../assets/css/LandingPage.css";
import { useCookies } from "react-cookie";

export function LandingPage() {
  const [cookies, setCookies] = useCookies(["userToken", "userType"]);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Sport ist wie Klebstoff - activee";
  }, []);
  if (cookies.userToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="activee-banner">
        <img src={ActiveeLogo50} alt="activee Logo" />
        <span className="activee-name-large">activee</span>
      </div>
      <div>
        Sport kann eine sehr wichtige Rolle bei der Integration spielen! Sport ist wie Klebstoff; ein verbindendes Element.
        <br />
        Egal welche Sportart, mit <b>activee</b> findest du deinen Verein.
      </div>
      <h1>Sei dabei!</h1>
      <div className="action-buttons">
        <ActiveeButton buttonType="primary" onClick={() => navigate("/register")}>
          Registrieren
        </ActiveeButton>
        <ActiveeButton buttonType="outline" onClick={() => navigate("/login")}>
          Anmelden
        </ActiveeButton>
      </div>
    </>
  );
}
