import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        {
          error: "Нет ссылки",
        },
        {
          status: 400,
        }
      );
    }


    const clipId = url
      .split("/")
      .filter(Boolean)
      .pop();


    if (!clipId) {
      return NextResponse.json(
        {
          error: "Не удалось получить ID клипа",
        },
        {
          status: 400,
        }
      );
    }


    console.log("CLIP ID:", clipId);


    // получаем Twitch токен
    const tokenRes = await fetch(
      "https://id.twitch.tv/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id:
            process.env.TWITCH_CLIENT_ID!,
          client_secret:
            process.env.TWITCH_CLIENT_SECRET!,
          grant_type:
            "client_credentials",
        }),
      }
    );


    const token = await tokenRes.json();


    if (!token.access_token) {
      return NextResponse.json(
        {
          error: "Не получил Twitch токен",
          data: token,
        },
        {
          status: 500,
        }
      );
    }


    // получаем данные клипа
    const clipRes = await fetch(
      `https://api.twitch.tv/helix/clips?id=${clipId}`,
      {
        headers: {
          "Client-ID":
            process.env.TWITCH_CLIENT_ID!,
          Authorization:
            `Bearer ${token.access_token}`,
        },
      }
    );


    const clipData = await clipRes.json();


    console.log(
      "TWITCH RESPONSE:",
      clipData
    );


    if (!clipData.data?.length) {
      return NextResponse.json(
        {
          error: "Клип не найден",
          twitch: clipData,
          clipId,
        },
        {
          status: 404,
        }
      );
    }


    const clip = clipData.data[0];


    return NextResponse.json({
      id: clip.id,
      title: clip.title,
      thumbnail: clip.thumbnail_url,
      url: clip.url,
      creator: clip.creator_name,
    });


  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error: "Ошибка сервера",
      },
      {
        status: 500,
      }
    );
  }
}