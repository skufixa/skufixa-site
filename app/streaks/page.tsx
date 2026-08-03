"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type StreakItem = {
  id: number;
  username: string;
  streak: number;
  position: number;
};

export default function StreaksPage() {
  const [streaks, setStreaks] = useState<StreakItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadStreaks() {
      try {
        const response = await fetch("/api/streaks");
        const data = await response.json();

        if (!response.ok || !Array.isArray(data)) {
          setMessage(data.error || "Не удалось загрузить стрики");
          return;
        }

        setStreaks(data);
      } catch {
        setMessage("Не удалось загрузить стрики");
      } finally {
        setLoading(false);
      }
    }

    loadStreaks();
  }, []);


  function getPlaceStyle(index: number) {
    if (index === 0) {
      return `
        bg-gradient-to-r
        from-[#fff0b5]
        to-[#fff9df]
        border-[#ffd45c]
        shadow-[0_0_25px_rgba(255,215,100,0.45)]
        hover:shadow-[0_0_40px_rgba(255,215,100,0.8)]
      `;
    }

    if (index === 1) {
      return `
        bg-gradient-to-r
        from-[#ffd9c2]
        to-[#fff1e8]
        border-[#f4b48b]
        shadow-[0_0_25px_rgba(255,190,140,0.35)]
        hover:shadow-[0_0_40px_rgba(255,190,140,0.7)]
      `;
    }

    if (index === 2) {
      return `
        bg-gradient-to-r
        from-[#ededed]
        to-[#ffffff]
        border-[#d5d5d5]
        shadow-[0_0_25px_rgba(220,220,220,0.5)]
        hover:shadow-[0_0_40px_rgba(220,220,220,0.8)]
      `;
    }

    return `
      bg-gradient-to-r
      from-[#fff5fb]
      to-[#ffffff]
      border-pink-200
      shadow-pink-100
      hover:shadow-pink-300/50
    `;
  }


  function medal(index: number) {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";

    return index + 1;
  }


  return (
    <main className="relative min-h-screen px-4 py-10">

      <div className="relative z-10 mx-auto w-full max-w-2xl">

        <div className="text-center">

          <Link
            href="/"
            className="
              mb-6
              inline-block
              text-sm
              text-pink-400
              transition
              hover:scale-105
            "
          >
            ← На главную
          </Link>


          <h1 className="text-5xl font-black">
            Streaks
            <span className="text-pink-400"> 🔥</span>
          </h1>


          <p className="mt-2 text-zinc-500">
            серии просмотров
          </p>

        </div>



        {loading && (
          <p className="mt-10 text-center text-zinc-500">
            Загружаем стрики...
          </p>
        )}



        {message && (
          <p className="mt-10 text-center font-bold text-pink-500">
            {message}
          </p>
        )}





        <div className="mt-8 flex flex-col gap-5">


          {streaks.map((user, index) => (

            <div
              key={user.id}
              className={`
                group
                relative
                overflow-hidden

                flex
                items-center
                justify-between

                rounded-[30px]

                border

                px-5
                py-5

                transition-all
                duration-500

                hover:-translate-y-2

                ${getPlaceStyle(index)}
              `}
            >


              {/* маленький декор внутри карточки */}

              <span
                className="
                  pointer-events-none
                  absolute
                  right-5
                  top-3

                  text-3xl
                  text-pink-300

                  opacity-60

                  decoration-star

                  transition

                  group-hover:opacity-100
                "
              >
                ✦
              </span>


              <span
                className="
                  pointer-events-none
                  absolute
                  right-12
                  bottom-3

                  text-2xl
                  text-pink-200

                  opacity-70

                  float-heart-small

                  transition

                  group-hover:opacity-100
                "
              >
                ♡
              </span>




              <div className="flex items-center gap-5">


                <div
                  className="
                    flex
                    h-14
                    w-14

                    items-center
                    justify-center

                    rounded-full

                    !bg-white

                    border
                    border-pink-200

                    text-xl
                    font-black

                    !text-zinc-900

                    shadow-md

                    transition

                    group-hover:scale-110
                  "
                >
                  {medal(index)}
                </div>



                <span
                  className="
                    text-xl
                    font-black
                    !text-zinc-900
                  "
                >
                  {user.username}
                </span>


              </div>





              <span
                className="
                  font-black
                  !text-zinc-900
                "
              >
                {user.streak} дней
              </span>



            </div>

          ))}


        </div>


      </div>

    </main>
  );
}