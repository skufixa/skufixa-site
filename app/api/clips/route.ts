import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("clips")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return NextResponse.json({
      error: error.message,
    });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { title, url } = body;

  if (!title || !url) {
    return NextResponse.json(
      {
        error: "Заполните все поля",
      },
      {
        status: 400,
      }
    );
  }

  const { data, error } = await supabase
    .from("clips")
    .insert([
      {
        title,
        url,
      },
    ])
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
}

export async function DELETE(req: Request) {
  const body = await req.json();

  const { id } = body;

  const { error } = await supabase
    .from("clips")
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
}