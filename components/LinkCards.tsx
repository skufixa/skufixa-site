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
        grid-cols-2
        gap-4
      "
    >
      {cards.map((card) => (
        <Link
          href={card.url}
          key={card.title}
          className="
            group
            flex
            h-28
            items-center
            justify-between
            rounded-[28px]
            border
            border-pink-200
            bg-white/80
            px-5
            shadow-md
            shadow-pink-100/50
            backdrop-blur-md
            transition-all
            duration-300
            hover:-translate-y-1
            hover:scale-[1.02]
            hover:shadow-xl
          "
        >

          <div className="
            flex
            items-center
            gap-5
          ">

            <div
              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-pink-50
                text-4xl
                shadow-sm
                transition
                duration-300
                group-hover:scale-110
                group-hover:bg-pink-100
              "
            >
              {card.icon}
            </div>


            <div>

              <h2
                className="
                  text-2xl
                  font-black
                  leading-none
                  text-zinc-900
                "
              >
                {card.title}
              </h2>


              <p
                className="
                  mt-2
                  text-sm
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


        </Link>
      ))}
    </section>
  );
}