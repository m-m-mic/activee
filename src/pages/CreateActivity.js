import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { ModifyActivity } from "../components/ModifyActivity";
import { activityTemplate } from "../scripts/inputTemplates";
import { newActivityInputValidator } from "../scripts/handleInputs";

export default function CreateActivity() {
  const [cookies, setCookies] = useCookies(["userToken", "userType"]);
  const [activityInfo, setActivityInfo] = useState();
  const [inputValidation, setInputValidation] = useState(newActivityInputValidator);

  useEffect(() => {
    getAccountInfo();
    document.title = "Neue Aktivität erstellen - activee";
  }, []);
  const getAccountInfo = () => {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${cookies.userToken}` },
    };
    fetch("http://localhost:3033/account/info", requestOptions)
      .then((response) => response.json())
      .then((data) => fillActivityTemplate(data));
  };
  const fillActivityTemplate = (data) => {
    let template = activityTemplate;
    template = { ...template, club: data.club };
    template = {
      ...template,
      trainers: [
        {
          _id: data._id,
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
        return null;
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
