function runtime(seconds) {

    seconds = Number(seconds);

    const d = Math.floor(seconds / (3600 * 24));

    const h = Math.floor(seconds % (3600 * 24) / 3600);

    const m = Math.floor(seconds % 3600 / 60);

    const s = Math.floor(seconds % 60);

    return `${d}d ${h}h ${m}m ${s}s`;

}

function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

function isOwner(+923096755353) {

    return number.includes(khursheed galkala);

}

function pickRandom(arr) {

    return arr[Math.floor(Math.random() * arr.length)];

}

module.exports = {
    runtime,
    sleep,
    isOwner,
    pickRandom
};