import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import "./assets/css/index.css";
import { Login } from "./pages/Login";
import { Activity } from "./pages/Activity";
import CreateActivity from "./pages/CreateActivity";
import { Settings } from "./pages/Settings";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { EditProfile } from "./pages/EditProfile";
import { CookiesProvider } from "react-cookie";
import { NotFoundPage } from "./pages/NotFoundPage";
import { YourActivities } from "./pages/YourActivities";
import { Sports } from "./pages/Sports";
import { Profiles } from "./pages/Profiles";
import { EditActivity } from "./pages/EditActivity";
import { Search } from "./pages/Search";
import { Register } from "./pages/Register";
import { LandingPage } from "./pages/LandingPage";
import WelcomeLayout from "./layouts/WelcomeLayout";
import { Sport } from "./pages/Sport";
import { Participants } from "./pages/Participants";

// Production backend: "https://api-activee.onrender.com" // Local backend: "http://localhost:3033"
export const backendUrl = "https://api-activee.onrender.com";

// React-Router Struktur unseres Projekts, nicht existierende Pfade werden zu 404 weitergeleitet
export default function App() {
  return (
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
        </Route>
      </Routes>
    </HashRouter>
  );
}

// App muss in CookiesProvider sein, damit Cookies auf allen Unterseiten verwendbar sind
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);
