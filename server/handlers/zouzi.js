const { rooms } = require("../managers/roomMgr");

module.exports = function zouzi(conn, ...args) {
    let roomId = conn.g_player.roomId;
    let camp = parseInt(args[0]);
    let needMovePiece = args[1];
    let targetPos = args[2];

    let room = rooms[roomId];
    if (!room) {
        return;
    }
    let game = room["game"];
    let redCamp = camp === 1;

    let copy_needMovePiece = JSON.parse(needMovePiece);
    let copy_targetPos = JSON.parse(targetPos);
    copy_needMovePiece.position = game.fanxiang(copy_needMovePiece.position);
    copy_targetPos.position = game.fanxiang(copy_targetPos.position);

    copy_needMovePiece = JSON.stringify(copy_needMovePiece);
    copy_targetPos = JSON.stringify(copy_targetPos);

    let red_needMovePiece = null;
    let red_targetPos = null;
    let black_needMovePiece = null;
    let black_targetPos = null;
    if (redCamp) {
        red_needMovePiece = needMovePiece;
        red_targetPos = targetPos;

        black_needMovePiece = copy_needMovePiece;
        black_targetPos = copy_targetPos;
    } else {
        red_needMovePiece = copy_needMovePiece;
        red_targetPos = copy_targetPos;

        black_needMovePiece = needMovePiece;
        black_targetPos = targetPos;
    }

    // 服务器也不干别的, 把收到的数据 发给房间里的两人个玩家
    let players = room['players'];
    for (let p in players) {
        let player = players[p];
        let conn = player.conn;
        let isRed = player.isRed;
        let n = isRed ? red_needMovePiece : black_needMovePiece;
        let t = isRed ? red_targetPos : black_targetPos;
        conn.sendText(`c/zouzi/${n}@${t}@${camp}`);
    }
}