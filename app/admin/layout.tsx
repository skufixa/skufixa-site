"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    title: "Главная",
    icon: "💻",
    href: "/admin",
  },
  {
    title: "Links",
    icon: "🔗",
    href: "/admin/links",
  },
  {
    title: "FM",
    icon: "📸",
    href: "/admin/fm",
  },
  {
    title: "Clips",
    icon: "🎬",
    href: "/admin/clips",
  },
  {
    title: "Streaks",
    icon: "🔥",
    href: "/admin/streaks",
  },
  {
    title: "Стендик",
    icon: "🪧",
    href: "/admin/standik",
  },
];


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();


  // страница входа без меню
  if (pathname === "/admin") {
    return children;
  }


  return (

    <div className="min-h-screen">


      {/* Меню ПК */}

      <aside className="
        fixed
        left-5
        top-5
        bottom-5
        z-50
        hidden
        w-64
        rounded-3xl
        border
        border-pink-200
        bg-white/90
        p-6
        shadow-xl
        backdrop-blur-md
        lg:flex
        lg:flex-col
      ">


        <Link href="/admin">

          <div className="
            text-sm
            font-bold
            text-pink-400
          ">
            skufixaa ♡
          </div>


          <h2 className="
            mt-1
            text-2xl
            font-black
          ">
            Админка
          </h2>

        </Link>



        <nav className="
          mt-8
          flex
          flex-1
          flex-col
          gap-2
        ">


          {sections.map((section)=>{

            const isActive =
              section.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(section.href);


            return (

              <Link
                key={section.href}
                href={section.href}
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  px-4
                  py-3
                  font-bold
                  transition

                  ${
                    isActive
                    ? "bg-pink-400 text-white shadow-md"
                    : "hover:bg-pink-50"
                  }
                `}
              >

                <span className="text-xl">
                  {section.icon}
                </span>

                <span>
                  {section.title}
                </span>

              </Link>

            );

          })}


        </nav>



        <Link
          href="/"
          className="
            rounded-2xl
            border
            border-pink-200
            px-4
            py-3
            text-center
            font-semibold
            hover:bg-pink-50
          "
        >
          ← На сайт
        </Link>


      </aside>





      {/* Меню телефон */}

      <div className="
        sticky
        top-0
        z-40
        border-b
        border-pink-200
        bg-white/90
        px-3
        py-3
        backdrop-blur-md
        lg:hidden
      ">


        <div className="
          flex
          gap-2
          overflow-x-auto
        ">


          {sections.map((section)=>{

            const isActive =
              section.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(section.href);


            return (

              <Link
                key={section.href}
                href={section.href}
                className={`
                  flex
                  shrink-0
                  items-center
                  gap-2
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  font-bold

                  ${
                    isActive
                    ? "bg-pink-400 text-white"
                    : "border border-pink-200 bg-white"
                  }
                `}
              >

                <span>
                  {section.icon}
                </span>

                <span>
                  {section.title}
                </span>

              </Link>

            );

          })}


        </div>

      </div>





      {/* Контент */}

      <div className="
        min-h-screen
        lg:pl-[284px]
      ">

        {children}

      </div>


    </div>

  );

}