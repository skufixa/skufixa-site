"use client";

import { useEffect, useMemo, useState } from "react";

type FieldConfig = {
  key: string;
  label: string;
  type?: "text" | "number" | "url";
  placeholder?: string;
};

type EditableItem = {
  id: number;
  [key: string]: string | number;
};

type EditableListProps = {
  endpoint: string;
  title: string;
  description: string;
  fields: FieldConfig[];
  emptyItem: Record<string, string | number>;
  addButtonText?: string;
};

export default function EditableList({
  endpoint,
  title,
  description,
  fields,
  emptyItem,
  addButtonText = "+ Добавить",
}: EditableListProps) {
  const [items, setItems] = useState<EditableItem[]>([]);
  const [newItem, setNewItem] =
    useState<Record<string, string | number>>(emptyItem);

  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const firstPosition = Number(a.position ?? 0);
      const secondPosition = Number(b.position ?? 0);

      return firstPosition - secondPosition;
    });
  }, [items]);

  async function loadItems() {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (!response.ok || !Array.isArray(data)) {
        setMessage(data.error || "Не удалось загрузить данные");
        return;
      }

      setItems(data);
    } catch {
      setMessage("Не удалось загрузить данные");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, [endpoint]);

  function updateItem(
    id: number,
    field: string,
    value: string | number
  ) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  }

  function updateNewItem(
    field: string,
    value: string | number
  ) {
    setNewItem((currentItem) => ({
      ...currentItem,
      [field]: value,
    }));
  }

  async function addItem() {
    setMessage("");
    setIsAdding(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setMessage(data.error || "Не удалось добавить запись");
        return;
      }

      setItems((currentItems) => [...currentItems, data]);
      setNewItem(emptyItem);
      setShowAddForm(false);
      setMessage("Запись добавлена ✅");
    } catch {
      setMessage("Не удалось добавить запись");
    } finally {
      setIsAdding(false);
    }
  }

  async function saveItem(item: EditableItem) {
    setMessage("");
    setSavingId(item.id);

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setMessage(data.error || "Не удалось сохранить запись");
        return;
      }

      setItems((currentItems) =>
        currentItems.map((currentItem) =>
          currentItem.id === data.id ? data : currentItem
        )
      );

      setMessage("Изменения сохранены ✅");
    } catch {
      setMessage("Не удалось сохранить запись");
    } finally {
      setSavingId(null);
    }
  }

  async function deleteItem(item: EditableItem) {
    const confirmed = window.confirm(
      "Точно удалить эту запись?"
    );

    if (!confirmed) {
      return;
    }

    setMessage("");
    setDeletingId(item.id);

    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.id,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setMessage(data.error || "Не удалось удалить запись");
        return;
      }

      setItems((currentItems) =>
        currentItems.filter(
          (currentItem) => currentItem.id !== item.id
        )
      );

      setMessage("Запись удалена");
    } catch {
      setMessage("Не удалось удалить запись");
    } finally {
      setDeletingId(null);
    }
  }

  function renderInput(
    value: string | number,
    field: FieldConfig,
    onChange: (value: string | number) => void
  ) {
    return (
      <input
        type={field.type ?? "text"}
        value={value}
        placeholder={field.placeholder}
        onChange={(event) =>
          onChange(
            field.type === "number"
              ? Number(event.target.value)
              : event.target.value
          )
        }
        className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400"
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-black">
          {title}
        </h1>

        <p className="mt-2 text-zinc-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          setShowAddForm((current) => !current);
          setMessage("");
        }}
        className="mb-6 w-full rounded-2xl bg-pink-400 px-5 py-4 text-lg font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-pink-500"
      >
        {showAddForm ? "Закрыть добавление" : addButtonText}
      </button>

      {showAddForm && (
        <div className="mb-8 rounded-[30px] border border-pink-300 bg-white/90 p-6 shadow-xl backdrop-blur-sm">
          <h2 className="mb-5 text-2xl font-black text-pink-500">
            Новая запись
          </h2>

          <div className="grid gap-4">
            {fields.map((field) => (
              <label
                key={field.key}
                className="grid gap-2"
              >
                <span className="text-sm font-semibold text-zinc-500">
                  {field.label}
                </span>

                {renderInput(
                  newItem[field.key] ?? "",
                  field,
                  (value) =>
                    updateNewItem(field.key, value)
                )}
              </label>
            ))}

            <button
              type="button"
              onClick={addItem}
              disabled={isAdding}
              className="mt-2 rounded-2xl bg-pink-400 px-5 py-3 font-bold text-white transition hover:bg-pink-500 disabled:opacity-60"
            >
              {isAdding ? "Добавляем..." : "Добавить"}
            </button>
          </div>
        </div>
      )}

      {message && (
        <p className="mb-6 rounded-2xl border border-pink-200 bg-white/90 px-4 py-3 text-center font-semibold text-pink-500">
          {message}
        </p>
      )}

      {loading && (
        <p className="text-center text-zinc-500">
          Загружаем данные...
        </p>
      )}

      {!loading && sortedItems.length === 0 && (
        <p className="text-center text-zinc-500">
          Записей пока нет
        </p>
      )}

      <div className="space-y-6">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className="rounded-[30px] border border-pink-200 bg-white/90 p-6 shadow-lg backdrop-blur-sm"
          >
            <div className="grid gap-4">
              {fields.map((field) => (
                <label
                  key={field.key}
                  className="grid gap-2"
                >
                  <span className="text-sm font-semibold text-zinc-500">
                    {field.label}
                  </span>

                  {renderInput(
                    item[field.key] ?? "",
                    field,
                    (value) =>
                      updateItem(
                        item.id,
                        field.key,
                        value
                      )
                  )}
                </label>
              ))}

              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => saveItem(item)}
                  disabled={
                    savingId === item.id ||
                    deletingId === item.id
                  }
                  className="rounded-2xl bg-pink-400 px-5 py-3 font-bold text-white transition hover:bg-pink-500 disabled:opacity-60"
                >
                  {savingId === item.id
                    ? "Сохраняем..."
                    : "Сохранить"}
                </button>

                <button
                  type="button"
                  onClick={() => deleteItem(item)}
                  disabled={
                    deletingId === item.id ||
                    savingId === item.id
                  }
                  className="rounded-2xl border border-red-300 bg-red-50 px-5 py-3 font-bold text-red-500 transition hover:bg-red-100 disabled:opacity-60"
                >
                  {deletingId === item.id
                    ? "Удаляем..."
                    : "Удалить"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}