"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LinkItem = {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  url: string;
  position: number;
};

export default function LinksPage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadLinks() {
      try {
        const response = await fetch("/api/links");
        const data = await response.json();

        if (!response.ok || !Array.isArray(data)) {
          setMessage(data.error || "Не удалось загрузить ссылки");
          return;
        }

        setLinks(data);
      } catch {
        setMessage("Не удалось загрузить ссылки");
      } finally {
        setLoading(false);
      }
    }

    loadLinks();
  }, []);

  return (
    <main className="relative min-h-screen px-4 py-10">
      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center">
        <Link
          href="/"
          className="mb-6 text-sm text-pink-400 transition hover:scale-105"
        >
          ← На главную
        </Link>

        <h1 className="text-center text-5xl font-black">
          Links <span className="text-pink-400">♡</span>
        </h1>

        <p className="mb-8 mt-2 text-center text-zinc-500">
          все мои ссылки
        </p>

        {loading && (
          <p className="mt-8 text-center text-zinc-500">
            Загружаем ссылки...
          </p>
        )}

        {message && (
          <p className="mt-8 text-center font-semibold text-pink-500">
            {message}
          </p>
        )}

        {!loading && !message && links.length === 0 && (
          <p className="mt-8 text-center text-zinc-500">
            Ссылки пока не добавлены
          </p>
        )}

        <div className="flex w-full flex-col gap-4">
          {links.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="
                group
                flex
                items-center
                justify-between
                rounded-[26px]
                border
                border-pink-200
                bg-white/90
                px-5
                py-3.5
                shadow-lg
                shadow-pink-100/70
                backdrop-blur-sm
                transition
                duration-300
                hover:-translate-y-1
                hover:scale-[1.02]
              "
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-50 text-2xl shadow-md">
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-xl font-black sm:text-2xl">
                    {item.title}
                  </h2>

                  <p className="mt-1 truncate text-sm text-zinc-500">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <span className="ml-3 shrink-0 text-3xl text-zinc-400 transition duration-300 group-hover:translate-x-2 group-hover:text-pink-400">
                ›
              </span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}