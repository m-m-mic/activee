import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "../assets/css/Sports.css";
import { Navigate } from "react-router-dom";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { ActiveeCard } from "../components/ActiveeCard";
import { backendUrl } from "../index";

/**
 * Seite mit allen Sportarten von Activee
 * @returns {JSX.Element}
 * @constructor
 */
export function Sports() {
  const [cookies, setCookies] = useCookies(["userToken"]);
  const [sports, setSports] = useState([]);
  useEffect(() => {
    if (cookies.userToken) {
      document.title = "Sportarten - activee";
      getSports();
    }
  }, []);

  // Liefert alle vorhandenen Sportarten von activee zurück
  const getSports = () => {
    const url = backendUrl + "/sport";
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => setSports(data));
    // TODO: error-handling
  };

  if (cookies.userToken) {
    if (!sports) {
      return <LoadingAnimation />;
    }
    return (
      <>
        <h1>Sportarten</h1>
        <div className="sports-list">
          {sports.map((item, key) => (
            <ActiveeCard item={item} sport={true} compact={true} key={key} />
          ))}
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
