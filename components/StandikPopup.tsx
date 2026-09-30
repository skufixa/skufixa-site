"use client";

import { useEffect, useState } from "react";


export default function StandikPopup() {

  const [show, setShow] = useState(false);


  useEffect(() => {

    const alreadyShown =
      localStorage.getItem("standik-popup-shown");


    if (alreadyShown) return;


    const timer = setTimeout(() => {

      setShow(true);

      localStorage.setItem(
        "standik-popup-shown",
        "true"
      );

    }, 500);


    return () => clearTimeout(timer);

  }, []);



  if (!show) return null;



  return (

    <div
      className="
        fixed

        bottom-12

        left-1/2

        z-[9999]

        -translate-x-1/2


        w-fit

        max-w-[90vw]


        rounded-3xl


        border

        border-pink-200


        bg-white/70


        backdrop-blur-xl


        px-7

        py-4


        shadow-[0_10px_35px_rgba(244,114,182,0.25)]


        popup-show
      "
    >

      <p
        className="
          whitespace-nowrap

          text-center

          text-base

          sm:text-lg

          font-black

          text-pink-400
        "
      >
        ✨ попасть сюда можно за 10000 баллов канала skufixaa ♡ ✨
      </p>


    </div>

  );
}