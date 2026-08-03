"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SavedClip = {
  id: string | number;
  title: string;
  url: string;
};

type TwitchClip = {
  id: string | number;
  title: string;
  thumbnail: string;
  url: string;
  creator: string;
};

export default function ClipsPage() {
  const [clips, setClips] = useState<TwitchClip[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadClips() {
      try {
        const response = await fetch("/api/clips");
        const savedClips = await response.json();

        if (!response.ok || !Array.isArray(savedClips)) {
          setMessage(savedClips.error ?? "Не удалось загрузить клипы");
          return;
        }

        const loadedClips = await Promise.all(
          (savedClips as SavedClip[]).map(async (clip) => {
            try {
              const twitchResponse = await fetch(
                `/api/twitch?url=${encodeURIComponent(clip.url)}`
              );

              const twitchData = await twitchResponse.json();

              return {
                id: clip.id,
                title: clip.title,
                thumbnail:
                  typeof twitchData.thumbnail === "string"
                    ? twitchData.thumbnail
                    : "",
                url: clip.url,
                creator:
                  typeof twitchData.creator === "string"
                    ? twitchData.creator
                    : "",
              };
            } catch {
              return {
                id: clip.id,
                title: clip.title,
                thumbnail: "",
                url: clip.url,
                creator: "",
              };
            }
          })
        );

        setClips(loadedClips);
      } catch {
        setMessage("Не удалось загрузить клипы");
      } finally {
        setLoading(false);
      }
    }

    loadClips();
  }, []);

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
            Clips <span className="text-pink-400">🎬</span>
          </h1>

          <p className="mt-2 text-zinc-500">
            Любимые моменты со стримов
          </p>
        </div>

        {loading && (
          <p className="mt-10 text-center text-zinc-500">
            Загружаем клипы...
          </p>
        )}

        {message && (
          <p className="mt-10 text-center font-semibold text-pink-500">
            {message}
          </p>
        )}

        {!loading && !message && clips.length === 0 && (
          <p className="mt-10 text-center text-zinc-500">
            Клипов пока нет
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clips.map((clip, index) => (
            <a
              key={clip.id}
              href={clip.url}
              target="_blank"
              rel="noreferrer"
              className="
                group
                overflow-hidden
                rounded-[30px]
                border
                border-pink-200
                bg-white/90
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
                animationDelay: `${index * 0.12}s`,
                opacity: 0,
              }}
            >
              {clip.thumbnail ? (
                <img
                  src={clip.thumbnail}
                  alt={clip.title}
                  className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center bg-pink-50 text-5xl">
                  🎬
                </div>
              )}

              <div className="p-5">
                <h2 className="text-xl font-black">
                  {clip.title}
                </h2>

                {clip.creator && (
                  <p className="mt-1 text-sm text-zinc-500">
                    Автор клипа: {clip.creator}
                  </p>
                )}

                <p className="mt-4 font-bold text-pink-500">
                  Смотреть на Twitch →
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}