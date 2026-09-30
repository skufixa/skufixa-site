import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

const FORTY_FIVE_DAYS =
  45 * 24 * 60 * 60 * 1000;


// =========================
// ПРОВЕРКА АДМИНКИ
// =========================

async function isAuthorized() {
  const cookieStore = await cookies();

  return (
    cookieStore.get("admin-session")?.value === "authorized"
  );
}


// =========================
// ПОЛУЧИТЬ ЛЮДЕЙ
// =========================

export async function GET() {
  const admin = await isAuthorized();

  let query = supabase
    .from("standik")
    .select("*")
    .order("id", {
      ascending: false,
    });


  // Обычные зрители видят только активные места.
  // В админке видны ВСЕ, даже если 45 дней уже закончились.
  if (!admin) {
    query = query.or(
      `expires_at.is.null,expires_at.gt.${new Date().toISOString()}`
    );
  }


  const { data, error } = await query;


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


  return Response.json(data ?? []);
}


// =========================
// ДОБАВИТЬ ЧЕЛОВЕКА
// =========================

export async function POST(
  request: Request
) {
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


  try {
    const formData =
      await request.formData();


    const name =
      String(
        formData.get("name") ?? ""
      ).trim();


    const file =
      formData.get("file") as File | null;


    if (!name || !file) {
      return Response.json(
        {
          error:
            "Нужен ник и фотография",
        },
        {
          status: 400,
        }
      );
    }


    const extension =
      file.name
        .split(".")
        .pop() || "jpg";


    const fileName =
      `${Date.now()}-${crypto.randomUUID()}.${extension}`;


    const buffer =
      await file.arrayBuffer();


    const {
      error: uploadError,
    } =
      await supabase.storage
        .from("standik")
        .upload(
          fileName,
          buffer,
          {
            contentType:
              file.type || "image/jpeg",
            upsert: false,
          }
        );


    if (uploadError) {
      return Response.json(
        {
          error:
            uploadError.message,
        },
        {
          status: 500,
        }
      );
    }


    const {
      data: publicUrlData,
    } =
      supabase.storage
        .from("standik")
        .getPublicUrl(fileName);


    const createdAt =
      new Date();


    const expiresAt =
      new Date(
        createdAt.getTime() +
          FORTY_FIVE_DAYS
      );


    const {
      data,
      error,
    } =
      await supabase
        .from("standik")
        .insert({
          name,
          avatar:
            publicUrlData.publicUrl,
          created_at:
            createdAt.toISOString(),
          expires_at:
            expiresAt.toISOString(),
        })
        .select()
        .single();


    if (error) {
      // Если запись в таблицу не создалась,
      // удаляем уже загруженную картинку.
      await supabase.storage
        .from("standik")
        .remove([fileName]);


      return Response.json(
        {
          error:
            error.message,
        },
        {
          status: 500,
        }
      );
    }


    return Response.json(data);
  } catch {
    return Response.json(
      {
        error:
          "Ошибка добавления",
      },
      {
        status: 500,
      }
    );
  }
}


// =========================
// РЕДАКТИРОВАТЬ
// =========================

