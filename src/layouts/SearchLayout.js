import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { SearchHeader } from "../components/SearchHeader";

const SearchLayout = () => {
  return (
    <>
      <SearchHeader />
      <div id="content-body">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default SearchLayout;
