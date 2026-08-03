import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

async function isAuthorized() {
  const cookieStore = await cookies();

  return cookieStore.get("admin-session")?.value === "authorized";
}

export async function GET() {
  const { data, error } = await supabase
    .from("fm")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      {
        error: "Нет доступа",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const body = await request.json();
    const imageUrl = body.image_url?.trim();

    if (!imageUrl) {
      return NextResponse.json(
        {
          error: "Изображение не загружено",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("fm")
      .insert({
        image_url: imageUrl,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      {
        error: "Ошибка добавления FM",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      {
        error: "Нет доступа",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          error: "Не указан ID",
        },
        {
          status: 400,
        }
      );
    }

    const { error } = await supabase
      .from("fm")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Ошибка удаления FM",
      },
      {
        status: 500,
      }
    );
  }
}