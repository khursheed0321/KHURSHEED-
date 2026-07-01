const fs = require("fs");
const path = require("path");

function loadPlugins() {
    const plugins = new Map();

    const dir = path.join(__dirname, "..", "plugins");

    if (!fs.existsSync(dir)) return plugins;

    const files = fs.readdirSync(dir).filter(file => file.endsWith(".js"));

    for (const file of files) {
        try {
            delete require.cache[require.resolve(path.join(dir, file))];

            const plugin = require(path.join(dir, file));

            if (plugin.name && typeof plugin.run === "function") {
                plugins.set(plugin.name.toLowerCase(), plugin);
            }

        } catch (err) {
            console.log("Plugin Error:", file);
            console.log(err);
        }
    }

    return plugins;
}

module.exports = loadPlugins;