import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Subtitle } from "../components/Subtitle";
import { ActiveeChip } from "../components/ActiveeChip";
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
import { RequiredItems } from "../components/RequiredItems";
import { RegisterBanner } from "../components/RegisterBanner";
import { ManageActivityPopUp } from "../components/ManageActivityPopUp";
import { ActiveeDisclaimer } from "../components/ActiveeDisclaimer";
import StarUnfilledIconWhite from "../assets/svgs/star_unfilled_icon_white.svg";
import StarFilledIconWhite from "../assets/svgs/star_filled_icon_white.svg";

/**
 * Die Activity-Seite zeigt alle Informationen über eine Aktivität an
 * @returns {JSX.Element}
 * @constructor
 */
export function Activity() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken", "userId", "userType"]);
  const [activityInfo, setActivityInfo] = useState();
  const [shortenedDates, setShortenedDates] = useState([]);
  const [isOwner, setOwner] = useState(false);
  const [isParticipant, setParticipant] = useState(false);
  const [isManageProfileSelectionVisible, setManageProfileSelectionVisible] = useState(false);
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
  // ID-Parameter aus der URL
  let { id } = useParams();

  // Fetched ActivityInfo, sobald Seite gerendert wird
  useEffect(() => {
    getActivityInfo();
  }, [id]);

  // Fetched ActivityInfo und ändert den Titel zum Namen der Aktivität
  // Redirect auf 404, falls Aktivität nicht gefunden werden kann
  const getActivityInfo = () => {
    const url = backendUrl + "/activity/" + id;
    let requestOptions;
    if (cookies.userToken) {
      requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${cookies.userToken}` },
      };
    } else {
      requestOptions = { method: "GET" };
    }
    fetch(url, requestOptions).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setActivityInfo(data);
          if (cookies.userToken) {
            setRelations(data);
            shortenDates(data.dates, setShortenedDates);
          }
          document.title = `${data.name} - activee`;
        });
      } else {
        return navigate("/404");
      }
    });
  };

  // Entscheidet anhand von activityInfo, welches Verhältnis der Nutzer zur aufgerufenen Aktivität hat
  // z.B. ist er als Teilnehmer angemeldet, oder ein Trainer der Aktivität etc.
  const setRelations = (data) => {
    if (cookies.userType === "organisation") {
      for (const trainer of data.trainers) {
        if (trainer._id === cookies.userId) return setOwner(true);
      }
    } else {
      for (const participant of data.participants) {
        if (participant === cookies.userId) return setParticipant(true);
      }
    }
    setOwner(false);
    setParticipant(false);
  };

  if (!activityInfo) {
    return <LoadingAnimation />;
  }
  return (
    <>
      <ActiveeDisclaimer
        isDisclaimerVisible={isDisclaimerVisible}
        setIsDisclaimerVisible={setIsDisclaimerVisible}
        variant="confirmed"
        type="closable"
        timed>
        Änderungen übernommen
      </ActiveeDisclaimer>
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
      <Subtitle>
        {activityInfo.club} {isOwner && <ActiveeChip primary>Deine Aktivität</ActiveeChip>}{" "}
        {isParticipant && <ActiveeChip primary>Gemerkt</ActiveeChip>}
      </Subtitle>
      <div className="activity-information-tags">
        <ActiveeChip
          iconUrl={`${backendUrl}/icons/sports/${activityInfo.sport._id}_icon.svg`}
          onClick={() => {
            if (cookies.userToken) navigate(`/sport/${activityInfo.sport._id}`);
          }}>
          {activityInfo.sport.name}
        </ActiveeChip>
        <ActiveeChip iconUrl={`${backendUrl}/icons/genders/${activityInfo.gender._id}_icon.svg`}>
          {activityInfo.gender.name}
        </ActiveeChip>
        <ActiveeChip>
          {getBirthYear(activityInfo.age.age)}
          {!activityInfo.age.isOlderThan && <> oder jünger</>}
          {activityInfo.age.isOlderThan && <> oder älter</>}
        </ActiveeChip>
        {activityInfo.languages.map((language, key) => (
          <ActiveeChip key={key} iconUrl={`${backendUrl}/flags/${language._id}_flag.jpg`}>
            {language.name}
          </ActiveeChip>
        ))}
        {activityInfo.league && <ActiveeChip>{activityInfo.league}</ActiveeChip>}
      </div>
      {activityInfo.requirements && (
        <>
          <h2>Voraussetzungen</h2>
          <div>{activityInfo.requirements}</div>
        </>
      )}
      {activityInfo.required_items.length > 0 && <RequiredItems items={activityInfo.required_items} />}
      {activityInfo.additional_info && (
        <>
          <h2>Infos vom Verein</h2>
          <div>{activityInfo.additional_info}</div>
        </>
      )}
      {cookies.userToken && (
        <>
          <h2>Termine</h2>
          <div className="activity-dates">
            <div className="activity-dates-list">
              {activityInfo.dates.map((date, key) => (
                <div className="activity-date-item" key={key}>
                  {date.day.label}: {date.starting_time} - {date.ending_time}
                </div>
              ))}
            </div>
            <TimeTable data={shortenedDates} activity />
          </div>
        </>
      )}
      {cookies.userToken && (
        <>
          <h2>Adresse</h2>
          {activityInfo.address.street} {activityInfo.address.house_number} <br />
          {activityInfo.address.zip_code} {activityInfo.address.city}
        </>
      )}
      {activityInfo.membership_fee && (
        <>
          <h2>Mitgliedsbeitrag</h2>
          <div>{activityInfo.membership_fee ? activityInfo.membership_fee : "Keine Angabe"}</div>
        </>
      )}

      {cookies.userToken && (
        <>
          <h2>Übungsleiter:innen</h2>
          {activityInfo.trainers.map((coach, key) => (
            <div key={key}>
              <div>
                <div className="activity-coach">
                  <img
                    className="activity-coach-picture"
                    src={`${backendUrl}/images/profiles/${coach._id}.jpg`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = `${backendUrl}/images/profiles/default_account_icon.svg`;
                    }}
                    alt="trainer"
                  />
                  <div className="activity-coach-info">
                    <div className="activity-coach-name">
                      {coach.first_name} {coach.last_name}
                    </div>
                    <div className="activity-coach-email">{coach.show_email && coach.email}</div>
                    <div className="activity-coach-phone">{coach.show_phone_number && coach.phone_number}</div>
                  </div>
                </div>
                {!isOwner && coach.show_email && (
                  <div className="activity-coach-message-button">
                    <ActiveeButton iconSrc={MessageIconWhite} buttonType="secondary">
                      Per E-Mail kontaktieren
                    </ActiveeButton>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}
      {isOwner && (
        <div className="activity-participants-button">
          <ActiveeButton buttonType="primary" onClick={() => navigate(`/activity/${id}/participants`)}>
            Interessentenliste
          </ActiveeButton>
        </div>
      )}
      {cookies.userToken && cookies.userType === "participant" && (
        <div className="activity-remember-button">
          <ActiveeButton
            onClick={() => setManageProfileSelectionVisible(true)}
            iconSrc={activityInfo.participants.includes(cookies.userId) ? StarFilledIconWhite : StarUnfilledIconWhite}
            buttonType="primary">
            {activityInfo.participants.includes(cookies.userId) ? "Aktivität verwalten" : "Aktivität merken"}
          </ActiveeButton>
        </div>
      )}
      {cookies.userType === "participant" && (
        <ManageActivityPopUp
          userToken={cookies.userToken}
          id={id}
          getActivityInfo={getActivityInfo}
          participants={activityInfo.participants}
          ProfileSelectionVisible={isManageProfileSelectionVisible}
          setProfileSelectionVisible={setManageProfileSelectionVisible}
          setIsDisclaimerVisible={setIsDisclaimerVisible}
        />
      )}
      {!cookies.userToken && <RegisterBanner />}
    </>
  );
}
