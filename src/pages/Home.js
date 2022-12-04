import React from "react";
import { NavLink } from "react-router-dom";

export function Home() {
  return (
    <>
      <h1>Guten Tag, Max</h1>
      <div className="filler-div">
        <NavLink to="/activity/0">Activity</NavLink>
      </div>
    </>
  );
}
