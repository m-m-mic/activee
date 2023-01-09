import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { ModifyActivity } from "../components/ModifyActivity";
import { activityTemplate, dateTemplate } from "../scripts/inputTemplates";
import { newActivityInputValidator } from "../scripts/handleInputs";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { backendUrl } from "../index";

export default function CreateActivity() {
  const [cookies, setCookies] = useCookies(["userToken", "userType", "userId"]);
  const [activityInfo, setActivityInfo] = useState();
  const [inputValidation, setInputValidation] = useState(newActivityInputValidator);

  useEffect(() => {
    getAccountInfo();
    document.title = "Neue Aktivität erstellen - activee";
  }, []);

  // Fetched AccountInfo und erstellt Template für ModifyActivity.js
  const getAccountInfo = () => {
    const url = backendUrl + "/account/info";
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => fillActivityTemplate(data));
  };

  // Erstellt ein leeres Activity Objekt, welches die Daten des Nutzers in trainers beinhaltet
  const fillActivityTemplate = (data) => {
    let template = structuredClone(activityTemplate);
    template = { ...template, club: data.club };
    template = {
      ...template,
      dates: [{ ...dateTemplate, id: crypto.randomUUID() }],
      trainers: [
        {
          _id: cookies.userId,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          show_email: true,
          phone_number: data.phone_number,
          show_phone_number: true,
        },
      ],
    };
    setActivityInfo(template);
  };

  if (cookies.userToken) {
    if (cookies.userType === "organisation") {
      if (!activityInfo) {
        return <LoadingAnimation />;
      }
      return (
        <ModifyActivity
          activityInfo={activityInfo}
          setActivityInfo={setActivityInfo}
          validation={inputValidation}
          setValidation={setInputValidation}
        />
      );
    } else {
      return <Navigate to="/404" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}
