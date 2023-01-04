import React from "react";
import LoadingApng from "../assets/apngs/loading_animation.png";
import "../assets/css/LoadingAnimation.css";

export function LoadingAnimation() {
  return (
    <div className="loading-animation-container">
      <img src={LoadingApng} className="loading-animation" />
    </div>
  );
}
