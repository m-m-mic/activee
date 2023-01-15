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
        <h2>Anleitung</h2>
        <div className="sport-instruction">{sportInfo.description.instruction}</div>
        <h2>Geschichte</h2>
        <div className="sport-history">{sportInfo.description.history}</div>
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
