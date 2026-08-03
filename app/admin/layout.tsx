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
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  /*
    На самой странице /admin находится форма входа.
    Поэтому боковое меню показываем только внутри разделов:
    /admin/links, /admin/fm и так далее.
  */
  if (pathname === "/admin") {
    return children;
  }

  return (
    <div className="relative z-10 min-h-screen">
      {/* Меню на компьютере */}
      <aside className="fixed bottom-5 left-5 top-5 z-40 hidden w-64 flex-col rounded-[32px] border border-pink-200 bg-white/90 p-5 shadow-xl backdrop-blur-md lg:flex">
        <Link href="/admin" className="mb-8 block px-3">
          <p className="text-sm font-semibold text-pink-400">
            skufixaa ♡
          </p>

          <h2 className="mt-1 text-2xl font-black">
            Админка
          </h2>
        </Link>

        <nav className="flex flex-1 flex-col gap-2">
          {sections.map((section) => {
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

                <span>{section.title}</span>
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          className="mt-5 rounded-2xl border border-pink-200 px-4 py-3 text-center font-semibold transition hover:bg-pink-50"
        >
          ← На сайт
        </Link>
      </aside>

      {/* Меню на телефоне */}
      <div className="sticky top-0 z-40 border-b border-pink-200 bg-white/90 px-3 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto">
          {sections.map((section) => {
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
                  transition
                  ${
                    isActive
                      ? "bg-pink-400 text-white"
                      : "border border-pink-200 bg-white"
                  }
                `}
              >
                <span>{section.icon}</span>
                <span>{section.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Содержимое выбранного раздела */}
      <div className="min-h-screen lg:pl-[284px]">
        {children}
      </div>
    </div>
  );
}