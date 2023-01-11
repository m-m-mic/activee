import React, { useEffect, useState } from "react";
import "../assets/css/Home.css";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import { LandingPage } from "./LandingPage";
import { useCookies } from "react-cookie";
import { Subtitle } from "../components/Subtitle";
import { UnderConstruction } from "../components/UnderConstruction";
import { HorizontalButton } from "../components/HorizontalButton";
import AddIconBlack from "../assets/svgs/add_icon_black.svg";
import { ActiveeScrollingCards } from "../components/ActiveeScrollingCards";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { backendUrl } from "../index";
import { getAccountInfo, getRecommendations, getSports } from "../scripts/fetchRequests";

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
      getSports(cookies.userToken, setSports);
      if (cookies.userType === "participant") getRecommendations(cookies.userToken, setRecommendations);
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
        <h2>Deine Aktivitäten</h2>
        <ActiveeScrollingCards items={accountInfo.activities} type={cookies.userType} />
        {cookies.userType === "organisation" && (
          <div className="home-add-button">
            <ActiveeButton iconSrc={AddIconBlack} buttonType="blank" onClick={() => navigate("/activity/new")}>
              Neue Aktivität
            </ActiveeButton>
          </div>
        )}
        <h2>Sportarten</h2>
        <div className="home-sports">
          {sports.map((sport, key) => (
            <HorizontalButton key={key} iconUrl={`${backendUrl}/icons/sports/${sport._id}_icon.svg`} value={sport._id}>
              {sport.name}
            </HorizontalButton>
          ))}
        </div>
        {(cookies.userType === "participant" && recommendations.length) > 0 && (
          <>
            <h2>Empfehlungen für Dich</h2>
            <ActiveeScrollingCards items={recommendations} type="activity" />
          </>
        )}
        {cookies.userType === "organisation" && (
          <>
            <h2>Andere Aktivitäten von deinem Verein</h2>
            <UnderConstruction />
          </>
        )}
      </>
    );
  } else {
    return <Navigate to="/welcome" />;
  }
}
