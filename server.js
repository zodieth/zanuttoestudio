const { createServer } = require("http");
const { parse } = require("url");
const { Client, LocalAuth, LegacySessionAuth } =require('whatsapp-web.js');
const next = require("next");
const qrcode = require('qrcode-terminal')

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Set CORS headers
      res.setHeader(
        "Access-Control-Allow-Origin",
        "https://www.estudiozanutto.com.ar"
      ); // Replace with your allowed origin
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Specify allowed methods
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      ); // Specify allowed headers

      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

const client = new Client({
  puppeteer:{
    args:['--no-sandbox'],
    headless:true,
  },
  authStrategy: new LocalAuth({
    clientId: "ID_CLIENTE"
  })
});

client.on('qr', qr => {
  console.log("QR Received", qr);
  qrcode.generate(qr, {small:true});
});

client.on('ready',() => {
  console.log('Client is ready!');
});

async function getAllChats( client ) {
  try {
    const chats = await client.getChats();
console.log(chats)
  } catch (e) {
    console.error(e)
  }
}

client.on('message', message => {
  getAllChats(client)
	//console.log(message);
});

client.initialize();