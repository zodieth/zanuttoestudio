import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { to } = req.body;

  console.log(to, "aaaaaaaaaaaaaaa");

  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${process.env.BEARER_META_WPP_TOKEN}`,
    },
  });

  try {
    const response = await fetch(
      `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BEARER_META_WPP_TOKEN}`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: to,
          type: "template",
          template: {
            name: "hello_world",
            language: {
              code: "en_US",
            },
          },
        }),
      }
    );

    // const response = await instance.post(
    //   `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`,
    //   JSON.stringify({
    //     messaging_product: "whatsapp",
    //     to: to,
    //     type: "template",
    //     template: {
    //       name: "hello_world",
    //       language: {
    //         code: "en_US",
    //       },
    //     },
    //   })
    // );

    res.json(response);
  } catch (error) {
    res.status(500).send(error);
  }
}
