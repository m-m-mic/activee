import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";

export default function Layout() {
  const [userParam, setUserParam] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let userValue = queryParams.get("user");
    if (!userValue) {
      userValue = "none";
    }
    setUserParam(userValue);
  }, [location.search]);
  return (
    <>
      <Header userType={userParam} />
      <div id="content-body">
        <Outlet context={userParam} />
      </div>
      <Footer />
    </>
  );
}
export function useUser() {
  return useOutletContext();
}
