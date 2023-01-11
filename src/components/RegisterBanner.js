import React from "react";
import { useNavigate } from "react-router-dom";
import { ActiveeButton } from "./ActiveeButton";
import "../assets/css/RegisterBanner.css";

export function RegisterBanner() {
  const navigate = useNavigate();
  return (
    <div className="register-banner">
      <div className="register-text">
        <h3 className="register-cta">Interessiert?</h3>
        <div className="register-description">
          Dann melde dich jetzt an bei <span>activee</span>!
        </div>
      </div>
      <div className="register-buttons">
        <ActiveeButton buttonType="register" onClick={() => navigate("/register")}>
          Registrieren
        </ActiveeButton>
        <ActiveeButton buttonType="login" onClick={() => navigate("/login")}>
          Anmelden
        </ActiveeButton>
      </div>
    </div>
  );
}
