import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const { PHONE_NUMBER_ID, BEARER_META_WPP_TOKEN } = process.env;

// const instance = axios.create({
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${BEARER_META_WPP_TOKEN}`,
//   },
// });

console.log(PHONE_NUMBER_ID, "AAAAAAAAAA");

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { from, to, message } = req.body;

    const params = {
      access_token: process.env.BEARER_META_WPP_TOKEN, // Your system user access token
      recipient_type: "individual",
      to: to,
      type: "text",
      text: {
        body: message,
      },
    };

    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(
        `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`,
        params
      );

      // Return the response data
      res.json(response.data);
    } catch (error) {
      // Handle any errors
      res.status(500).json(error);
    }

    // instance.post(
    //   `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`,
    //   {
    //     messaging_product: "whatsapp",
    //     recipient_type: "individual",
    //     to: router.query.number,
    //     type: "text",
    //     text: {
    //       preview_url: false,
    //       body: text,
    //     },
    //   }
    // );
  } else {
    // Handle any other HTTP method
  }
}
