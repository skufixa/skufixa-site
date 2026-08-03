"use client";

import { useEffect, useState } from "react";

type Clip = {
  id?: string;
  title: string;
  url: string;
};

export default function AdminClipsPage() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  async function loadClips() {
    const response = await fetch("/api/clips");

    const data = await response.json();

    setClips(data);
  }

  useEffect(() => {
    loadClips();
  }, []);

  async function addClip() {
    setMessage("");

    const response = await fetch("/api/clips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        url,
      }),
    });

    const data = await response.json();

    if (data.error) {
      setMessage(data.error);
      return;
    }

    setTitle("");
    setUrl("");

    setMessage("Клип добавлен ✅");

    loadClips();
  }


  async function deleteClip(id?: string) {
    if (!id) return;

    await fetch("/api/clips", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    loadClips();
  }


  return (
    <main className="min-h-screen px-4 py-10">

      <div className="mx-auto max-w-3xl">

        <h1 className="text-5xl font-black">
          Клипы 🎬
        </h1>

        <p className="mt-2 text-zinc-500">
          Добавление клипов через админку
        </p>


        <div className="
          mt-8
          rounded-3xl
          border
          border-pink-200
          bg-white
          p-6
          shadow-md
        ">

          <input
            className="
              w-full
              rounded-2xl
              border
              border-pink-200
              px-4
              py-3
            "
            placeholder="Название клипа"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />


          <input
            className="
              mt-4
              w-full
              rounded-2xl
              border
              border-pink-200
              px-4
              py-3
            "
            placeholder="Ссылка Twitch"
            value={url}
            onChange={(e)=>setUrl(e.target.value)}
          />


          <button
            onClick={addClip}
            className="
              mt-4
              rounded-2xl
              bg-pink-400
              px-6
              py-3
              font-bold
              text-white
            "
          >
            Добавить клип
          </button>


          {message && (
            <p className="mt-3 text-pink-500">
              {message}
            </p>
          )}

        </div>


        <div className="mt-8 grid gap-4">

          {clips.map((clip, index)=>(
            <div
              key={clip.id ?? index}
              className="
                flex
                items-center
                justify-between
                rounded-3xl
                border
                border-pink-200
                bg-white
                p-5
              "
            >

              <div>
                <h2 className="font-bold">
                  🎬 {clip.title}
                </h2>

                <p className="text-sm text-zinc-500">
                  {clip.url}
                </p>
              </div>


              <button
                onClick={()=>deleteClip(clip.id)}
                className="
                  rounded-xl
                  bg-red-400
                  px-4
                  py-2
                  font-bold
                  text-white
                "
              >
                Удалить
              </button>

            </div>
          ))}

        </div>


      </div>

    </main>
  );
}