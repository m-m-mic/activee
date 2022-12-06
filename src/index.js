import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import NoHeaderLayout from "./layouts/NoHeaderLayout";
import SearchLayout from "./layouts/SearchLayout";
import "./assets/css/index.css";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Activity } from "./pages/Activity";
import CreateActivity from "./pages/CreateActivity";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoHeaderLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="activity/:id" element={<Activity />} />
          <Route path="activity/new" element={<CreateActivity />} />
        </Route>
        <Route path="/search" element={<SearchLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
