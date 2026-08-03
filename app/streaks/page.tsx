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

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <main className="min-h-screen px-4 py-10">

      <div className="mx-auto w-full max-w-2xl">

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


          <h1
            className="
              text-5xl
              font-black
            "
          >
            Streaks
            <span className="text-pink-400">
              {" "}🔥
            </span>
          </h1>


          <p
            className="
              mt-2
              text-zinc-500
              dark:text-zinc-400
            "
          >
            серии просмотров
          </p>

        </div>



        {loading && (
          <p className="mt-10 text-center text-zinc-500">
            Загружаем...
          </p>
        )}


        {message && (
          <p className="mt-10 text-center text-pink-500">
            {message}
          </p>
        )}



        {!loading && !message && (
          <div className="mt-8 flex flex-col gap-4">

            {streaks.map((user, index) => (

              <div
                key={user.id}
                className={`
                  flex
                  items-center
                  justify-between
                  rounded-[28px]
                  border
                  px-5
                  py-4
                  shadow-md
                  transition
                  hover:-translate-y-1

                  ${
                    index === 0
                    ? `
                      border-pink-300
                      bg-pink-50
                      shadow-pink-200/70
                      dark:bg-pink-950/20
                    `
                    :
                    `
                      border-pink-200
                      bg-white/90
                      dark:border-zinc-700
                      dark:bg-zinc-900/90
                    `
                  }
                `}
              >


                <div className="flex items-center gap-4">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-pink-100
                      text-xl
                      shadow-sm
                      dark:bg-pink-900/30
                    "
                  >
                    {medals[index] ?? `#${index + 1}`}
                  </div>


                  <span
                    className="
                      text-lg
                      font-black
                      dark:text-white
                    "
                  >
                    {user.username}
                  </span>

                </div>



                <span
                  className="
                    font-black
                    text-pink-400
                  "
                >
                  {user.streak} дней
                </span>


              </div>

            ))}

          </div>
        )}

      </div>

    </main>
  );
}