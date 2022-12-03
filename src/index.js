import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import NoHeaderLayout from "./layouts/NoHeaderLayout";
import SearchLayout from "./layouts/SearchLayout";
import "./assets/css/index.css";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoHeaderLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/" element={<SearchLayout />}>
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
