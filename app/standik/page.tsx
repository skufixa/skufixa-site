import { supabase } from "@/lib/supabase";
import StandikPopup from "@/components/StandikPopup";


export default async function StandikPage() {

  const { data: users } = await supabase
    .from("standik")
    .select("*")
    .order("created_at", {
      ascending: true,
    });


  return (
    <section
      className="
        relative
        z-20
        mx-auto
        max-w-6xl
        px-3
      "
    >

      <StandikPopup />


      <header
        className="
          pt-6
          mb-20
          text-center
        "
      >

        <h1
          className="
            text-4xl
            font-black
            text-pink-400
          "
        >
          skufixaa ♡
        </h1>


        <h2
          className="
            text-2xl
            font-bold
            text-pink-400
          "
        >
          стендик
        </h2>


        <p
          className="
            text-xs
            text-pink-300
            mt-2
          "
        >
          нишевые, няшные, топовые... блип ♡
        </p>

      </header>




      <div
        className="
          grid

          grid-cols-3

          gap-x-4
          gap-y-16

          justify-items-center
        "
      >


        {users?.map((user)=>(


          <div
            key={user.id}

            className="
              flex
              flex-col
              items-center

              relative

              w-[95px]

              sm:w-48
            "
          >



            <img
              src={user.avatar}
              alt={user.name}

              className="
                w-20
                h-20

                sm:w-32
                sm:h-32

                rounded-3xl

                object-cover

                border-4
                border-white

                shadow-xl

                relative

                z-10
              "
            />




            <div
              className="
                -mt-3

                w-full

                h-16

                sm:h-20


                rounded-3xl

                bg-white

                border
                border-pink-200


                flex

                items-end

                justify-center


                pb-3


                shadow-lg
              "
            >



              <div
                className="
                  flex
                  items-center
                  gap-1
                "
              >


                <span
                  className="
                    text-sm

                    sm:text-2xl

                    font-black

                    italic

                    text-black

                    whitespace-nowrap
                  "
                >
                  {user.name}
                </span>


                <span
                  className="
                    text-sm

                    sm:text-xl

                    text-pink-400
                  "
                >
                  ♡
                </span>


              </div>


            </div>


          </div>


        ))}


      </div>


    </section>
  );
}