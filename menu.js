module.exports = {
  name: "menu",

  run: async (sock, msg, args, config) => {
    const text = `
╭─❍ ${khursheed.galkala.bot}
│ Prefix: ${khursheed galkala}
│ Owner: ${+923096755353}
╰────────────

▰▰▰ COMMANDS ▰▰▰
.menu
.ping
.owner
`;

    await sock.sendMessage(msg.key.remoteJid, { text });
  }
};