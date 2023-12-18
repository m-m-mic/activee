import React from "react";
import "../assets/css/AboutUs.css";
import { ActiveeButton } from "../components/ActiveeButton.jsx";
import GithubIconWhite from "../assets/svgs/github_icon_white.svg";

/**
 * Seite über die Ersteller von Activee
 * @returns {JSX.Element}
 * @constructor
 */
export function AboutUs() {
  return (
    <>
      <h1>Über uns</h1>
      <div className="about-us-pixels">
        <img className="pixel-alex-img" src="pixel-alex.png" alt="pixel alex" />
        <img className="pixel-bella-img" src="pixel-bella.png" alt="pixel bella" />
        <img className="pixel-evi-img" src="pixel-evi.png" alt="pixel evi" />
        <img className="pixel-melli-img" src="pixel-melli.png" alt="pixel melli" />
        <img className="pixel-michi-img" src="pixel-michi.png" alt="pixel michi" />
      </div>
      <div className="about-us-text">
        <b>Diese Seite ist im Rahmen des Projektmoduls "Web" im Wintersemester 2022/23 entstanden.</b>
      </div>
      <div className="about-us-buttons">
        <a href="https://github.com/m-m-mic/activee" target="_blank" rel="noreferrer">
          <ActiveeButton buttonType="primary" iconSrc={GithubIconWhite}>
            Frontend
          </ActiveeButton>
        </a>
        <a href="https://github.com/m-m-mic/activee-backend" target="_blank" rel="noreferrer">
          <ActiveeButton buttonType="secondary" iconSrc={GithubIconWhite}>
            Backend
          </ActiveeButton>
        </a>
      </div>
    </>
  );
}
