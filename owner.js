module.exports = {
  name: "khursheed galkala",

  run: async (sock, msg, args, config) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: `👑 Owner Number:\n${+923096755353}`
    });
  }
};