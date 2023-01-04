import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ModifyActivity } from "../components/ModifyActivity";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ActivityInputValidator } from "../scripts/handleInputs";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { backendUrl } from "../index";

export function EditActivity() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["userToken", "userType"]);
  const [activityInfo, setActivityInfo] = useState();
  const [inputValidation, setInputValidation] = useState(ActivityInputValidator);
  let { id } = useParams();

  useEffect(() => {
    getActivityInfo();
    document.title = "Aktivität bearbeiten - activee";
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
        });
      } else {
        return navigate("/404");
      }
    });
  };

  if (cookies.userToken) {
    if (cookies.userType === "organisation") {
      if (!activityInfo) {
        return <LoadingAnimation />;
      }
      return (
        <ModifyActivity
          editMode={true}
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
