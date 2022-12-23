import React, { useEffect, useState } from "react";
import "../assets/css/Home.css";
import { NavLink } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import { LandingPage } from "../components/LandingPage";
import { useCookies } from "react-cookie";
import { Subtitle } from "../components/Subtitle";
import { UnderConstruction } from "../components/UnderConstruction";
import { HorizontalButton } from "../components/HorizontalButton";

export function Home() {
  const [cookies, setCookies] = useCookies(["userToken", "userType"]);
  const [accountInfo, setAccountInfo] = useState();
  const [sports, setSports] = useState([]);
  useEffect(() => {
    getAccountInfo();
    getSports();
    if (cookies.userToken) {
      document.title = "Übersicht - activee";
    } else {
      document.title = "activee";
    }
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
  const getSports = () => {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch("http://localhost:3033/sport", requestOptions)
      .then((response) => response.json())
      .then((data) => setSports(data));
  };
  if (cookies.userToken) {
    if (!accountInfo || !sports) {
      return null;
    }
    return (
      <>
        <h1>Guten Tag, {accountInfo.first_name}!</h1>
        {cookies.userType === "organisation" && <Subtitle>Club name</Subtitle>}
        <div>
          <NavLink to={`/activity/0`}>
            <ActiveeButton buttonType="primary">Activity</ActiveeButton>
          </NavLink>
          {cookies.userType === "organisation" && (
            <NavLink to={`/activity/new`}>
              <ActiveeButton buttonType="primary">New Activity</ActiveeButton>
            </NavLink>
          )}
        </div>
        <h2>Anstehende Termine</h2>
        <UnderConstruction />
        {accountInfo.activities > 0 ? (
          <>
            <h2>Deine Aktivitäten</h2>
            <div className="home-your-activities">Accounts go here</div>
          </>
        ) : (
          ""
        )}
        <h2>Sportarten</h2>
        <div className="home-sports">
          {sports.map((sport, key) => (
            <HorizontalButton key={key} iconUrl={`http://localhost:3033/icons/sports/${sport._id}_icon.svg`} value={sport._id}>
              {sport.name}
            </HorizontalButton>
          ))}
        </div>
        <h2>Empfehlungen für Dich</h2>
        <UnderConstruction />
      </>
    );
  } else {
    return <LandingPage />;
  }
}
