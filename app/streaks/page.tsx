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
        from-[#fff1b8]
        to-[#fff9e5]
        border-[#ffd36b]
        shadow-yellow-200
      `;
    }

    if (index === 1) {
      return `
        bg-gradient-to-r
        from-[#ffd8bd]
        to-[#fff1e7]
        border-[#efb184]
        shadow-orange-200
      `;
    }

    if (index === 2) {
      return `
        bg-gradient-to-r
        from-[#ededed]
        to-[#ffffff]
        border-[#cccccc]
        shadow-zinc-200
      `;
    }

    return `
      bg-white/90
      border-pink-200
      shadow-pink-100/70
    `;
  }


  function medal(index: number) {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";

    return `${index + 1}`;
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


          <h1 className="text-5xl font-black text-zinc-900">
            Streaks
            <span className="text-pink-400">
              {" "}🔥
            </span>
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
          <p className="mt-10 text-center font-semibold text-pink-500">
            {message}
          </p>
        )}



        <div className="mt-8 flex flex-col gap-4">

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

                rounded-[28px]
                border

                px-5
                py-5

                shadow-lg

                transition-all
                duration-300

                hover:-translate-y-1
                hover:scale-[1.02]

                ${getPlaceStyle(index)}
              `}
            >


              {index < 3 && (
                <>
                  <span
                    className="
                      absolute
                      right-16
                      top-3
                      text-xl
                      text-pink-400
                      opacity-0
                      transition
                      duration-300
                      group-hover:opacity-100
                    "
                  >
                    ✦
                  </span>

                  <span
                    className="
                      absolute
                      right-8
                      bottom-3
                      text-sm
                      text-pink-300
                      opacity-0
                      transition
                      duration-300
                      group-hover:opacity-100
                    "
                  >
                    ✧
                  </span>
                </>
              )}



              <div className="flex items-center gap-5">


                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center

                    rounded-full

                    bg-white/80

                    text-3xl

                    shadow-md
                  "
                >
                  {medal(index)}
                </div>



                <span
                  className="
                    text-xl
                    font-black
                    text-zinc-900
                  "
                >
                  {user.username}
                </span>


              </div>



              <span
                className="
                  font-black
                  text-pink-500
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