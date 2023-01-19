import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../index";
import { LoadingAnimation } from "../components/LoadingAnimation";
import "../assets/css/Sport.css";
import { ActiveeCard } from "../components/ActiveeCard";
import ExpandIconBlack from "../assets/svgs/expand_icon_black.svg";
import parse from "html-react-parser";

/**
 * Seite, auf welcher Details zu der in der ID übergeben Sportart stehen
 * @returns {JSX.Element}
 * @constructor
 */
export function Sport() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken"]);
  const [sportInfo, setSportInfo] = useState();
  const [expandInstruction, setExpandInstruction] = useState(false);
  const [expandHistory, setExpandHistory] = useState(false);

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

        <div className="sport-instruction">
          {parse(sportInfo.description.instruction.short)}
          {expandInstruction && parse(sportInfo.description.instruction.full)}
        </div>
        <div className="sport-description-expand" onClick={() => setExpandInstruction(!expandInstruction)}>
          <img
            className={`sport-description-expand-icon ${expandInstruction ? "expanded" : ""}`}
            src={ExpandIconBlack}
            alt="expand"
          />
        </div>
        <h2>Geschichte</h2>
        <div className="sport-history">
          {parse(sportInfo.description.history.short)}
          {expandHistory && parse(sportInfo.description.history.full)}
        </div>
        <div className="sport-description-expand" onClick={() => setExpandHistory(!expandHistory)}>
          <img
            className={`sport-description-expand-icon ${expandHistory ? "expanded" : ""}`}
            src={ExpandIconBlack}
            alt="expand"
          />
        </div>
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
