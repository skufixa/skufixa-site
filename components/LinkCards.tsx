import Link from "next/link";

const cards = [
  {
    title: "Links",
    subtitle: "все мои ссылки",
    icon: "🔗",
    url: "/links",
  },
  {
    title: "FM",
    subtitle: "первые сообщения",
    icon: "📸",
    url: "/fm",
  },
  {
    title: "Clips",
    subtitle: "любимые клипы",
    icon: "🎬",
    url: "/clips",
  },
  {
    title: "Streaks",
    subtitle: "серии просмотров",
    icon: "🔥",
    url: "/streaks",
  },
];

export default function LinkCards() {
  return (
    <section className="mx-auto mt-7 grid w-full max-w-3xl grid-cols-1 gap-4 px-5 pb-12 sm:mt-8 sm:grid-cols-2 sm:px-4">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className="opacity-0 animate-[reveal-up_0.7s_ease-out_forwards]"
          style={{
            animationDelay: `${0.9 + index * 0.12}s`,
          }}
        >
          <Link
            href={card.url}
            className="
              group
              flex
              min-h-[104px]
              w-full
              items-center
              justify-between
              rounded-[28px]
              border
              border-pink-200
              bg-white/90
              px-5
              py-4
              shadow-lg
              shadow-pink-100/70
              backdrop-blur-sm
              transition
              duration-300
              hover:-translate-y-1
              hover:scale-[1.02]
              hover:border-pink-300
              hover:shadow-xl
              active:scale-[0.98]
              sm:min-h-[112px]
            "
          >
            <div className="flex min-w-0 items-center gap-4">
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
                  shadow-md
                  transition
                  duration-300
                  group-hover:scale-110
                  group-hover:bg-pink-100
                "
              >
                {card.icon}
              </div>

              <div className="min-w-0">
                <h2 className="text-xl font-black text-zinc-900 sm:text-2xl">
                  {card.title}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  {card.subtitle}
                </p>
              </div>
            </div>

            <span className="ml-3 shrink-0 text-3xl font-light text-zinc-400 transition duration-300 group-hover:translate-x-1 group-hover:text-pink-400">
              ›
            </span>
          </Link>
        </div>
      ))}
    </section>
  );
}