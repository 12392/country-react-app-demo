import React, { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <>
      <ThemeProvider>
        {/* Header and Outlet will become the props for Themeprovider */}
        <Header />
        <Outlet />
      </ThemeProvider>
    </>
  );
}
