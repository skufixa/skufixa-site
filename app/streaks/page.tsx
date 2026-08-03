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

  return (
    <main className="relative min-h-screen px-4 py-10">
      <div className="relative z-10 mx-auto w-full max-w-2xl">
        <div className="text-center">
          <Link
            href="/"
            className="mb-6 inline-block text-sm text-pink-400 transition hover:scale-105"
          >
            ← На главную
          </Link>

          <h1 className="text-5xl font-black">
            Streaks <span className="text-pink-400">🔥</span>
          </h1>

          <p className="mt-2 text-zinc-500">
            Топ самых больших стриков
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

        {!loading && !message && streaks.length === 0 && (
          <p className="mt-10 text-center text-zinc-500">
            Стриков пока нет
          </p>
        )}

        <div className="mt-8 flex flex-col gap-4">
          {streaks.map((user, index) => (
            <div
              key={user.id}
              className="
                flex
                items-center
                justify-between
                rounded-[26px]
                border
                border-pink-200
                bg-white/90
                px-5
                py-4
                shadow-lg
                shadow-pink-100/70
                backdrop-blur-sm
              "
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-50 text-lg font-black shadow-md">
                  #{index + 1}
                </div>

                <span className="truncate text-lg font-black sm:text-xl">
                  {user.username}
                </span>
              </div>

              <span className="ml-4 shrink-0 font-black text-pink-400">
                {user.streak} дней
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}