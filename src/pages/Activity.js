import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Subtitle } from "../components/Subtitle";

export function Activity() {
  const [activityInfo, setActivityInfo] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    const getActivityInfo = () => {
      fetch("http://localhost:1337/activity/" + id)
        .then((response) => response.json())
        .then((data) => setActivityInfo(data));
    };
    getActivityInfo();
  }, [id]);

  return (
    <>
      <h1>{activityInfo.name}</h1>
      <Subtitle>{activityInfo.club}</Subtitle>
    </>
  );
}
