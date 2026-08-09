import { cookies } from "next/headers";

import { supabase } from "@/lib/supabase";


async function isAuthorized() {
  const cookieStore = await cookies();

  return (
    cookieStore.get("admin-session")?.value === "authorized"
  );
}


export async function GET() {
  const { data, error } = await supabase
    .from("streaks")
    .select("*")
    .order("streak", { ascending: false })
    .order("id", { ascending: true });

  if (error) {
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }

  const sortedStreaks = (data ?? []).map(
    (item, index) => ({
      ...item,
      position: index + 1,
    })
  );

  return Response.json(sortedStreaks);
}


export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return Response.json(
      {
        error: "Нет доступа",
      },
      {
        status: 401,
      }
    );
  }

  const body = await request.json();

  const username = String(
    body.username ?? ""
  ).trim();

  const streak = Number(body.streak);

  if (!username) {
    return Response.json(
      {
        error: "Укажи ник пользователя",
      },
      {
        status: 400,
      }
    );
  }

  if (
    !Number.isFinite(streak) ||
    streak < 0
  ) {
    return Response.json(
      {
        error: "Некорректное количество стриков",
      },
      {
        status: 400,
      }
    );
  }

  /*
    position в старой таблице оставляем,
    чтобы ничего не ломать в Supabase.

    Но пользователь его больше НЕ вводит.

    Находим последнее техническое значение position
    и создаём следующее автоматически.
  */

  const {
    data: lastPositionData,
    error: positionError,
  } = await supabase
    .from("streaks")
    .select("position")
    .order("position", {
      ascending: false,
    })
    .limit(1);

  if (positionError) {
    return Response.json(
      {
        error: positionError.message,
      },
      {
        status: 500,
      }
    );
  }

  const lastPosition =
    lastPositionData?.[0]?.position ?? 0;

  const technicalPosition =
    Number(lastPosition) + 1;

  const { data, error } = await supabase
    .from("streaks")
    .insert({
      username,
      streak,
      position: technicalPosition,
    })
    .select()
    .single();

  if (error) {
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }

  return Response.json(data);
}


export async function PUT(request: Request) {
  if (!(await isAuthorized())) {
    return Response.json(
      {
        error: "Нет доступа",
      },
      {
        status: 401,
      }
    );
  }

  const body = await request.json();

  const id = Number(body.id);

  const username = String(
    body.username ?? ""
  ).trim();

  const streak = Number(body.streak);

  if (!Number.isFinite(id)) {
    return Response.json(
      {
        error: "Некорректный ID",
      },
      {
        status: 400,
      }
    );
  }

  if (!username) {
    return Response.json(
      {
        error: "Укажи ник пользователя",
      },
      {
        status: 400,
      }
    );
  }

  if (
    !Number.isFinite(streak) ||
    streak < 0
  ) {
    return Response.json(
      {
        error: "Некорректное количество стриков",
      },
      {
        status: 400,
      }
    );
  }

  /*
    position здесь специально НЕ обновляем.

    Место теперь определяется автоматически
    по количеству streak.
  */

  const { data, error } = await supabase
    .from("streaks")
    .update({
      username,
      streak,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }

  return Response.json(data);
}


export async function DELETE(request: Request) {
  if (!(await isAuthorized())) {
    return Response.json(
      {
        error: "Нет доступа",
      },
      {
        status: 401,
      }
    );
  }

  const body = await request.json();

  const id = Number(body.id);

  if (!Number.isFinite(id)) {
    return Response.json(
      {
        error: "Некорректный ID",
      },
      {
        status: 400,
      }
    );
  }

  const { error } = await supabase
    .from("streaks")
    .delete()
    .eq("id", id);

  if (error) {
    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }

  return Response.json({
    success: true,
  });
}