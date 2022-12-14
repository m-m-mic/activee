import React, { useState } from "react";
import Select from "react-select";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export default function CreateActivity() {
  const [cookies, setCookies] = useCookies(["userToken", "userType"]);
  const [sportOption, setSportOption] = useState([]);
  const [genderOption, setGenderOption] = useState([]);
  const [languageOption, setLanguageOption] = useState([]);
  const sportsOptions = [
    { value: "basketball", label: "Basketball" },
    { value: "soccer", label: "Fußball" },
    { value: "hockey", label: "Hockey" },
  ];
  const genderOptions = [
    { value: "male", label: "Männlich" },
    { value: "female", label: "Weiblich" },
    { value: "mix", label: "Mix" },
  ];
  const languageOptions = [
    { value: "english", label: "Englisch" },
    { value: "french", label: "Französisch" },
    { value: "german", label: "Deutsch" },
    { value: "japanese", label: "Japanisch" },
  ];
  if (cookies.userToken) {
    if (cookies.userType === "organisation") {
      return (
        <>
          <input placeholder="Name der Aktivität" />
          <div>Name des Vereins</div>
          <Select options={sportsOptions} value={sportOption} onChange={(option) => setSportOption(option)} />
          <Select options={genderOptions} value={genderOption} onChange={(option) => setGenderOption(option)} />
          <Select
            isMulti
            options={languageOptions}
            value={languageOption}
            onChange={(option) => setLanguageOption(option)}
            isOptionDisabled={() => languageOption.length >= 3}
          />
        </>
      );
    } else {
      return <Navigate to="/404" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}
