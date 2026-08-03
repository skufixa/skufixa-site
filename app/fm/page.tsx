"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type FMItem = {
  id: number;
  image_url: string;
};

export default function FMPage() {
  const [items, setItems] = useState<FMItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, []);

  const closeGallery = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    if (selectedIndex === null || items.length < 2) return;

    setSelectedIndex(
      selectedIndex === 0 ? items.length - 1 : selectedIndex - 1
    );
  }, [selectedIndex, items.length]);

  const showNext = useCallback(() => {
    if (selectedIndex === null || items.length < 2) return;

    setSelectedIndex(
      selectedIndex === items.length - 1 ? 0 : selectedIndex + 1
    );
  }, [selectedIndex, items.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeGallery();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, closeGallery, showPrevious, showNext]);

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.targetTouches[0].clientX;
    touchEndX.current = null;
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    touchEndX.current = event.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    if (touchStartX.current === null || touchEndX.current === null) {
      return;
    }

    const distance = touchStartX.current - touchEndX.current;
    const minimumSwipeDistance = 50;

    if (distance > minimumSwipeDistance) {
      showNext();
    }

    if (distance < -minimumSwipeDistance) {
      showPrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }

  const selectedItem =
    selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <main className="relative min-h-screen px-4 py-10">
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="text-center">
          <Link
            href="/"
            className="mb-6 inline-block text-sm text-pink-400 transition hover:scale-105"
          >
            ← На главную
          </Link>

          <h1 className="text-5xl font-black">
            FM <span className="text-pink-400">📸</span>
          </h1>

          <p className="mt-2 text-zinc-500">
            Забавные первые сообщения
          </p>
        </div>

        {loading && (
          <p className="mt-10 text-center text-zinc-500">
            Загружаем скрины...
          </p>
        )}

        {message && (
          <p className="mt-10 text-center font-semibold text-pink-500">
            {message}
          </p>
        )}

        {!loading && !message && items.length === 0 && (
          <p className="mt-10 text-center text-zinc-500">
            Скрины пока не добавлены
          </p>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="
                group
                overflow-hidden
                rounded-[28px]
                border
                border-pink-200
                bg-white/90
                p-3
                shadow-lg
                shadow-pink-100/70
                backdrop-blur-sm
                transition
                duration-300
                hover:-translate-y-2
                hover:scale-[1.02]
                hover:shadow-xl
              "
              style={{
                animation: "reveal-up 0.65s ease-out forwards",
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              <div className="flex min-h-52 items-center justify-center overflow-hidden rounded-[22px] bg-pink-50">
                <img
                  src={item.image_url}
                  alt={`FM скрин ${index + 1}`}
                  className="max-h-72 w-full rounded-[22px] object-contain transition duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6"
          onClick={closeGallery}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-sm font-bold text-white sm:text-base">
            {selectedIndex + 1} / {items.length}
          </div>

          <button
            type="button"
            onClick={closeGallery}
            aria-label="Закрыть"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-pink-400 text-xl font-black text-white shadow-lg transition hover:scale-105 hover:bg-pink-500 sm:h-12 sm:w-12 sm:text-2xl"
          >
            ✕
          </button>

          {items.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Предыдущий скрин"
              className="absolute left-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-4 border-pink-200 bg-pink-100 text-4xl font-black text-pink-500 shadow-lg transition hover:scale-105 hover:bg-pink-200 sm:flex sm:left-6 sm:h-16 sm:w-16"
            >
              ←
            </button>
          )}

          <img
            src={selectedItem.image_url}
            alt={`FM скрин ${selectedIndex + 1}`}
            className="max-h-[88vh] max-w-[94vw] select-none rounded-3xl object-contain shadow-2xl sm:max-w-[78vw]"
            draggable={false}
            onClick={(event) => event.stopPropagation()}
          />

          {items.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Следующий скрин"
              className="absolute right-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-4 border-pink-200 bg-pink-100 text-4xl font-black text-pink-500 shadow-lg transition hover:scale-105 hover:bg-pink-200 sm:flex sm:right-6 sm:h-16 sm:w-16"
            >
              →
            </button>
          )}
        </div>
      )}
    </main>
  );
}