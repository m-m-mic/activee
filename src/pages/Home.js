import React, { useEffect, useState } from "react";
import "../assets/css/Home.css";
import { Navigate, useNavigate } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import { useCookies } from "react-cookie";
import { Subtitle } from "../components/Subtitle";
import { HorizontalButton } from "../components/HorizontalButton";
import AddIconBlack from "../assets/svgs/add_icon_black.svg";
import { ActiveeScrollingCards } from "../components/ActiveeScrollingCards";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { backendUrl } from "../index";
import ExpandIconBlack from "../assets/svgs/expand_icon_black.svg";
import { ActiveeDisclaimer } from "../components/ActiveeDisclaimer";

/**
 * Startseite für angemeldete Nutzer
 * @returns {JSX.Element}
 * @constructor
 */
export function Home() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["userToken", "userType"]);
  const [accountInfo, setAccountInfo] = useState();
  const [sports, setSports] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
  const [disclaimer, setDisclaimer] = useState("");

  useEffect(() => {
    if (cookies.userToken) {
      document.title = "Übersicht - activee";
      getAccountInfo();
      getCuratedSports();
      getShortenedRecommendations();
    }
  }, [cookies.userToken]);

  // Liefert alle Informationen des Nutzeraccounts zurück
  const getAccountInfo = () => {
    const url = backendUrl + "/account/info";
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(url, requestOptions).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => setAccountInfo(data));
      } else {
        setIsDisclaimerVisible(true);
        setDisclaimer("Account konnte nicht geladen werden");
      }
    });
  };

  // Liefert vier Sportarten (die eigenen Präferenzen + potenziell Empfehlungen) zurück
  const getCuratedSports = () => {
    const url = backendUrl + "/curated/sport";
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => setSports(data));
    // TODO: error-handling
  };

  // Liefert empfohlene Aktivitäten anhand von Nutzerpräferenzen zurück
  const getShortenedRecommendations = () => {
    let url;
    if (cookies.userType === "participant") {
      url = backendUrl + "/activity/recommendations/shortened";
    } else {
      url = backendUrl + "/activity/club/shortened";
    }
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(url, requestOptions).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => setRecommendations(data));
      } else {
        setIsDisclaimerVisible(true);
        setDisclaimer("Empfohlene Aktivitäten konnten nicht geladen werden");
      }
    });
  };

  if (cookies.userToken) {
    if (!accountInfo || !sports || !recommendations) {
      return (
        <>
          <ActiveeDisclaimer
            isDisclaimerVisible={isDisclaimerVisible}
            setIsDisclaimerVisible={setIsDisclaimerVisible}
            type="closable">
            {disclaimer}
          </ActiveeDisclaimer>
          <LoadingAnimation />
        </>
      );
    }
    return (
      <>
        <h1>Guten Tag, {accountInfo.first_name}!</h1>
        {cookies.userType === "organisation" && <Subtitle>{accountInfo.club}</Subtitle>}
        <div className="heading-button" onClick={() => navigate("/your-activities")}>
          <h2>Deine Aktivitäten</h2>
          <img src={ExpandIconBlack} className="heading-icon" alt="arrow" />
        </div>
        <ActiveeScrollingCards items={accountInfo.activities} type={cookies.userType} />
        {cookies.userType === "organisation" && (
          <div className="home-add-button">
            <ActiveeButton iconSrc={AddIconBlack} buttonType="blank" onClick={() => navigate("/activity/new")}>
              Neue Aktivität
            </ActiveeButton>
          </div>
        )}
        <div className="heading-button" onClick={() => navigate("/sports")}>
          <h2>Sportarten</h2>
          <img src={ExpandIconBlack} className="heading-icon" alt="arrow" />
        </div>
        <div className="home-sports">
          {sports.map((sport, key) => (
            <HorizontalButton
              key={key}
              onClick={() => navigate(`sport/${sport._id}`)}
              iconUrl={`${backendUrl}/icons/sports/${sport._id}_icon.svg`}
              value={sport._id}>
              {sport.name}
            </HorizontalButton>
          ))}
        </div>
        {recommendations.length > 0 && (
          <>
            {cookies.userType === "participant" ? (
              <div className="heading-button" onClick={() => navigate("/search")}>
                <h2>Empfehlungen für Dich</h2>
                <img src={ExpandIconBlack} className="heading-icon" alt="arrow" />
              </div>
            ) : (
              <div className="heading-button" onClick={() => navigate("/search")}>
                <h2>Andere Aktivitäten von Deinem Verein</h2>
                <img src={ExpandIconBlack} className="heading-icon" alt="arrow" />
              </div>
            )}
            <ActiveeScrollingCards items={recommendations} type="activity" />
          </>
        )}
      </>
    );
  } else {
    return <Navigate to="/welcome" />;
  }
}
