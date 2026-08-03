"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type TwitchData = {
  live: boolean;
  followers: number;
};

export default function Hero() {
  const [twitch, setTwitch] = useState<TwitchData>({
    live: false,
    followers: 0,
  });

  useEffect(() => {
    async function loadTwitch() {
      try {
        const response = await fetch("/api/twitch-status");
        const data = await response.json();

        setTwitch({
          live: Boolean(data.live),
          followers:
            typeof data.followers === "number" ? data.followers : 0,
        });
      } catch {
        setTwitch({
          live: false,
          followers: 0,
        });
      }
    }

    loadTwitch();
  }, []);

  return (
    <section className="flex w-full flex-col items-center px-4 pb-1 pt-5 sm:pb-2 sm:pt-8">
      <div className="reveal-avatar relative">
        <div className="overflow-hidden rounded-full border-4 border-pink-200 shadow-2xl shadow-pink-200/50 sm:border-[6px]">
          <Image
            src="/avatar.jpg"
            alt="skufixaa"
            width={240}
            height={240}
            priority
            className="h-[190px] w-[190px] object-cover sm:h-[240px] sm:w-[240px]"
          />
        </div>

        <div className="float-heart absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-pink-300 text-2xl shadow-lg sm:h-14 sm:w-14 sm:text-3xl">
          ♡
        </div>

        <span className="float-heart-small absolute -left-8 top-7 text-2xl text-pink-300 sm:-left-10 sm:top-8 sm:text-3xl">
          ♡
        </span>

        <span className="float-heart-small absolute -right-9 top-16 text-xl text-pink-200 sm:-right-12 sm:top-20 sm:text-2xl">
          ♡
        </span>

        <span className="soft-glow absolute -left-10 bottom-5 text-2xl text-pink-200 sm:-left-14 sm:bottom-6 sm:text-3xl">
          ✦
        </span>
      </div>

      <div className="reveal-title text-center">
        <h1 className="mt-4 text-[42px] font-black tracking-tight sm:mt-5 sm:text-[64px]">
          skufixaa <span className="text-pink-400">♡</span>
        </h1>

        <p className="mt-0.5 text-base text-zinc-500 sm:text-xl">
          streamer • cs2
        </p>
      </div>

      <div className="reveal-status mt-4 flex w-full max-w-[292px] flex-col gap-2 sm:mt-5 sm:max-w-[320px]">
        <div className="flex items-center justify-center gap-3 rounded-full border border-pink-200 bg-white/90 px-5 py-2.5 shadow-sm backdrop-blur-sm">
          <div
            className={`h-3 w-3 rounded-full ${
              twitch.live
                ? "animate-pulse bg-red-500"
                : "bg-zinc-400"
            }`}
          />

          <span className="font-semibold">
            {twitch.live ? "Сейчас в эфире" : "Offline"}
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 rounded-full border border-pink-200 bg-white/90 px-5 py-2.5 shadow-sm backdrop-blur-sm">
          <span className="text-lg">👥</span>

          <span className="font-semibold">
            {twitch.followers.toLocaleString("ru-RU")} followers
          </span>
        </div>
      </div>

      <div className="reveal-twitch mt-4 w-full max-w-[320px] sm:mt-5 sm:max-w-[350px]">
        <a
          href="https://www.twitch.tv/skufixaa"
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-pink-300 bg-gradient-to-r from-pink-400 to-pink-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-pink-200/70 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] sm:text-lg"
        >
          <span>💜</span>
          <span>Перейти на Twitch</span>
        </a>
      </div>
    </section>
  );
}