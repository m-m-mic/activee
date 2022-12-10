import React, { useEffect } from "react";
import "../assets/css/TimeTable.css";

export function TimeTable({ timeValues }) {
  useEffect(() => {
    fillTable(timeValues);
  }, [timeValues]);
  const fillTable = (timeValues) => {
    for (const time of timeValues) {
      document.getElementById(`${time.day}-${time.starting_hour}`).style.background = "#65B9A8";
      document.getElementById(`row-${time.starting_hour}`).style.display = "flex";
    }
  };
  return (
    <table className="time-table">
      <tr id="table-header">
        <th className="time-bracket-first">Zeit</th>
        <th className="time-day">Mo</th>
        <th className="time-day">Di</th>
        <th className="time-day">Mi</th>
        <th className="time-day">Do</th>
        <th className="time-day">Fr</th>
        <th className="time-day">Sa</th>
        <th className="time-day">So</th>
      </tr>
      <tr id="row-6">
        <th className="time-bracket">6:00</th>
        <th id="mo-6"></th>
        <th id="tu-6"></th>
        <th id="we-6"></th>
        <th id="th-6"></th>
        <th id="fr-6"></th>
        <th id="sa-6"></th>
        <th id="su-6"></th>
      </tr>
      <tr id="row-8">
        <th className="time-bracket">8:00</th>
        <th id="mo-8"></th>
        <th id="tu-8"></th>
        <th id="we-8"></th>
        <th id="th-8"></th>
        <th id="fr-8"></th>
        <th id="sa-8"></th>
        <th id="su-8"></th>
      </tr>
      <tr id="row-10">
        <th className="time-bracket">10:00</th>
        <th id="mo-10"></th>
        <th id="tu-10"></th>
        <th id="we-10"></th>
        <th id="th-10"></th>
        <th id="fr-10"></th>
        <th id="sa-10"></th>
        <th id="su-10"></th>
      </tr>
      <tr id="row-12">
        <th className="time-bracket">12:00</th>
        <th id="mo-12"></th>
        <th id="tu-12"></th>
        <th id="we-12"></th>
        <th id="th-12"></th>
        <th id="fr-12"></th>
        <th id="sa-12"></th>
        <th id="su-12"></th>
      </tr>
      <tr id="row-14">
        <th className="time-bracket">14:00</th>
        <th id="mo-14"></th>
        <th id="tu-14"></th>
        <th id="we-14"></th>
        <th id="th-14"></th>
        <th id="fr-14"></th>
        <th id="sa-14"></th>
        <th id="su-14"></th>
      </tr>
      <tr id="row-16">
        <th className="time-bracket">16:00</th>
        <th id="mo-16"></th>
        <th id="tu-16"></th>
        <th id="we-16"></th>
        <th id="th-16"></th>
        <th id="fr-16"></th>
        <th id="sa-16"></th>
        <th id="su-16"></th>
      </tr>
      <tr id="row-18">
        <th className="time-bracket">18:00</th>
        <th id="mo-18"></th>
        <th id="tu-18"></th>
        <th id="we-18"></th>
        <th id="th-18"></th>
        <th id="fr-18"></th>
        <th id="sa-18"></th>
        <th id="su-18"></th>
      </tr>
      <tr id="row-20">
        <th className="time-bracket">20:00</th>
        <th id="mo-20"></th>
        <th id="tu-20"></th>
        <th id="we-20"></th>
        <th id="th-20"></th>
        <th id="fr-20"></th>
        <th id="sa-20"></th>
        <th id="su-20"></th>
      </tr>
    </table>
  );
}