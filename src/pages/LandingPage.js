import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import ActiveeLogo from "../assets/pngs/150px_activee_logo.png";
import "../assets/css/LandingPage.css";
import { useCookies } from "react-cookie";
import LandingPage1 from "../assets/pngs/landing_page_1.png";

/**
 * Landing-Page für nicht angemeldete Nutzer
 * @returns {JSX.Element}
 * @constructor
 */
export function LandingPage() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["userToken", "userType"]);

  useEffect(() => {
    document.title = "Sport ist wie Klebstoff - activee";
  }, []);

  if (cookies.userToken) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <div className="activee-banner">
        <img className="landing-page-activee-logo" src={ActiveeLogo} alt="activee Logo" />
        <span className="activee-name-large">activee</span>
      </div>
      <div className="landing-page">
        <div className="activee-introduction">
          <div className="activee-desc">
            <span>
              Sport kann eine sehr wichtige Rolle bei der Integration spielen! Sport ist wie Klebstoff; ein verbindendes Element.
            </span>
            <span>
              Egal welche Sportart, mit <b>activee</b> findest du deinen Verein.
            </span>
          </div>
          <div className="activee-pictures">
            <img alt="beach volleyball" className="activee-image-1" src={LandingPage1} />
          </div>
        </div>

        <h1 className="activee-cta">Sei dabei!</h1>
        <div className="action-buttons">
          <ActiveeButton buttonType="primary" onClick={() => navigate("/register")}>
            Registrieren
          </ActiveeButton>
          <ActiveeButton buttonType="outline" onClick={() => navigate("/login")}>
            Anmelden
          </ActiveeButton>
        </div>
      </div>
    </div>
  );
}
