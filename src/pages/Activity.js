import React, { useState, useEffect } from "react";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { Subtitle } from "../components/Subtitle";
import { InformationTag } from "../components/InformationTag";
import "../assets/css/Activity.css";
import { TimeTable } from "../components/TimeTable";
import { useCookies } from "react-cookie";
import { ActiveeButton } from "../components/ActiveeButton";
import { useNavigate } from "react-router-dom";
import MessageIconWhite from "../assets/svgs/message_icon_white.svg";
import { getBirthYear, shortenDates } from "../scripts/handleDates";
import EditIconBlack from "../assets/svgs/edit_icon_black.svg";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { backendUrl } from "../index";

export function Activity() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken", "userId", "userType"]);
  const [activityInfo, setActivityInfo] = useState();
  const [shortenedDates, setShortenedDates] = useState([]);
  const [isOwner, setOwner] = useState(false);
  const [isParticipant, setParticipant] = useState(false);
  let { id } = useParams();
  useEffect(() => {
    getActivityInfo();
  }, [id]);

  const getActivityInfo = () => {
    const url = backendUrl + "/activity/" + id;
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(url, requestOptions).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setActivityInfo(data);
          setRelations(data);
          shortenDates(data.dates, setShortenedDates);
          document.title = `${data.name} - activee`;
        });
      } else {
        return navigate("/404");
      }
    });
  };
  const setRelations = (data) => {
    if (cookies.userType === "organisation") {
      for (const trainer of data.trainers) {
        if (trainer._id === cookies.userId) return setOwner(true);
      }
    } else {
      for (const participant of data.participants) {
        if (participant._id === cookies.userId) return setParticipant(true);
      }
    }
  };

  if (cookies.userToken) {
    if (!activityInfo) {
      return <LoadingAnimation />;
    }
    return (
      <>
        {cookies.userType === "participant" && !isParticipant && (
          <div className="activity-remember-button">
            <ActiveeButton buttonType="secondary">Aktivität merken</ActiveeButton>
          </div>
        )}
        {cookies.userType === "participant" && isParticipant && (
          <div className="activity-remember-button">
            <ActiveeButton buttonType="secondary">Aktivität entfernen (temp)</ActiveeButton>
          </div>
        )}
        <img
          className="activity-image"
          src={`${backendUrl}/images/activities/${activityInfo._id}.jpg`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.style.display = "none";
          }}
          alt="activity"
        />
        <div className="activity-header">
          <h1 className="activity-name">{activityInfo.name}</h1>
          {isOwner && (
            <NavLink className="activity-edit-link" to={`/activity/${id}/edit`}>
              <img className="activity-edit-icon" src={EditIconBlack} alt="Edit icon" />
            </NavLink>
          )}
        </div>
        <Subtitle>{activityInfo.club}</Subtitle>
        <div className="activity-information-tags">
          <InformationTag iconUrl={`${backendUrl}/icons/sports/${activityInfo.sport._id}_icon.svg`}>
            {activityInfo.sport.name}
          </InformationTag>
          <InformationTag iconUrl={`${backendUrl}/icons/genders/${activityInfo.gender._id}_icon.svg`}>
            {activityInfo.gender.name}
          </InformationTag>
          <InformationTag>
            {getBirthYear(activityInfo.age.age)}
            {!activityInfo.age.isOlderThan && <> oder jünger</>}
            {activityInfo.age.isOlderThan && <> oder älter</>}
          </InformationTag>
          {activityInfo.languages.map((language, key) => (
            <InformationTag key={key} iconUrl={`${backendUrl}/flags/${language._id}_flag.jpg`}>
              {language.name}
            </InformationTag>
          ))}
          {activityInfo.league && <InformationTag>{activityInfo.league}</InformationTag>}
        </div>
        {(activityInfo.requirements || activityInfo.required_items) && (
          <>
            <h2>Voraussetzungen</h2>
            <div>{activityInfo.requirements}</div>
            <div className="activity-required-items">
              {activityInfo.required_items.map((item, key) => (
                <span className="activity-required-item" key={key}>
                  <img
                    className="activity-required-item-image"
                    src={`${backendUrl}/icons/required-items/${item._id}_icon_white.svg`}
                    alt="Item icon"
                  />
                </span>
              ))}
            </div>
          </>
        )}
        {activityInfo.additional_info && (
          <>
            <h2>Infos vom Verein</h2>
            <div>{activityInfo.additional_info}</div>
          </>
        )}
        <h2>Mitgliedsbeitrag</h2>
        <div>{activityInfo.membership_fee ? activityInfo.membership_fee : "Keine Angabe"}</div>
        <h2>Termine</h2>
        <div className="activity-dates">
          <div className="activity-dates-list">
            {activityInfo.dates.map((date, key) => (
              <div className="activity-date-item" key={key}>
                {date.day.label}: {date.starting_time} - {date.ending_time}
              </div>
            ))}
          </div>
          <TimeTable data={shortenedDates} />
        </div>
        <h2>Adresse</h2>
        {activityInfo.address.street} {activityInfo.address.house_number} <br />
        {activityInfo.address.zip_code} {activityInfo.address.city}
        <h2>Übungsleiter:innen</h2>
        {activityInfo.trainers.map((coach, key) => (
          <div key={key}>
            <div className="activity-coach">
              <div className="activity-coach-info">
                <div className="activity-coach-name">
                  {coach.first_name} {coach.last_name}
                </div>
                <div className="activity-coach-email">{coach.show_email && coach.email}</div>
                <div className="activity-coach-phone">{coach.show_phone_number && coach.phone_number}</div>
              </div>
              <img
                className="activity-coach-picture"
                src={`${backendUrl}/images/profiles/${coach._id}.jpg`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = `${backendUrl}/images/profiles/default_account_icon.svg`;
                }}
                alt="coach picture"
              />
            </div>
            {!isOwner && (
              <div className="activity-coach-message-button">
                <ActiveeButton iconSrc={MessageIconWhite} buttonType="primary">
                  Per E-Mail kontaktieren
                </ActiveeButton>
              </div>
            )}
          </div>
        ))}
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
