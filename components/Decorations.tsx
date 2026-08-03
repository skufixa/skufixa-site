export default function Decorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Обычный зайчик — слева сверху */}
      <img
        src="/decorations/зайка.png"
        alt=""
        className="
          absolute
          -left-2
          top-20
          w-24
          object-contain
          opacity-75
          sm:left-3
          sm:top-24
          sm:w-32
          lg:left-[4%]
          lg:top-[9%]
          lg:w-40
          lg:opacity-90
        "
      />

      {/* Пиксельный зай — слева около центра */}
      <img
        src="/decorations/зай.png"
        alt=""
        className="
          absolute
          left-3
          top-[31%]
          w-24
          object-contain
          opacity-90
          sm:left-6
          sm:w-28
          lg:left-[7%]
          lg:top-[36%]
          lg:w-36
        "
      />

      {/* Большой кот — справа около профиля */}
      <img
        src="/decorations/кот.png"
        alt=""
        className="
          absolute
          -right-14
          top-[25%]
          w-40
          object-contain
          opacity-75
          sm:-right-10
          sm:w-48
          lg:-right-5
          lg:top-[22%]
          lg:w-64
          lg:opacity-85
        "
      />

      {/* Котик с текстом — слева снизу */}
      <img
        src="/decorations/котик.png"
        alt=""
        className="
          absolute
          -left-6
          bottom-28
          w-32
          object-contain
          opacity-70
          sm:-left-3
          sm:w-40
          lg:left-[1%]
          lg:bottom-[7%]
          lg:w-52
          lg:opacity-85
        "
      />

      {/* Наруто — снизу слева */}
      <img
        src="/decorations/наруто.png"
        alt=""
        className="
          absolute
          -bottom-2
          left-2
          w-24
          object-contain
          opacity-85
          sm:left-8
          sm:w-28
          lg:left-[15%]
          lg:bottom-0
          lg:w-36
        "
      />

      {/* Собака — снизу справа */}
      <img
        src="/decorations/собака.png"
        alt=""
        className="
          absolute
          -bottom-2
          -right-8
          w-28
          object-contain
          opacity-75
          sm:-right-3
          sm:w-36
          lg:right-[6%]
          lg:bottom-0
          lg:w-44
          lg:opacity-90
        "
      />

      {/* Декор сверху вокруг центрального блока */}
      <span className="soft-glow absolute left-[25%] top-[12%] text-2xl text-pink-300 sm:text-3xl lg:left-[30%] lg:text-4xl">
        ✦
      </span>

      <span className="float-heart-small absolute right-[22%] top-[14%] text-2xl text-pink-300 lg:right-[28%] lg:text-3xl">
        ♡
      </span>

      <span className="soft-glow absolute right-[8%] top-[17%] text-2xl text-pink-300 sm:right-[12%] lg:right-[18%] lg:text-4xl">
        ✧
      </span>

      {/* Декор по бокам центрального контента */}
      <span className="float-heart-small absolute left-[4%] top-[47%] text-2xl text-pink-200 sm:left-[10%] lg:left-[20%] lg:text-3xl">
        ♡
      </span>

      <span className="soft-glow absolute right-[5%] top-[48%] text-2xl text-pink-300 sm:right-[10%] lg:right-[20%] lg:text-4xl">
        ✦
      </span>

      <span className="float-heart-small absolute left-[18%] top-[65%] hidden text-3xl text-pink-300 sm:block lg:left-[24%]">
        ♡
      </span>

      <span className="soft-glow absolute right-[18%] top-[67%] hidden text-3xl text-pink-300 sm:block lg:right-[24%]">
        ✧
      </span>

      {/* Небольшие элементы в свободных местах */}
      <span className="soft-glow absolute left-[8%] top-[22%] text-xl text-pink-200 lg:text-2xl">
        ✦
      </span>

      <span className="float-heart-small absolute right-[5%] top-[9%] text-xl text-pink-300 lg:right-[8%] lg:text-2xl">
        ♡
      </span>

      <span className="float-heart-small absolute bottom-[18%] left-[5%] text-xl text-pink-300 lg:left-[12%] lg:text-3xl">
        ♡
      </span>

      <span className="soft-glow absolute bottom-[14%] right-[17%] text-2xl text-pink-300 lg:text-3xl">
        ✦
      </span>
    </div>
  );
}