import { Footer } from "../components/Footer";
import { SearchHeader } from "../components/SearchHeader";
import { Search } from "../pages/Search";
import { useEffect, useState } from "react";
import { isVariableOnlySpaces } from "../scripts/isVariableOnlySpaces";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlQuery = queryParams.get("query");
    if (urlQuery) {
      getSearchResults(urlQuery);
    } else {
      setSearchResults(null);
    }
  }, [location.search]);
  useEffect(() => {
    document.addEventListener("keydown", confirmSearch);
    return () => {
      document.removeEventListener("keydown", confirmSearch);
    };
  }, [searchQuery]);
  const confirmSearch = (e) => {
    if (e.key === "Enter") navigate(`/search?query=${searchQuery}`);
  };
  const getSearchResults = (enteredQuery) => {
    if (enteredQuery === "" || isVariableOnlySpaces(enteredQuery)) {
      setSearchResults(null);
    } else {
      fetch("http://localhost:3033/search/" + enteredQuery)
        .then((response) => response.json())
        .then((data) => setSearchResults(data));
    }
  };
  return (
    <>
      <SearchHeader inputValue={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
      <div id="content-body">
        <Search searchResults={searchResults} />
      </div>
      <Footer />
    </>
  );
}
