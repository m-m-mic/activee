import React, { useEffect, useState } from "react";
import "../assets/css/Home.css";
import { Navigate, useNavigate } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import { useCookies } from "react-cookie";
import { Subtitle } from "../components/Subtitle";
import { UnderConstruction } from "../components/UnderConstruction";
import { HorizontalButton } from "../components/HorizontalButton";
import AddIconBlack from "../assets/svgs/add_icon_black.svg";
import { ActiveeScrollingCards } from "../components/ActiveeScrollingCards";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { backendUrl } from "../index";
import {
  getAccountInfo,
  getShortenedClubActivities,
  getShortenedRecommendations,
  getCuratedSports,
} from "../scripts/fetchRequests";
import ExpandIconBlack from "../assets/svgs/expand_icon_black.svg";

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

  useEffect(() => {
    if (cookies.userToken) {
      document.title = "Übersicht - activee";
      getAccountInfo(cookies.userToken, setAccountInfo);
      getCuratedSports(cookies.userToken, setSports);
      if (cookies.userType === "participant") {
        getShortenedRecommendations(cookies.userToken, setRecommendations);
      } else {
        getShortenedClubActivities(cookies.userToken, setRecommendations);
      }
    }
  }, [cookies.userToken]);

  if (cookies.userToken) {
    if (!accountInfo || !sports || !recommendations) {
      return <LoadingAnimation />;
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
