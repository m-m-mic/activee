import React, { useState } from "react";
import Select from "react-select";

export default function CreateActivity() {
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
}
