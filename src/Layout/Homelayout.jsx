import React, { useEffect, useState } from "react";
import { Footer, Header } from "../components";

const Homelayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Persist theme in localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    if (!darkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-700">
      <div className="w-full flex flex-col  min-h-screen">
        <Header toggleTheme={toggleTheme} darkMode={darkMode} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Homelayout;
