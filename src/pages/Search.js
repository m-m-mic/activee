import React from "react";

export function Search({ searchResults }) {
  return (
    <>
      <h1>Suchergebnisse</h1>
      {searchResults.map((item, key) => (
        <div key={key}>{item.name}</div>
      ))}
    </>
  );
}
