const fs = require("fs");

const file = "./database.json";

function loadDB() {

    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify({}, null, 2));
    }

    return JSON.parse(fs.readFileSync(file));
}

function saveDB(data) {

    fs.writeFileSync(
        file,
        JSON.stringify(data, null, 2)
    );

}

module.exports = {
    loadDB,
    saveDB
};