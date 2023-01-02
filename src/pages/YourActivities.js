import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { UnderConstruction } from "../components/UnderConstruction";
import { ActiveeScrollingCards } from "../components/ActiveeScrollingCards";
import { collectAndShortenDates } from "../scripts/handleDates";
import { TimeTable } from "../components/TimeTable";

export function YourActivities() {
  const [cookies, setCookies] = useCookies(["userToken", "userType"]);
  const [userActivities, setUserActivities] = useState();
  const [shortenedDates, setShortenedDates] = useState([]);
  useEffect(() => {
    if (cookies.userToken) {
      getUserActivities();
    }
  }, []);
  const getUserActivities = () => {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(`http://localhost:3033/activity`, requestOptions).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setUserActivities(data);
          collectAndShortenDates(data, setShortenedDates);
        });
      }
    });
  };
  if (cookies.userToken) {
    if (!userActivities) {
      return null;
    }
    return (
      <>
        <h1>Deine Aktivitäten</h1>
        <h2>Terminkalender</h2>
        <TimeTable data={shortenedDates} />
        <h2>Anstehende Termine</h2>
        <UnderConstruction />
        <h2>{cookies.userType === "participant" ? "Gemerkte Aktivitäten" : "Aktivitäten"}</h2>
        <ActiveeScrollingCards items={userActivities} type="activity" />
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
