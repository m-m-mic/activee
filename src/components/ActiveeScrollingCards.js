import React from "react";
import { ActiveeCard } from "./ActiveeCard";
import "../assets/css/ActiveeCard.css";

export function ActiveeScrollingCards({ items, type }) {
  return (
    <div className="activee-scrolling-cards">
      {items.map((item, key) => (
        <ActiveeCard item={item} type={type} key={key} />
      ))}
    </div>
  );
}
