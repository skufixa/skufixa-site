import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

async function isAuthorized() {
  const cookieStore = await cookies();

  return cookieStore.get("admin-session")?.value === "authorized";
}

export async function GET() {
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .order("position", { ascending: true });

  if (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return Response.json(data);
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return Response.json(
      { error: "Нет доступа" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const title = String(body.title ?? "").trim();
    const subtitle = String(body.subtitle ?? "").trim();
    const icon = String(body.icon ?? "🔗").trim();
    const url = String(body.url ?? "").trim();
    const position = Number(body.position);

    if (!title || !url) {
      return Response.json(
        { error: "Заполни название и ссылку" },
        { status: 400 }
      );
    }

    try {
      new URL(url);
    } catch {
      return Response.json(
        { error: "Введена неправильная ссылка" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("links")
      .insert({
        title,
        subtitle,
        icon: icon || "🔗",
        url,
        position: Number.isFinite(position) ? position : 0,
      })
      .select()
      .single();

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return Response.json(data);
  } catch {
    return Response.json(
      { error: "Ошибка добавления ссылки" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthorized())) {
    return Response.json(
      { error: "Нет доступа" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const id = Number(body.id);
    const title = String(body.title ?? "").trim();
    const subtitle = String(body.subtitle ?? "").trim();
    const icon = String(body.icon ?? "").trim();
    const url = String(body.url ?? "").trim();
    const position = Number(body.position);

    if (!id || !title || !url) {
      return Response.json(
        { error: "Заполни название и ссылку" },
        { status: 400 }
      );
    }

    try {
      new URL(url);
    } catch {
      return Response.json(
        { error: "Введена неправильная ссылка" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("links")
      .update({
        title,
        subtitle,
        icon: icon || "🔗",
        url,
        position: Number.isFinite(position) ? position : 0,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return Response.json(data);
  } catch {
    return Response.json(
      { error: "Ошибка сохранения ссылки" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthorized())) {
    return Response.json(
      { error: "Нет доступа" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const id = Number(body.id);

    if (!id) {
      return Response.json(
        { error: "Не указан ID ссылки" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("links")
      .delete()
      .eq("id", id);

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
    });
  } catch {
    return Response.json(
      { error: "Ошибка удаления ссылки" },
      { status: 500 }
    );
  }
}