import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../index";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { ModifyActivity } from "../components/ModifyActivity";
import { Subtitle } from "../components/Subtitle";

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
            <h2>Interessentenliste</h2>
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
