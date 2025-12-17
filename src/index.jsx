import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import "./assets/css/index.css";
import { Login } from "./pages/Login.jsx";
import { Activity } from "./pages/Activity.jsx";
import CreateActivity from "./pages/CreateActivity.jsx";
import { Settings } from "./pages/Settings.jsx";
import { Home } from "./pages/Home.jsx";
import { Profile } from "./pages/Profile.jsx";
import { EditProfile } from "./pages/EditProfile.jsx";
import { CookiesProvider } from "react-cookie";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { YourActivities } from "./pages/YourActivities.jsx";
import { Sports } from "./pages/Sports.jsx";
import { Profiles } from "./pages/Profiles.jsx";
import { EditActivity } from "./pages/EditActivity.jsx";
import { Search } from "./pages/Search.jsx";
import { Register } from "./pages/Register.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";
import WelcomeLayout from "./layouts/WelcomeLayout.jsx";
import { Sport } from "./pages/Sport.jsx";
import { Participants } from "./pages/Participants.jsx";
import { AboutUs } from "./pages/AboutUs.jsx";
import { Impressum } from "./pages/Impressum.jsx";

// Production backend: "https://api-activee.onrender.com" // Local backend: "http://localhost:3033"
export const backendUrl = "https://api.activee.micbu.com";

// React-Router Struktur unseres Projekts, nicht existierende Pfade werden zu 404 weitergeleitet
export default function App() {
  return (
    <div className="content-container">
      <HashRouter>
        <Routes>
          <Route path="/" element={<WelcomeLayout />}>
            <Route exact path="welcome" element={<LandingPage />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route exact path="register" element={<Register />} />
            <Route exact path="login" element={<Login />} />
            <Route exact path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate replace to="404" />} />
            <Route exact path="your-activities" element={<YourActivities />} />
            <Route exact path="activity/:id" element={<Activity />} />
            <Route exact path="activity/:id/edit" element={<EditActivity />} />
            <Route exact path="activity/:id/participants" element={<Participants />} />
            <Route exact path="activity/new" element={<CreateActivity />} />
            <Route exact path="sports" element={<Sports />} />
            <Route exact path="sport/:id" element={<Sport />} />
            <Route exact path="profile" element={<Profile />} />
            <Route exact path="profile/edit" element={<EditProfile />} />
            <Route exact path="settings" element={<Settings />} />
            <Route exact path="settings/profiles" element={<Profiles />} />
            <Route exact path="search" element={<Search />} />
            <Route exact path="about-us" element={<AboutUs />} />
            <Route exact path="impressum" element={<Impressum />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

// App muss in CookiesProvider sein, damit Cookies auf allen Unterseiten verwendbar sind
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
);
