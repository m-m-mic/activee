import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export function Search({ searchResults }) {
  const [cookies, setCookies] = useCookies(["userToken"]);
  if (cookies.userToken) {
    return (
      <>
        <h1>Suchergebnisse</h1>
        {searchResults.map((item, key) => (
          <div key={key}>{item.name}</div>
        ))}
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
