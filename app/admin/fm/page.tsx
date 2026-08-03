"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type FMItem = {
  id: number;
  image_url: string;
};

export default function AdminFMPage() {
  const [items, setItems] = useState<FMItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function loadItems() {
    try {
      const response = await fetch("/api/fm");
      const data = await response.json();

      if (!response.ok || !Array.isArray(data)) {
        setMessage(data.error || "Не удалось загрузить скрины");
        return;
      }

      setItems(data);
    } catch {
      setMessage("Не удалось загрузить скрины");
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;

    setFile(selectedFile);
    setMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");

    if (!file) {
      setMessage("Выбери скрин");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/fm/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok || uploadData.error) {
        setMessage(uploadData.error || "Не удалось загрузить скрин");
        return;
      }

      const saveResponse = await fetch("/api/fm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: uploadData.image_url,
        }),
      });

      const saveData = await saveResponse.json();

      if (!saveResponse.ok || saveData.error) {
        setMessage(saveData.error || "Не удалось сохранить скрин");
        return;
      }

      setFile(null);
      setMessage("Скрин добавлен ✅");

      const fileInput = document.getElementById(
        "fm-file"
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      await loadItems();
    } catch {
      setMessage("Ошибка загрузки скрина");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteItem(id: number) {
    setMessage("");

    try {
      const response = await fetch("/api/fm", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setMessage(data.error || "Не удалось удалить скрин");
        return;
      }

      setMessage("Скрин удалён");
      await loadItems();
    } catch {
      setMessage("Ошибка удаления скрина");
    }
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-5xl font-black">
          FM 📸
        </h1>

        <p className="mt-2 text-zinc-500">
          Управление скринами первых сообщений
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl border border-pink-200 bg-white p-6 shadow-md"
        >
          <h2 className="text-xl font-black text-pink-500">
            Загрузить скрин
          </h2>

          <label
            htmlFor="fm-file"
            className="mt-5 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-pink-300 bg-pink-50 px-6 text-center transition hover:border-pink-400 hover:bg-pink-100"
          >
            <span className="text-5xl">
              ☁️
            </span>

            <span className="mt-3 text-lg font-bold">
              Нажми и выбери файл
            </span>

            <span className="mt-1 text-sm text-zinc-500">
              PNG, JPG или WEBP до 10 МБ
            </span>

            {file && (
              <span className="mt-3 font-semibold text-pink-500">
                {file.name}
              </span>
            )}
          </label>

          <input
            id="fm-file"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="mt-5 rounded-2xl bg-pink-400 px-6 py-3 font-bold text-white transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Загрузка..." : "Загрузить"}
          </button>

          {message && (
            <p className="mt-4 font-semibold text-pink-500">
              {message}
            </p>
          )}
        </form>

        <div className="mt-10 border-t border-pink-100 pt-8">
          <h2 className="text-2xl font-black text-pink-500">
            Добавленные скрины
          </h2>

          {items.length === 0 ? (
            <p className="mt-6 text-zinc-500">
              Скрины пока не добавлены
            </p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-3xl border border-pink-200 bg-white p-3 shadow-md"
                >
                  <img
                    src={item.image_url}
                    alt="FM скрин"
                    className="aspect-video w-full rounded-2xl object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => deleteItem(item.id)}
                    className="mt-3 w-full rounded-2xl border border-pink-200 bg-pink-50 px-4 py-3 font-bold text-pink-500 transition hover:bg-pink-100"
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}