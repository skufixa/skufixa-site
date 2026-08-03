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

type NewLink = {
  title: string;
  subtitle: string;
  icon: string;
  url: string;
  position: number;
};

const emptyNewLink: NewLink = {
  title: "",
  subtitle: "",
  icon: "🔗",
  url: "",
  position: 1,
};

export default function AdminLinksPage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [newLink, setNewLink] = useState<NewLink>(emptyNewLink);

  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");

  async function loadLinks() {
    try {
      const response = await fetch("/api/links");
      const data = await response.json();

      if (!response.ok || !Array.isArray(data)) {
        setMessage(data.error || "Не удалось загрузить ссылки");
        return;
      }

      setLinks(data);

      setNewLink((current) => ({
        ...current,
        position:
          data.length > 0
            ? Math.max(...data.map((item: LinkItem) => item.position)) + 1
            : 1,
      }));
    } catch {
      setMessage("Не удалось загрузить ссылки");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLinks();
  }, []);

  function updateLink(
    id: number,
    field: keyof LinkItem,
    value: string | number
  ) {
    setLinks((currentLinks) =>
      currentLinks.map((link) =>
        link.id === id
          ? {
              ...link,
              [field]: value,
            }
          : link
      )
    );
  }

  function updateNewLink(
    field: keyof NewLink,
    value: string | number
  ) {
    setNewLink((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveLink(link: LinkItem) {
    setSavingId(link.id);
    setMessage("");

    try {
      const response = await fetch("/api/links", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(link),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setMessage(data.error || "Не удалось сохранить ссылку");
        return;
      }

      setLinks((currentLinks) =>
        currentLinks
          .map((item) => (item.id === data.id ? data : item))
          .sort((a, b) => a.position - b.position)
      );

      setMessage(`Ссылка «${data.title}» сохранена ✅`);
    } catch {
      setMessage("Не удалось сохранить ссылку");
    } finally {
      setSavingId(null);
    }
  }

  async function addLink() {
    setMessage("");

    if (!newLink.title.trim() || !newLink.url.trim()) {
      setMessage("Заполни название и ссылку");
      return;
    }

    setIsAdding(true);

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLink),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setMessage(data.error || "Не удалось добавить ссылку");
        return;
      }

      setLinks((currentLinks) =>
        [...currentLinks, data].sort(
          (a, b) => a.position - b.position
        )
      );

      setNewLink({
        ...emptyNewLink,
        position: data.position + 1,
      });

      setShowAddForm(false);
      setMessage(`Ссылка «${data.title}» добавлена ✅`);
    } catch {
      setMessage("Не удалось добавить ссылку");
    } finally {
      setIsAdding(false);
    }
  }

  async function deleteLink(link: LinkItem) {
    const confirmed = window.confirm(
      `Удалить ссылку «${link.title}»?`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(link.id);
    setMessage("");

    try {
      const response = await fetch("/api/links", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: link.id,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setMessage(data.error || "Не удалось удалить ссылку");
        return;
      }

      setLinks((currentLinks) =>
        currentLinks.filter((item) => item.id !== link.id)
      );

      setMessage(`Ссылка «${link.title}» удалена`);
    } catch {
      setMessage("Не удалось удалить ссылку");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="relative z-10 min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-black">
              Управление ссылками
            </h1>

            <p className="mt-2 text-zinc-500">
              Меняй ссылки и добавляй новые кнопки
            </p>
          </div>

          <Link
            href="/admin"
            className="w-fit rounded-2xl border border-pink-200 bg-white/90 px-4 py-2 font-semibold shadow-md transition hover:-translate-y-1"
          >
            ← В админку
          </Link>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowAddForm((current) => !current);
            setMessage("");
          }}
          className="mb-6 w-full rounded-2xl bg-pink-400 px-5 py-4 text-lg font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-pink-500"
        >
          {showAddForm
            ? "Закрыть добавление"
            : "+ Добавить ссылку"}
        </button>

        {showAddForm && (
          <div className="mb-8 rounded-[30px] border border-pink-300 bg-white/90 p-6 shadow-xl shadow-pink-100/70 backdrop-blur-sm">
            <h2 className="mb-5 text-2xl font-black text-pink-500">
              Новая ссылка
            </h2>

            <div className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-zinc-500">
                  Название
                </span>

                <input
                  value={newLink.title}
                  onChange={(event) =>
                    updateNewLink("title", event.target.value)
                  }
                  placeholder="Например: YouTube"
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-zinc-500">
                  Подпись
                </span>

                <input
                  value={newLink.subtitle}
                  onChange={(event) =>
                    updateNewLink("subtitle", event.target.value)
                  }
                  placeholder="Например: мои видео"
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-zinc-500">
                    Иконка
                  </span>

                  <input
                    value={newLink.icon}
                    onChange={(event) =>
                      updateNewLink("icon", event.target.value)
                    }
                    className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 text-center text-xl outline-none transition focus:border-pink-400"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-zinc-500">
                    Порядок
                  </span>

                  <input
                    type="number"
                    value={newLink.position}
                    onChange={(event) =>
                      updateNewLink(
                        "position",
                        Number(event.target.value)
                      )
                    }
                    className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-zinc-500">
                  Ссылка
                </span>

                <input
                  value={newLink.url}
                  onChange={(event) =>
                    updateNewLink("url", event.target.value)
                  }
                  placeholder="https://..."
                  className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400"
                />
              </label>

              <button
                type="button"
                onClick={addLink}
                disabled={isAdding}
                className="mt-2 rounded-2xl bg-pink-400 px-5 py-3 font-bold text-white shadow-md transition hover:-translate-y-1 hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isAdding
                  ? "Добавляем..."
                  : "Добавить новую ссылку"}
              </button>
            </div>
          </div>
        )}

        {message && (
          <p className="mb-6 rounded-2xl border border-pink-200 bg-white/90 px-4 py-3 text-center font-semibold text-pink-500 shadow-sm">
            {message}
          </p>
        )}

        {loading && (
          <p className="text-center text-zinc-500">
            Загружаем ссылки...
          </p>
        )}

        {!loading && links.length === 0 && (
          <p className="text-center text-zinc-500">
            Ссылки не найдены
          </p>
        )}

        <div className="space-y-6">
          {links.map((link) => (
            <div
              key={link.id}
              className="rounded-[30px] border border-pink-200 bg-white/90 p-6 shadow-lg shadow-pink-100/70 backdrop-blur-sm"
            >
              <div className="grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-zinc-500">
                    Название
                  </span>

                  <input
                    value={link.title}
                    onChange={(event) =>
                      updateLink(
                        link.id,
                        "title",
                        event.target.value
                      )
                    }
                    className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-zinc-500">
                    Подпись
                  </span>

                  <input
                    value={link.subtitle}
                    onChange={(event) =>
                      updateLink(
                        link.id,
                        "subtitle",
                        event.target.value
                      )
                    }
                    className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-zinc-500">
                      Иконка
                    </span>

                    <input
                      value={link.icon}
                      onChange={(event) =>
                        updateLink(
                          link.id,
                          "icon",
                          event.target.value
                        )
                      }
                      className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 text-center text-xl outline-none transition focus:border-pink-400"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-zinc-500">
                      Порядок
                    </span>

                    <input
                      type="number"
                      value={link.position}
                      onChange={(event) =>
                        updateLink(
                          link.id,
                          "position",
                          Number(event.target.value)
                        )
                      }
                      className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-zinc-500">
                    Ссылка
                  </span>

                  <input
                    value={link.url}
                    onChange={(event) =>
                      updateLink(
                        link.id,
                        "url",
                        event.target.value
                      )
                    }
                    className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400"
                  />
                </label>

                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => saveLink(link)}
                    disabled={
                      savingId === link.id ||
                      deletingId === link.id
                    }
                    className="rounded-2xl bg-pink-400 px-5 py-3 font-bold text-white shadow-md transition hover:-translate-y-1 hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {savingId === link.id
                      ? "Сохраняем..."
                      : "Сохранить"}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteLink(link)}
                    disabled={
                      deletingId === link.id ||
                      savingId === link.id
                    }
                    className="rounded-2xl border border-red-300 bg-red-50 px-5 py-3 font-bold text-red-500 transition hover:-translate-y-1 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === link.id
                      ? "Удаляем..."
                      : "Удалить"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}