"use client";

import { useEffect, useState } from "react";

export default function Welcome() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("welcome")) {
      return;
    }

    sessionStorage.setItem("welcome", "true");
    setVisible(true);

    const leaveTimer = setTimeout(() => {
      setLeaving(true);
    }, 2800);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 3800);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`
        pointer-events-none
        fixed
        inset-x-0
        top-10
        z-50
        flex
        justify-center
        transition-all
        duration-1000
        ease-out
        ${
          leaving
            ? "-translate-y-8 opacity-0"
            : "translate-y-0 opacity-100"
        }
      `}
    >
      <div className="rounded-full border border-pink-200 bg-white/90 px-8 py-5 text-center shadow-xl backdrop-blur-sm">
        <h2 className="text-2xl font-black text-pink-500">
          ♡ привет! охаё! даттебае! ♡
        </h2>

        <p className="mt-2 text-zinc-600">
          рада тебя видеть, kawaii ^^
        </p>
      </div>
    </div>
  );
}