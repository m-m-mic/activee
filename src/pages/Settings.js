import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ActiveeButton } from "../components/ActiveeButton";
import { useCookies } from "react-cookie";

export function Settings() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userToken", "userId", "userType"]);
  useEffect(() => {
    document.title = "Einstellungen - activee";
  });
  const handleLogout = () => {
    removeCookie("userToken", {
      path: "/",
    });
    removeCookie("userId", {
      path: "/",
    });
    removeCookie("userType", {
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
