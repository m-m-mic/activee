import { Footer } from "../components/Footer";
import { SearchHeader } from "../components/SearchHeader";
import { Search } from "../pages/Search";
import { useState } from "react";
import { isVariableOnlySpaces } from "../scripts/isVariableOnlySpaces";

export default function SearchLayout() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const getSearchResults = () => {
    if (searchQuery === "" || isVariableOnlySpaces(searchQuery)) {
      console.log("Invalid search query!");
    } else {
      fetch("http://localhost:1337/search/" + searchQuery)
        .then((response) => response.json())
        .then((data) => setSearchResults(data));
    }
  };
  return (
    <>
      <SearchHeader
        searchInput={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        onButtonPress={getSearchResults}
      />
      <div id="content-body">
        <Search searchResults={searchResults} />
      </div>
      <Footer />
    </>
  );
}
