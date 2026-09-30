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
            typeof data.followers === "number"
              ? data.followers
              : 0,
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
    <section className="flex w-full flex-col items-center px-4 pb-2 pt-6 sm:pt-10">

      <div className="
        reveal-avatar
        relative
        rounded-full
        bg-gradient-to-br
        from-pink-200
        to-pink-400
        p-1
        shadow-xl
        shadow-pink-200/50
      ">
        <div className="
          overflow-hidden
          rounded-full
          border-4
          border-white
        ">
          <Image
            src="/avatar.jpg"
            alt="skufixa"
            width={220}
            height={220}
            priority
            className="
              h-[170px]
              w-[170px]
              object-cover
              sm:h-[210px]
              sm:w-[210px]
            "
          />
        </div>

        <div className="
          absolute
          -bottom-1
          -right-1
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border-4
          border-white
          bg-pink-400
          text-2xl
          text-white
          shadow-lg
        ">
          ♡
        </div>
      </div>


      <div className="reveal-title mt-5 text-center">

        <h1 className="
          text-[42px]
          font-black
          tracking-tight
          sm:text-[58px]
        ">
          skufixa
          <span className="text-pink-400"> ♡</span>
        </h1>

        <p className="
          text-base
          text-zinc-500
          sm:text-lg
        ">
          streamer • cs2
        </p>

      </div>



      <div className="
        reveal-status
        mt-5
        flex
        w-full
        max-w-[300px]
        flex-col
        gap-3
      ">

        <div className="
          flex
          items-center
          justify-center
          gap-3
          rounded-full
          border
          border-pink-200
          bg-white
          px-5
          py-3
          shadow-sm
        ">

          <span
            className={`
              h-3
              w-3
              rounded-full
              ${
                twitch.live
                  ? "animate-pulse bg-red-500"
                  : "bg-zinc-400"
              }
            `}
          />

          <span className="font-semibold text-zinc-900">
            {twitch.live ? "Сейчас в эфире" : "Offline"}
          </span>

        </div>



        <div className="
          flex
          items-center
          justify-center
          gap-3
          rounded-full
          border
          border-pink-200
          bg-white
          px-5
          py-3
          shadow-sm
        ">

          <span>
            👥
          </span>

          <span className="font-semibold text-zinc-900">
            {twitch.followers.toLocaleString("ru-RU")} followers
          </span>

        </div>

      </div>



      <a
        href="https://www.twitch.tv/skufixa"
        target="_blank"
        rel="noreferrer"
        className="
          reveal-twitch
          mt-5
          flex
          w-full
          max-w-[330px]
          items-center
          justify-center
          gap-2
          rounded-full
          bg-gradient-to-r
          from-pink-400
          to-pink-500
          px-6
          py-4
          font-bold
          text-white
          shadow-lg
          shadow-pink-300/40
          transition
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        💜 Перейти на Twitch
      </a>


    </section>
  );
}