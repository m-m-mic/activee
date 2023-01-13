import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ModifyActivity } from "../components/ModifyActivity";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ActivityInputValidator } from "../scripts/handleInputs";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { backendUrl } from "../index";

/**
 * Seite, mit welchen Nutzer bereits erstellte Aktivitäten bearbeiten können
 * @returns {JSX.Element}
 * @constructor
 */
export function EditActivity() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["userToken", "userType", "userId"]);
  const [activityInfo, setActivityInfo] = useState();
  const [inputValidation, setInputValidation] = useState(ActivityInputValidator);
  const [authorisation, setAuthorisation] = useState(null);
  let { id } = useParams();

  // Fetch-Request wird nur ausgeführt, falls Nutzer type = "organisation" ist
  useEffect(() => {
    if (cookies.userType === "organisation") {
      getActivityInfo();
      document.title = "Aktivität bearbeiten - activee";
    }
  }, [id]);

  // Fetched ActivityInfo
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
          checkForAuthorisation(data.trainers);
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
      if (!activityInfo) {
        return <LoadingAnimation />;
      }
      if (authorisation === false) {
        return <Navigate to="/404" />;
      } else {
        return (
          <ModifyActivity
            editMode={true}
            activityInfo={activityInfo}
            setActivityInfo={setActivityInfo}
            validation={inputValidation}
            setValidation={setInputValidation}
          />
        );
      }
    } else {
      return <Navigate to="/404" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}
