const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const fs = require("fs");
const pino = require("pino");
const config = require("./config");

const prefix = config.prefix;

// load plugins
const plugins = new Map();

fs.readdirSync("./plugins").forEach(file => {
  const plugin = require(`./plugins/${file}`);
  plugins.set(plugin.name, plugin);
});

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" })
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      if (shouldReconnect) startBot();
    }

    if (connection === "open") {
      console.log("✅ Bot Connected Successfully");
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];

    if (!msg.message) return;

    const body =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    if (!body.startsWith(prefix)) return;

    const args = body.slice(prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();

    for (let plugin of plugins.values()) {
      if (plugin.name === cmd) {
        plugin.run(sock, msg, args);
      }
    }
  });
}

startBot();