"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const adminSections = [
  {
    title: "Links",
    description: "Изменение названий, подписей и адресов ссылок",
    icon: "🔗",
    href: "/admin/links",
  },
  {
    title: "FM",
    description: "Загрузка и удаление скриншотов",
    icon: "📸",
    href: "/admin/fm",
  },
  {
    title: "Clips",
    description: "Добавление и удаление любимых клипов",
    icon: "🎬",
    href: "/admin/clips",
  },
  {
    title: "Streaks",
    description: "Управление стриками пользователей",
    icon: "🔥",
    href: "/admin/streaks",
  },
];

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("admin-auth");

    if (savedAuth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");

    if (!password.trim()) {
      setMessage("Заполни поле");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setMessage(data.error || "Неверные данные");
        return;
      }

      sessionStorage.setItem("admin-auth", "true");

      setPassword("");
      setIsLoggedIn(true);
      setMessage("");
    } catch {
      setMessage("Не удалось выполнить вход");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin-logout", {
        method: "POST",
      });
    } finally {
      sessionStorage.removeItem("admin-auth");

      setPassword("");
      setIsLoggedIn(false);
      setMessage("");
    }
  }

  if (!isLoggedIn) {
    return (
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-3xl border border-pink-200 bg-white/90 p-6 shadow-xl backdrop-blur-sm"
        >
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Введите данные"
            autoComplete="current-password"
            className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full rounded-2xl bg-pink-400 px-4 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Проверка..." : "Войти"}
          </button>

          {message && (
            <p className="mt-4 text-center text-sm font-semibold text-pink-500">
              {message}
            </p>
          )}
        </form>
      </main>
    );
  }

  return (
    <main className="relative z-10 min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-black sm:text-5xl">
              Панель управления
            </h1>

            <p className="mt-2 text-zinc-500">
              Управление содержимым сайта
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-fit rounded-2xl border border-pink-200 bg-white/90 px-5 py-3 font-semibold shadow-md transition hover:-translate-y-1 hover:bg-pink-50"
          >
            Выйти
          </button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {adminSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group flex min-h-40 items-center justify-between rounded-[30px] border border-pink-200 bg-white/90 p-6 shadow-lg shadow-pink-100/70 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-xl"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-pink-50 text-3xl shadow-md transition group-hover:scale-110">
                  {section.icon}
                </div>

                <div>
                  <h2 className="text-2xl font-black">
                    {section.title}
                  </h2>

                  <p className="mt-2 max-w-xs text-sm text-zinc-500">
                    {section.description}
                  </p>
                </div>
              </div>

              <span className="ml-3 text-3xl text-zinc-400 transition group-hover:translate-x-2 group-hover:text-pink-400">
                ›
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="mt-8 inline-block text-sm font-semibold text-pink-400 transition hover:translate-x-1"
        >
          ← Вернуться на сайт
        </Link>
      </div>
    </main>
  );
}