import { NextResponse } from "next/server";

const TWITCH_LOGIN = "skufixaa";

export async function GET() {
  try {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        {
          live: false,
          followers: 0,
          error: "Не настроены Twitch ключи",
        },
        {
          status: 500,
        }
      );
    }

    const tokenResponse = await fetch(
      "https://id.twitch.tv/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "client_credentials",
        }),
        cache: "no-store",
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      return NextResponse.json(
        {
          live: false,
          followers: 0,
          error: "Не удалось получить Twitch-токен",
        },
        {
          status: 500,
        }
      );
    }

    const headers = {
      "Client-ID": clientId,
      Authorization: `Bearer ${tokenData.access_token}`,
    };

    const userResponse = await fetch(
      `https://api.twitch.tv/helix/users?login=${TWITCH_LOGIN}`,
      {
        headers,
        cache: "no-store",
      }
    );

    const userData = await userResponse.json();
    const user = userData.data?.[0];

    if (!userResponse.ok || !user) {
      return NextResponse.json(
        {
          live: false,
          followers: 0,
          error: "Twitch-канал не найден",
        },
        {
          status: 404,
        }
      );
    }

    const [streamResponse, followersResponse] = await Promise.all([
      fetch(
        `https://api.twitch.tv/helix/streams?user_id=${user.id}`,
        {
          headers,
          cache: "no-store",
        }
      ),

      fetch(
        `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${user.id}&first=1`,
        {
          headers,
          cache: "no-store",
        }
      ),
    ]);

    const streamData = await streamResponse.json();
    const followersData = await followersResponse.json();

    return NextResponse.json({
      live: Array.isArray(streamData.data) && streamData.data.length > 0,
      followers:
        typeof followersData.total === "number"
          ? followersData.total
          : 0,
      displayName: user.display_name,
      profileImage: user.profile_image_url,
    });
  } catch (error) {
    console.error("TWITCH STATUS ERROR:", error);

    return NextResponse.json(
      {
        live: false,
        followers: 0,
        error: "Ошибка получения данных Twitch",
      },
      {
        status: 500,
      }
    );
  }
}