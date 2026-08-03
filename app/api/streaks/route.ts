import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

async function isAuthorized() {
  const cookieStore = await cookies();

  return cookieStore.get("admin-session")?.value === "authorized";
}

export async function GET() {
  const { data, error } = await supabase
    .from("streaks")
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

  const body = await request.json();

  const { data, error } = await supabase
    .from("streaks")
    .insert(body)
    .select()
    .single();

  if (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return Response.json(data);
}

export async function PUT(request: Request) {
  if (!(await isAuthorized())) {
    return Response.json(
      { error: "Нет доступа" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const { data, error } = await supabase
    .from("streaks")
    .update({
      username: body.username,
      streak: body.streak,
      position: body.position,
    })
    .eq("id", body.id)
    .select()
    .single();

  if (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return Response.json(data);
}

export async function DELETE(request: Request) {
  if (!(await isAuthorized())) {
    return Response.json(
      { error: "Нет доступа" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const { error } = await supabase
    .from("streaks")
    .delete()
    .eq("id", body.id);

  if (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return Response.json({
    success: true,
  });
}