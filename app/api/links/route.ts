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
    .order("position", {
      ascending: true,
    });


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


  const {
    title,
    subtitle,
    icon,
    url,
    position,
  } = body;


  if (!title || !url) {
    return Response.json(
      { error: "Заполни название и ссылку" },
      { status: 400 }
    );
  }


  const { data, error } = await supabase
    .from("links")
    .insert({
      title,
      subtitle: subtitle ?? "",
      icon: icon ?? "🔗",
      url,
      position: Number(position) || 0,
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
}




export async function PUT(request: Request) {

  if (!(await isAuthorized())) {
    return Response.json(
      { error: "Нет доступа" },
      { status: 401 }
    );
  }


  const body = await request.json();


  const {
    id,
    title,
    subtitle,
    icon,
    url,
    position,
  } = body;



  const { data, error } = await supabase
    .from("links")
    .update({
      title,
      subtitle: subtitle ?? "",
      icon: icon ?? "🔗",
      url,
      position: Number(position) || 0,
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
    .from("links")
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