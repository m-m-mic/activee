import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer.jsx";
import { Header } from "../components/Header.jsx";

/**
 * Standard Layout für activee-Seiten
 * @returns {JSX.Element}
 * @constructor
 */
export default function Layout() {
  return (
    <>
      <Header />
      <div id="content-body">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
