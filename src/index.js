import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginLayout />}>
          <Route exact path="login" element={<Login />} />
          <Route exact path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate replace to="404" />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route exact path="activity/:id" element={<Activity />} />
          <Route exact path="activity/new" element={<CreateActivity />} />
          <Route exact path="profile" element={<Profile />} />
          <Route exact path="profile/edit" element={<EditProfile />} />
          <Route exact path="settings" element={<Settings />} />
        </Route>
        <Route exact path="search" element={<SearchLayout />} />
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
