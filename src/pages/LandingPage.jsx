import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton.jsx";
import ActiveeLogo from "../assets/pngs/150px_activee_logo.png";
import "../assets/css/LandingPage.css";
import { useCookies } from "react-cookie";
import LandingPage1 from "../assets/pngs/landing_page_1.png";
import { backendUrl } from "../index.jsx";
import { HorizontalButton } from "../components/HorizontalButton.jsx";
import { ActiveeCard } from "../components/ActiveeCard.jsx";

/**
 * Landing-Page für nicht angemeldete Nutzer
 * @returns {JSX.Element}
 * @constructor
 */
export function LandingPage() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["userToken", "userType"]);
  const [sports, setSports] = useState(null);
  const [sportIndex, setSportIndex] = useState(0);
  const [autoChange, setAutoChange] = useState(true);

  useEffect(() => {
    document.title = "Sport ist wie Klebstoff - activee";
    getLandingPageSports();
  }, []);

  // Solange autoChange true ist, wird countUpIndex alle 5s aufgerufen
  useEffect(() => {
    if (autoChange) {
      const interval = setInterval(() => {
        countUpIndex();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoChange]);

  // Fetched Vorschläge für Sportarten und Aktivitäten
  const getLandingPageSports = () => {
    const url = backendUrl + "/landing-page";
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(url, requestOptions).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => setSports(data));
      } else {
        setSports(false);
      }
    });
  };

  // Zählt sportIndex hoch bzw. setzt ihn wieder auf 0, sobald 4 erreicht wird
  const countUpIndex = () => {
    return setSportIndex((sportIndex) => {
      if (sportIndex < 3) {
        sportIndex++;
      } else {
        sportIndex = 0;
      }
      return sportIndex;
    });
  };

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
        {sports && (
          <div className="landing-page-suggestions">
            <div className="landing-page-suggestions-title">Wie wäre es mit...</div>
            <div className="landing-page-sports">
              {sports.map((sport, key) => (
                <HorizontalButton
                  key={key}
                  onClick={() => {
                    setSportIndex(key);
                    setAutoChange(false);
                  }}
                  iconUrl={`${backendUrl}/icons/sports/${sport._id}_icon.svg`}
                  active={key === sportIndex}>
                  {sport.name}
                </HorizontalButton>
              ))}
            </div>
            <div className="landing-page-suggestions-title">So viele Möglichkeiten!</div>
            <div className="landing-page-activities">
              <div className="landing-page-activities-inner" style={{ transform: `translateX(-${sportIndex * 100}%)` }}>
                {sports.map((sport) => (
                  <div key={sport._id} className="landing-page-activities-item-container">
                    <div className="landing-page-activities-item">
                      {sport.activities.map((activity) => (
                        <ActiveeCard item={activity} compact key={activity._id} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
