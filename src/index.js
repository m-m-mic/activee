import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import LoginLayout from "./layouts/LoginLayout";
import SearchLayout from "./layouts/SearchLayout";
import "./assets/css/index.css";
import { Login } from "./pages/Login";
import { Activity } from "./pages/Activity";
import CreateActivity from "./pages/CreateActivity";
import { Settings } from "./pages/Settings";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { EditProfile } from "./pages/EditProfile";
import { CookiesProvider } from "react-cookie";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="activity/:id" element={<Activity />} />
          <Route path="activity/new" element={<CreateActivity />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/search" element={<SearchLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);
