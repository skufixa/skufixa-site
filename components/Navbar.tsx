"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  function toggleTheme() {
    const html = document.documentElement;

    if (dark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  }

  return (
    <header className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
      <button
        onClick={toggleTheme}
        className="
          relative
          flex
          h-11
          w-24
          items-center
          rounded-full
          border
          border-pink-200 dark:border-zinc-700
          bg-white/90 dark:bg-zinc-900/90
          px-1
          shadow-lg
          backdrop-blur
          transition-all
          duration-300
          hover:scale-105
        "
      >
        <span className="absolute left-3 text-lg">
          ☀️
        </span>

        <span className="absolute right-3 text-lg">
          🌙
        </span>

        <span
          className={`
            absolute
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-pink-400
            text-white
            shadow-md
            transition-all
            duration-300
            ${
              dark
                ? "translate-x-[48px]"
                : "translate-x-0"
            }
          `}
        >
          {dark ? "🌙" : "☀️"}
        </span>
      </button>
    </header>
  );
}