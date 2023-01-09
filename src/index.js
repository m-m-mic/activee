import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import LoginLayout from "./layouts/LoginLayout";
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

// Production backend: "https://api-activee.onrender.com" // Local backend: "http://localhost:3033"
export const backendUrl = "http://localhost:3033";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginLayout />}>
          <Route exact path="register" element={<Register />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate replace to="404" />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route exact path="your-activities" element={<YourActivities />} />
          <Route exact path="activity/:id" element={<Activity />} />
          <Route exact path="activity/:id/edit" element={<EditActivity />} />
          <Route exact path="activity/new" element={<CreateActivity />} />
          <Route exact path="sports" element={<Sports />} />
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);
