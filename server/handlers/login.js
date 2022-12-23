const player = require("../player");


module.exports = async function login(conn, ...args) {
    let id = args[0];
    let p = new player();
    conn.g_player = p;
    p.bind_socket(conn);
    await p.bind_db(id);

    conn.sendText('c/loginok');
}