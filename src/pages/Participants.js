import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "../assets/css/Participants.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../index";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { Subtitle } from "../components/Subtitle";
import { ActiveeDetails } from "../components/ActiveeDetails";

export function Participants() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userToken", "userId", "userType"]);
  const [activityParticipants, setActivityParticipants] = useState();
  const [authorisation, setAuthorisation] = useState(null);
  let { id } = useParams();

  // Fetch-Request wird nur ausgeführt, falls Nutzer type = "organisation" ist
  useEffect(() => {
    if (cookies.userType === "organisation") {
      getActivityParticipants();
    }
  }, [id]);

  // Fetched ActivityInfo
  const getActivityParticipants = () => {
    const url = backendUrl + "/activity/" + id + "/participants";
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(url, requestOptions).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setActivityParticipants(data);
          checkForAuthorisation(data.trainers);
          document.title = `Teilnehmer - ${data.name} - activee`;
        });
      } else {
        return navigate("/404");
      }
    });
  };
  // Stellt fest, ob Nutzer in der Trainerliste der Aktivität steht. Wenn ja, wird die Seite gerendert.
  const checkForAuthorisation = (trainers) => {
    for (const trainer of trainers) {
      if (trainer._id === cookies.userId) {
        return setAuthorisation(true);
      }
    }
    return setAuthorisation(false);
  };

  if (cookies.userToken) {
    if (cookies.userType === "organisation") {
      if (!activityParticipants) {
        return (
          <>
            <LoadingAnimation />
          </>
        );
      }
      if (authorisation === false) {
        return <Navigate to="/404" />;
      } else {
        return (
          <>
            <h1>{activityParticipants.name}</h1>
            <Subtitle>{activityParticipants.club}</Subtitle>
            <div className="participants-title">
              <h2>Interessentenliste</h2>
              <span>{activityParticipants.participants.length}</span>
            </div>
            <div className="participant-list">
              {activityParticipants.participants.map((item, key) => (
                <div key={item.id}>
                  <ActiveeDetails
                    summary={
                      <>
                        <img
                          className="participants-image"
                          src={`${backendUrl}/images/profiles/${item._id}.jpg`}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = `${backendUrl}/images/profiles/default_account_icon.svg`;
                          }}
                          alt="Account icon"
                        />
                        <span className="participants-data">
                          <div className="participants-name">
                            {item.first_name} {item.last_name}
                          </div>
                        </span>
                      </>
                    }
                    content={
                      <div className="participants-content">
                        <div className="participants-content-data">
                          <div className="participants-content-data-box">
                            <div className="participants-content-data-name">E-Mail</div>
                            <div>{item.email ? item.email : item.parent_email}</div>
                          </div>
                          {item.birthday && (
                            <div className="participants-content-data-box">
                              <div className="participants-content-data-name">Geboren am</div>
                              <div>{item.birthday}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    }
                  />
                  {key + 1 < activityParticipants.participants.length && <hr className="light" />}
                </div>
              ))}
              {activityParticipants.participants.length === 0 && (
                <span className="participants-empty-disclaimer">
                  <b>Noch keine Teilnehmer:innen haben sich die Aktivität gemerkt.</b>
                </span>
              )}
            </div>
          </>
        );
      }
    } else {
      return <Navigate to="/404" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}
