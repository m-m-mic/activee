import { Footer } from "../components/Footer";
import { SearchHeader } from "../components/SearchHeader";
import { Search } from "../pages/Search";
import { useEffect, useState } from "react";
import { isVariableOnlySpaces } from "../scripts/isVariableOnlySpaces";
import { useLocation, useNavigate } from "react-router-dom";
import { backendUrl } from "../index";
import { useCookies } from "react-cookie";

export default function SearchLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["userToken"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [urlQuery, setUrlQuery] = useState();
  const [searchResults, setSearchResults] = useState();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlQuery = queryParams.get("query");
    setUrlQuery(urlQuery);
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
      const url = backendUrl + "/search/" + enteredQuery;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setSearchResults(data));
    }
  };
  return (
    <>
      <SearchHeader inputValue={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
      <div id="content-body">
        <Search searchResults={searchResults} query={urlQuery} />
      </div>
      <Footer />
    </>
  );
}
