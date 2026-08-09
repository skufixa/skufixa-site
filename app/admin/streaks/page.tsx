import Link from "next/link";

import EditableList from "@/components/admin/EditableList";


export default function AdminStreaksPage() {
  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">

        <Link
          href="/admin"
          className="
            mb-6
            inline-block
            text-sm
            font-semibold
            text-pink-400
            transition
            hover:text-pink-500
          "
        >
          ← В админку
        </Link>


        <EditableList
          endpoint="/api/streaks"
          title="Управление Streaks"
          description="Добавляй ник и количество стриков — место определяется автоматически"
          addButtonText="+ Добавить пользователя"
          fields={[
            {
              key: "username",
              label: "Ник пользователя",
              placeholder: "Например: viewer123",
            },
            {
              key: "streak",
              label: "Количество стриков",
              type: "number",
            },
          ]}
          emptyItem={{
            username: "",
            streak: 0,
          }}
        />

      </div>
    </main>
  );
}