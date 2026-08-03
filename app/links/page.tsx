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

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center">

        <Link
          href="/"
          className="
            mb-6
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
            text-center
            text-5xl
            font-black
            tracking-tight
          "
        >
          Links <span className="text-pink-400">♡</span>
        </h1>


        <p
          className="
            mb-10
            mt-2
            text-center
            text-zinc-500
          "
        >
          все мои ссылки
        </p>


        {loading && (
          <p className="text-zinc-500">
            Загружаем ссылки...
          </p>
        )}


        {message && (
          <p className="font-semibold text-pink-500">
            {message}
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
                min-h-[96px]

                w-full

                items-center
                justify-between

                rounded-[28px]

                border
                border-pink-200

                bg-white

                px-6

                shadow-md
                shadow-pink-100/60

                transition-all
                duration-300

                hover:-translate-y-1
                hover:scale-[1.02]

                hover:border-pink-300
                hover:shadow-xl
              "
            >


              <div className="flex items-center gap-5">


                <div
                  className="
                    flex

                    h-14
                    w-14

                    shrink-0

                    items-center
                    justify-center

                    rounded-full

                    bg-pink-50

                    text-2xl

                    shadow-sm

                    transition

                    duration-300

                    group-hover:scale-110
                    group-hover:bg-pink-100
                  "
                >
                  {item.icon}
                </div>



                <div>

                  <h2
                    className="
                      text-xl
                      font-black

                      text-zinc-900
                    "
                  >
                    {item.title}
                  </h2>



                  <p
                    className="
                      mt-1

                      text-sm

                      text-zinc-400
                    "
                  >
                    {item.subtitle}
                  </p>


                </div>


              </div>



              <span
                className="
                  text-3xl

                  text-zinc-300

                  transition

                  duration-300

                  group-hover:translate-x-1
                  group-hover:text-pink-400
                "
              >
                ›
              </span>


            </a>

          ))}


        </div>


      </div>


    </main>
  );
}