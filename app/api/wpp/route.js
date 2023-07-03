import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  const { to, body } = await request.json();

  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.BEARER_META_WPP_TOKEN}`,
    },
  });

  try {
    const response = await instance.post(
      `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`,
      JSON.stringify({
        messaging_product: "whatsapp",
        to: to,
        type: "text",
        text: {
          preview_url: true,
          body: body,
        },
      })
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
