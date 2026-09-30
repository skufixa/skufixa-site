export default function Decorations() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        -z-10
        overflow-hidden
      "
    >

      {/* зайка сверху слева */}
      <img
        src="/decorations/зайка.png"
        alt=""
        className="
          decor-float-a
          absolute
          left-[3%]
          top-[12%]
          w-28
          sm:w-44
          opacity-80
        "
      />


      {/* маленький зай */}
      <img
        src="/decorations/зай.png"
        alt=""
        className="
          decor-float-b
          absolute
          left-[10%]
          top-[40%]
          w-28
          sm:w-40
          opacity-80
        "
      />


      {/* большой кот справа */}
      <img
        src="/decorations/кот.png"
        alt=""
        className="
          decor-float-a
          absolute
          right-[3%]
          top-[18%]
          w-52
          sm:w-72
          opacity-70
        "
      />


      {/* кот снизу слева */}
      <img
        src="/decorations/котик.png"
        alt=""
        className="
          decor-float-b
          absolute
          left-[3%]
          bottom-[8%]
          w-40
          sm:w-56
          opacity-70
        "
      />


      {/* кот1 */}
      <img
        src="/decorations/кот1.jpg"
        alt=""
        className="
          decor-float-c
          absolute
          right-[8%]
          top-[52%]
          w-36
          sm:w-48
          rounded-xl
          opacity-70
        "
      />


      {/* кот2 */}
      <img
        src="/decorations/кот2.jpg"
        alt=""
        className="
          decor-float-a
          absolute
          left-[5%]
          top-[65%]
          w-32
          sm:w-44
          rounded-xl
          opacity-70
        "
      />


      {/* собака */}
      <img
        src="/decorations/собака.png"
        alt=""
        className="
          decor-float-b
          absolute
          right-[5%]
          bottom-[8%]
          w-40
          sm:w-52
          opacity-75
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
          bottom-[30%]
          w-32
          sm:w-40
          rounded-xl
          opacity-70
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
          bottom-[4%]
          w-32
          sm:w-44
        "
      />



      {/* бантики */}

      <img
        src="/decorations/бантик.png"
        alt=""
        className="
          decor-bow
          absolute
          left-[25%]
          top-[15%]
          w-24
          sm:w-32
          opacity-80
        "
      />


      <img
        src="/decorations/бантик.png"
        alt=""
        className="
          decor-bow-reverse
          absolute
          right-[18%]
          top-[35%]
          w-28
          sm:w-40
          opacity-80
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
          w-28
          sm:w-36
          opacity-75
        "
      />



      {/* сердечки */}

      <span className="decoration-heart absolute left-[20%] top-[20%] text-3xl text-pink-300">
        ♡
      </span>

      <span className="decoration-heart absolute right-[18%] top-[12%] text-3xl text-pink-300">
        ♡
      </span>


      <span className="decoration-star absolute left-[30%] top-[15%] text-3xl text-pink-300">
        ✦
      </span>


      <span className="decoration-star absolute right-[10%] top-[45%] text-4xl text-pink-300">
        ✧
      </span>


      <span className="decoration-heart absolute left-[25%] bottom-[25%] text-3xl text-pink-300">
        ♡
      </span>


    </div>
  );
}