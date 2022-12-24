const { rooms } = require("../managers/roomMgr");

module.exports = function join(conn, ...args) {
    let roomId = args[0];
    let p = conn.g_player;
    p.roomId = roomId;
    let accountId = conn.g_player.m_account_id;

    rooms[roomId] = rooms[roomId] || {};
    // 存放玩家
    rooms[roomId]['players'] = rooms[roomId]['players'] || {};
    //初始化为准备状态false 
    // 这个准备状态应该放在玩家身上
    // 每个人都可以单独准备或者不准备
    if (!rooms[roomId]['players'][accountId]) {
        rooms[roomId]['players'][accountId] = {
            accountId: accountId,
            conn: conn,
            zhunbeiFlag: false,
        }
    }
}