export async function PATCH(
  request: Request
) {
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


  try {
    const formData =
      await request.formData();


    const id =
      Number(
        formData.get("id")
      );


    const name =
      String(
        formData.get("name") ?? ""
      ).trim();


    const newFile =
      formData.get("file") as File | null;


    if (!id || !name) {
      return Response.json(
        {
          error:
            "Не указан человек или ник",
        },
        {
          status: 400,
        }
      );
    }


    const {
      data: oldPerson,
      error: oldPersonError,
    } =
      await supabase
        .from("standik")
        .select("id, avatar")
        .eq("id", id)
        .single();


    if (oldPersonError || !oldPerson) {
      return Response.json(
        {
          error:
            oldPersonError?.message ||
            "Человек не найден",
        },
        {
          status: 404,
        }
      );
    }


    let avatar =
      oldPerson.avatar;


    let newFileName:
      | string
      | null = null;


    if (
      newFile &&
      newFile.size > 0
    ) {
      const extension =
        newFile.name
          .split(".")
          .pop() || "jpg";


      newFileName =
        `${Date.now()}-${crypto.randomUUID()}.${extension}`;


      const buffer =
        await newFile.arrayBuffer();


      const {
        error: uploadError,
      } =
        await supabase.storage
          .from("standik")
          .upload(
            newFileName,
            buffer,
            {
              contentType:
                newFile.type ||
                "image/jpeg",
              upsert: false,
            }
          );


      if (uploadError) {
        return Response.json(
          {
            error:
              uploadError.message,
          },
          {
            status: 500,
          }
        );
      }


      const {
        data: publicUrlData,
      } =
        supabase.storage
          .from("standik")
          .getPublicUrl(
            newFileName
          );


      avatar =
        publicUrlData.publicUrl;
    }


    const {
      data,
      error,
    } =
      await supabase
        .from("standik")
        .update({
          name,
          avatar,
        })
        .eq("id", id)
        .select()
        .single();


    if (error) {
      if (newFileName) {
        await supabase.storage
          .from("standik")
          .remove([
            newFileName,
          ]);
      }


      return Response.json(
        {
          error:
            error.message,
        },
        {
          status: 500,
        }
      );
    }


    // Только после успешного обновления
    // удаляем старую фотографию.
    if (
      newFileName &&
      oldPerson.avatar
    ) {
      const oldFileName =
        oldPerson.avatar
          .split("/")
          .pop();


      if (oldFileName) {
        await supabase.storage
          .from("standik")
          .remove([
            oldFileName,
          ]);
      }
    }


    return Response.json(data);
  } catch {
    return Response.json(
      {
        error:
          "Ошибка редактирования",
      },
      {
        status: 500,
      }
    );
  }
}


// =========================
// ПРОДЛИТЬ НА 45 ДНЕЙ
// =========================

export async function PUT(
  request: Request
) {
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


  try {
    const body =
      await request.json();


    const id =
      Number(body.id);


    if (!id) {
      return Response.json(
        {
          error:
            "Не указан ID",
        },
        {
          status: 400,
        }
      );
    }


    const {
      data: person,
      error: personError,
    } =
      await supabase
        .from("standik")
        .select(
          "id, expires_at"
        )
        .eq("id", id)
        .single();


    if (
      personError ||
      !person
    ) {
      return Response.json(
        {
          error:
            personError?.message ||
            "Человек не найден",
        },
        {
          status: 404,
        }
      );
    }


    const now =
      new Date();


    const currentExpires =
      person.expires_at
        ? new Date(
            person.expires_at
          )
        : now;


    // Если срок ещё идёт —
    // прибавляем 45 дней к нему.
    // Если уже закончился —
    // начинаем новые 45 дней с сегодняшнего дня.
    const startDate =
      currentExpires.getTime() >
      now.getTime()
        ? currentExpires
        : now;


    const newExpiresAt =
      new Date(
        startDate.getTime() +
          FORTY_FIVE_DAYS
      );


    const {
      data,
      error,
    } =
      await supabase
        .from("standik")
        .update({
          expires_at:
            newExpiresAt.toISOString(),
        })
        .eq("id", id)
        .select()
        .single();


    if (error) {
      return Response.json(
        {
          error:
            error.message,
        },
        {
          status: 500,
        }
      );
    }


    return Response.json(data);
  } catch {
    return Response.json(
      {
        error:
          "Ошибка продления",
      },
      {
        status: 500,
      }
    );
  }
}


// =========================
// УДАЛИТЬ
// =========================

export async function DELETE(
  request: Request
) {
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


  try {
    const body =
      await request.json();


    const id =
      Number(body.id);


    if (!id) {
      return Response.json(
        {
          error:
            "Не указан ID",
        },
        {
          status: 400,
        }
      );
    }


    const {
      data: person,
    } =
      await supabase
        .from("standik")
        .select("avatar")
        .eq("id", id)
        .single();


    const {
      error,
    } =
      await supabase
        .from("standik")
        .delete()
        .eq("id", id);


    if (error) {
      return Response.json(
        {
          error:
            error.message,
        },
        {
          status: 500,
        }
      );
    }


    if (person?.avatar) {
      const fileName =
        person.avatar
          .split("/")
          .pop();


      if (fileName) {
        await supabase.storage
          .from("standik")
          .remove([
            fileName,
          ]);
      }
    }


    return Response.json({
      success: true,
    });
  } catch {
    return Response.json(
      {
        error:
          "Ошибка удаления",
      },
      {
        status: 500,
      }
    );
  }
}