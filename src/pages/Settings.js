import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import { useCookies } from "react-cookie";

export function Settings() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userId", "userType", "userFirstName", "userLastName"]);
  useEffect(() => {
    document.title = "Einstellungen - activee";
  });
  const handleLogout = () => {
    setCookie("userId", null, {
      path: "/",
    });
    setCookie("userType", null, {
      path: "/",
    });
    setCookie("userFirstName", null, {
      path: "/",
    });
    setCookie("userLastName", null, {
      path: "/",
    });
    navigate("/");
  };
  return (
    <>
      <h1>Einstellungen</h1>
      <ActiveeButton
        buttonType="warning"
        onClick={() => {
          handleLogout();
        }}>
        Ausloggen
      </ActiveeButton>
    </>
  );
}
