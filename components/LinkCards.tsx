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
    <section
      className="
        mx-auto
        mt-8
        grid
        w-full
        max-w-3xl
        grid-cols-1
        gap-4
        px-5
        pb-12
        sm:grid-cols-2
        sm:px-4
      "
    >
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
              h-[96px]
              items-center
              justify-between
              rounded-[26px]
              border
              border-pink-200
              bg-white
              px-5
              shadow-md
              shadow-pink-100/50
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-pink-300
              hover:shadow-xl
              active:scale-[0.98]

              dark:border-zinc-700
              dark:bg-zinc-900
              dark:shadow-black/30
            "
          >
            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-14
                  w-14
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

                  dark:bg-pink-500/10
                "
              >
                {card.icon}
              </div>


              <div>
                <h2
                  className="
                    text-xl
                    font-black
                    leading-none
                    text-zinc-900

                    dark:text-white
                  "
                >
                  {card.title}
                </h2>

                <p
                  className="
                    mt-2
                    text-xs
                    font-medium
                    text-zinc-400
                  "
                >
                  {card.subtitle}
                </p>
              </div>

            </div>


            <span
              className="
                text-2xl
                text-zinc-300
                transition
                duration-300
                group-hover:translate-x-1
                group-hover:text-pink-400

                dark:text-zinc-500
              "
            >
              ›
            </span>

          </Link>
        </div>
      ))}
    </section>
  );
}