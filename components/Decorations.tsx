export default function Decorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >

      {/* зайка сверху слева */}
      <img
        src="/decorations/зайка.png"
        alt=""
        className="
          decor-float-a
          absolute
          left-[6%]
          top-[12%]
          w-44
          object-contain
          opacity-90
          sm:w-52
        "
      />

      {/* маленький зай */}
      <img
        src="/decorations/зай.png"
        alt=""
        className="
          decor-float-b
          absolute
          left-[12%]
          top-[38%]
          w-40
          object-contain
          opacity-90
        "
      />

      {/* большой кот справа */}
      <img
        src="/decorations/кот.png"
        alt=""
        className="
          decor-float-a
          absolute
          right-[5%]
          top-[18%]
          w-72
          object-contain
          opacity-85
        "
      />

      {/* котик снизу слева */}
      <img
        src="/decorations/котик.png"
        alt=""
        className="
          decor-float-b
          absolute
          left-[4%]
          bottom-[12%]
          w-56
          object-contain
          opacity-85
        "
      />

      {/* кот1 */}
      <img
        src="/decorations/кот1.jpg"
        alt=""
        className="
          decor-float-c
          absolute
          right-[10%]
          top-[48%]
          w-48
          object-contain
          rounded-xl
          opacity-85
        "
      />

      {/* кот2 */}
      <img
        src="/decorations/кот2.jpg"
        alt=""
        className="
          decor-float-a
          absolute
          left-[8%]
          top-[60%]
          w-44
          object-contain
          rounded-xl
          opacity-85
        "
      />

      {/* собака */}
      <img
        src="/decorations/собака.png"
        alt=""
        className="
          decor-float-b
          absolute
          right-[8%]
          bottom-[10%]
          w-52
          object-contain
          opacity-90
        "
      />

      {/* собака1 */}
      <img
        src="/decorations/собака1.jpg"
        alt=""
        className="
          decor-float-c
          absolute
          right-[18%]
          bottom-[35%]
          w-40
          object-contain
          rounded-xl
          opacity-80
        "
      />

      {/* наруто */}
      <img
        src="/decorations/наруто.png"
        alt=""
        className="
          decor-float-a
          absolute
          left-[18%]
          bottom-[5%]
          w-44
          object-contain
        "
      />


      {/* БАНТИКИ */}
      <img
        src="/decorations/бантик.png"
        alt=""
        className="
          decor-bow
          absolute
          left-[25%]
          top-[12%]
          w-32
          opacity-90
        "
      />

      <img
        src="/decorations/бантик.png"
        alt=""
        className="
          decor-bow-reverse
          absolute
          right-[20%]
          top-[35%]
          w-40
          opacity-90
        "
      />

      <img
        src="/decorations/бантик.png"
        alt=""
        className="
          decor-bow
          absolute
          right-[28%]
          bottom-[18%]
          w-36
          opacity-85
        "
      />


      {/* сердечки и звездочки */}
      <span className="decoration-heart absolute left-[22%] top-[20%] text-4xl text-pink-300">
        ♡
      </span>

      <span className="decoration-heart absolute right-[18%] top-[12%] text-4xl text-pink-300">
        ♡
      </span>

      <span className="decoration-star absolute left-[30%] top-[15%] text-4xl text-pink-300">
        ✦
      </span>

      <span className="decoration-star absolute right-[10%] top-[45%] text-5xl text-pink-300">
        ✧
      </span>

      <span className="decoration-heart absolute left-[25%] bottom-[25%] text-4xl text-pink-300">
        ♡
      </span>

    </div>
  );
}