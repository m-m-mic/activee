import React, { useEffect, useState } from "react";
import "../assets/css/Home.css";
import { useNavigate } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import { LandingPage } from "../components/LandingPage";
import { useCookies } from "react-cookie";
import { Subtitle } from "../components/Subtitle";
import { UnderConstruction } from "../components/UnderConstruction";
import { HorizontalButton } from "../components/HorizontalButton";
import AddIconBlack from "../assets/svgs/add_icon_black.svg";
import { ActiveeScrollingCards } from "../components/ActiveeScrollingCards";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { backendUrl } from "../index";

export function Home() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["userToken", "userType"]);
  const [accountInfo, setAccountInfo] = useState();
  const [sports, setSports] = useState([]);
  useEffect(() => {
    if (cookies.userToken) {
      document.title = "Übersicht - activee";
      getAccountInfo();
      getSports();
    } else {
      document.title = "activee";
    }
  }, [cookies.userToken]);
  const getAccountInfo = () => {
    const url = backendUrl + "/account/info";
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => setAccountInfo(data));
  };
  const getSports = () => {
    const url = backendUrl + "/sport";
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => setSports(data));
  };
  if (cookies.userToken) {
    if (!accountInfo || !sports) {
      return <LoadingAnimation />;
    }
    return (
      <>
        <h1>Guten Tag, {accountInfo.first_name}!</h1>
        {cookies.userType === "organisation" && <Subtitle>{accountInfo.club}</Subtitle>}
        <h2>Deine Aktivitäten</h2>
        {accountInfo.activities.length > 0 ? (
          <ActiveeScrollingCards items={accountInfo.activities} type="activity" />
        ) : (
          <div>
            {cookies.userType === "participant" ? (
              "Du hast dir noch keine Aktivität gemerkt."
            ) : (
              <div>Du hast noch keine Aktivität erstellt.</div>
            )}
          </div>
        )}
        {cookies.userType === "organisation" && (
          <div className="home-add-button">
            <ActiveeButton iconSrc={AddIconBlack} buttonType="transparent" onClick={() => navigate("/activity/new")}>
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
        {cookies.userType === "participant" ? (
          <>
            <h2>Empfehlungen für Dich</h2>
            <UnderConstruction />
          </>
        ) : (
          <>
            <h2>Andere Aktivitäten von deinem Verein</h2>
            <UnderConstruction />
          </>
        )}
      </>
    );
  } else {
    return <LandingPage />;
  }
}
