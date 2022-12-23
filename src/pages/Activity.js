import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Subtitle } from "../components/Subtitle";
import { InformationTag } from "../components/InformationTag";
import "../assets/css/Activity.css";
import { TimeTable } from "../components/TimeTable";
import { useCookies } from "react-cookie";
import { ActiveeButton } from "../components/ActiveeButton";
import { useNavigate } from "react-router-dom";
import MessageIconWhite from "../assets/svgs/message_icon_white.svg";
import { getBirthYear, shortenDates, translateWeekday } from "../scripts/handleDates";

export function Activity() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken", "userId", "userType"]);
  const [activityInfo, setActivityInfo] = useState();
  const [shortenedDates, setShortenedDates] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    getActivityInfo();
  }, [id]);

  const getActivityInfo = () => {
    fetch("http://localhost:3033/activity/" + id).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setActivityInfo(data);
          shortenDates(data.dates, setShortenedDates);
        });
      } else {
        return navigate("/404");
      }
    });
  };
  if (cookies.userToken) {
    if (!activityInfo) {
      return null;
    }
    return (
      <>
        <img
          className="activity-image"
          src={`http://localhost:3033/images/activities/${activityInfo._id}.jpg`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.style.display = "none";
          }}
          alt="activity"
        />
        <h1>{activityInfo.name}</h1>
        <Subtitle>{activityInfo.club}</Subtitle>
        <div className="activity-information-tags">
          <InformationTag iconUrl={`http://localhost:3033/icons/sports/${activityInfo.sport._id}_icon.svg`}>
            {activityInfo.sport.name}
          </InformationTag>
          <InformationTag iconUrl={`http://localhost:3033/icons/genders/${activityInfo.gender._id}_icon.svg`}>
            {activityInfo.gender.name}
          </InformationTag>
          <InformationTag>
            {getBirthYear(activityInfo.age.age)}
            {!activityInfo.age.isOlderThan && <> oder jünger</>}
            {activityInfo.age.isOlderThan && <> oder älter</>}
          </InformationTag>
          {activityInfo.languages.map((language, key) => (
            <InformationTag key={key} iconUrl={`http://localhost:3033/flags/${language._id}_flag.jpg`}>
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
                    src={`http://localhost:3033/icons/required-items/${item._id}_icon_white.svg`}
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
            {activityInfo.dates.map((value, key) => (
              <div className="activity-date-item" key={key}>
                {translateWeekday(value.day)}: {value.starting_time} - {value.ending_time}
              </div>
            ))}
          </div>
          <TimeTable data={shortenedDates} />
        </div>
        <h2>Adresse</h2>
        {activityInfo.address.street}, {activityInfo.address.house_number} <br />
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
                src={`http://localhost:3033/images/profiles/${coach._id}.jpg`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "http://localhost:3033/images/profiles/default_account_icon.svg";
                }}
                alt="coach picture"
              />
            </div>
            <div className="activity-coach-message-button">
              <ActiveeButton iconSrc={MessageIconWhite} buttonType="primary">
                Per E-Mail kontaktieren
              </ActiveeButton>
            </div>
          </div>
        ))}
        <div className="activity-remember-button">
          <ActiveeButton buttonType="secondary">Aktivität merken</ActiveeButton>
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
