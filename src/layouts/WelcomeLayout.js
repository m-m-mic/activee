import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

/**
 * Besonderes Layout für die LandingPage
 * @returns {JSX.Element}
 * @constructor
 */
export default function WelcomeLayout() {
  return (
    <>
      <Header welcome />
      <div id="content-body">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
