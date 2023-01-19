import React from "react";
import "../assets/css/AboutUs.css";

export function AboutUs() {
  return (
    <>
      <h1>Über uns</h1>
      <div>Diese Seite ist im Rahmen des Projektmoduls "Web" im Wintersemester 2022/23 entstanden.</div>
      <div className="about-us-pixels">
        <img className="pixel-alex-img" src="pixel-alex.png" alt="pixel alex" />
        <img className="pixel-bella-img" src="pixel-bella.png" alt="pixel bella" />
        <img className="pixel-evi-img" src="pixel-evi.png" alt="pixel evi" />
        <img className="pixel-melli-img" src="pixel-melli.png" alt="pixel melli" />
        <img className="pixel-michi-img" src="pixel-michi.png" alt="pixel michi" />
      </div>
    </>
  );
}
