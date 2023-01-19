import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../index";
import { LoadingAnimation } from "../components/LoadingAnimation";
import "../assets/css/Sport.css";
import { ActiveeCard } from "../components/ActiveeCard";

export function Sport() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken"]);
  const [sportInfo, setSportInfo] = useState();

  let { id } = useParams();

  useEffect(() => {
    getSportInfo();
  }, [id]);

  // Fetched den spezifischen Sport anhand von ID-Parameter in URL
  const getSportInfo = () => {
    const url = backendUrl + "/sport/" + id;
    const requestOptions = { method: "GET", headers: { Authorization: `Bearer ${cookies.userToken}` } };
    fetch(url, requestOptions).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setSportInfo(data);
          document.title = `${data.name} - activee`;
        });
      } else {
        return navigate("/404");
      }
    });
  };

  if (cookies.userToken) {
    if (!sportInfo) {
      return <LoadingAnimation />;
    }
    return (
      <>
        <div className="sport-header">
          <img
            className="sport-header-icon"
            src={`${backendUrl}/icons/sports/${sportInfo._id}_icon_black.svg`}
            alt={`${sportInfo.name}`}
          />
          <h1>{sportInfo.name}</h1>
        </div>
        <h2>Beschreibung</h2>
        {id === "basketball" && (
          <div className="sport-basketball-desc">
            <div className="sport-basketball-desc-team">
              Basketball ist eine Hallensportart bei der 2 Teams mit jeweils max. 12 Spieler:innen gegeneinander spielen.
            </div>
            <img className="sport-basketball-desc-team-img" src="basketball-desc-teams.png" alt="basketball teams" />
            <div className="sport-basketball-desc-field">
              Auf dem Spielfeld spielen 5 Spieler:innen der einen Mannschaft gegen 5 der Anderen.
            </div>
            <img className="sport-basketball-desc-field-img" src="basketball-desc-field.png" alt="basketball field" />
            <div className="sport-basketball-desc-goal">
              Das Ziel eines Angriffs ist es, den Ball in den gegnerischen Korb zu werfen, dabei zählt ein regulärer Treffer 2
              Punkte. Gewonnen hat das Team, welches nach 4x10 Minuten die meisten Punkte erziehlt.
            </div>
            <img className="sport-basketball-desc-goal-img" src="basketball-desc-goal.png" alt="basketball goal" />
          </div>
        )}
        {id !== "basketball" && <div className="sport-instruction">{sportInfo.description.instruction}</div>}
        <h2>Geschichte</h2>
        {id === "basketball" && (
          <>
            <span className="sport-basketball-history">
              Basketball wurde von James Naismith 1891 erfunden, einem kanadischen Arzt und Pädagogen. Naismith wollte einen
              Winter-Hallensport für seine Studierenden entwickeln, bei dem sie sich kaum verletzten würden. Für die ersten Spiele
              befestigte er Pfirsichkörbe an den Balkons der Sporthalle, daher der Name Basketball (eng. “basket” im dt. “Korb”).
            </span>
            <img className="sport-basketball-history-img" src="basketball-history.png" alt="basketball history" />
          </>
        )}
        {id !== "basketball" && <div className="sport-history">{sportInfo.description.history}</div>}
        <h2>{sportInfo.name} in deiner Nähe</h2>
        <div className="activity-list">
          {sportInfo.activities.map((item, key) => (
            <ActiveeCard item={item} compact={true} key={key} />
          ))}
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
