import React, { useState } from "react";
import { useTheme } from "../custom-hooks/useTheme";

export default function Header() {
  const [darkMode, setdarkMode] = useTheme();
  return (
    <>
      <header className={`header-container ${darkMode ? "dark" : ""}`}>
        <div className="header-content">
          <h2 className="title">
            <a href="/">Where in the world...?</a>
          </h2>
          <p
            className="theme-changer"
            onClick={() => {
              setdarkMode(!darkMode);
              localStorage.setItem("isDarkMode", !darkMode);
            }}
          >
            <i className={`fa-regular fa-${darkMode ? "sun" : "moon"}`}></i>
            &nbsp;&nbsp;{darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
          </p>
        </div>
      </header>
    </>
  );
}
