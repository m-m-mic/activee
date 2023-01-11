import React, { useEffect, useState } from "react";
import "../assets/css/YourActivities.css";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { ActiveeScrollingCards } from "../components/ActiveeScrollingCards";
import { collectAndShortenDates } from "../scripts/handleDates";
import { TimeTable } from "../components/TimeTable";
import { ActiveeButton } from "../components/ActiveeButton";
import AddIconBlack from "../assets/svgs/add_icon_black.svg";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { backendUrl } from "../index";

export function YourActivities() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken", "userType"]);
  const [userActivities, setUserActivities] = useState();
  const [shortenedDates, setShortenedDates] = useState([]);

  useEffect(() => {
    if (cookies.userToken) {
      getUserActivities();
    }
  }, []);

  // Fetched alle Aktivitäten eines Nutzers, mitsamt Terminen
  const getUserActivities = () => {
    const url = backendUrl + "/account/info";
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(url, requestOptions).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setUserActivities(data.activities);
          collectAndShortenDates(data.activities, setShortenedDates);
        });
      }
    });
  };

  if (cookies.userToken) {
    if (!userActivities) {
      return <LoadingAnimation />;
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
        <ActiveeScrollingCards items={userActivities} type={cookies.userType} />
        {cookies.userType === "organisation" && (
          <div className="your-activities-add-button">
            <ActiveeButton iconSrc={AddIconBlack} buttonType="blank" onClick={() => navigate("/activity/new")}>
              Neue Aktivität
            </ActiveeButton>
          </div>
        )}
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
