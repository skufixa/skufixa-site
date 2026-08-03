import Link from "next/link";
import EditableList from "@/components/admin/EditableList";

export default function AdminStreaksPage() {
  return (
    <main className="relative z-10 min-h-screen px-4 py-10">
      <div className="mx-auto mb-6 w-full max-w-3xl">
        <Link
          href="/admin"
          className="inline-block rounded-2xl border border-pink-200 bg-white/90 px-4 py-2 font-semibold shadow-md transition hover:-translate-y-1"
        >
          ← В админку
        </Link>
      </div>

      <EditableList
        endpoint="/api/streaks"
        title="Управление Streaks"
        description="Добавляй пользователей и меняй количество стриков"
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
          {
            key: "position",
            label: "Порядок",
            type: "number",
          },
        ]}
        emptyItem={{
          username: "",
          streak: 0,
          position: 1,
        }}
      />
    </main>
  );
}