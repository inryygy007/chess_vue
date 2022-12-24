const { rooms } = require("../managers/roomMgr")

module.exports = function leave(conn, ...args) {
    // 正在下棋中离开算输

    // 投降算输

    let roomId = conn.g_player.roomId;
    let room = rooms[roomId];

    if(room){
        for(let i in room['players']){
            room['players'][i].conn.sendText('c/leave');
        }

        delete rooms[roomId];
    }
}