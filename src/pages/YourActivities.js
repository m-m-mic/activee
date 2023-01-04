import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { UnderConstruction } from "../components/UnderConstruction";
import { ActiveeScrollingCards } from "../components/ActiveeScrollingCards";
import { collectAndShortenDates } from "../scripts/handleDates";
import { TimeTable } from "../components/TimeTable";
import { ActiveeButton } from "../components/ActiveeButton";
import AddIconBlack from "../assets/svgs/add_icon_black.svg";

export function YourActivities() {
  const navigate = useNavigate();
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
        {userActivities.length > 0 && (
          <>
            <h2>Terminkalender</h2>
            <TimeTable data={shortenedDates} />
          </>
        )}
        <h2>{cookies.userType === "participant" ? "Gemerkte Aktivitäten" : "Aktivitäten"}</h2>
        {userActivities.length > 0 ? (
          <ActiveeScrollingCards items={userActivities} type="activity" />
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
          <ActiveeButton iconSrc={AddIconBlack} buttonType="transparent" onClick={() => navigate("/activity/new")}>
            Neue Aktivität
          </ActiveeButton>
        )}
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
