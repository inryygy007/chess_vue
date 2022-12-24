const Game = require("../game");
const { rooms } = require("../managers/roomMgr");


module.exports = function zhunbei(conn, ...args) {
    let roomId = conn.g_player.roomId;
    let accountId = conn.g_player.m_account_id;

    // accountId暂时不用
    rooms[roomId].zhunbeiFlag = true;

    //发送数据
    let t_room = rooms[roomId];
    let players = t_room['players'];

    let readyBefore = false;
    for (let p in players) {
        let player = players[p];
        if (player.zhunbeiFlag && player.accountId !== accountId) {
            readyBefore = true;
            break;
        }
    }
    //
    //自动准备一下, 只准备一个
    for (let p in players) {
        let player = players[p];
        if (player.accountId === accountId) {
            player.zhunbeiFlag = true;
            player.isRed = !readyBefore;
        }
    }

    //如果两人都准备好了, 开始发数据
    let two_ok = true;
    let cnt = 0;
    for (let p in players) {
        cnt++;
        if (!players[p].zhunbeiFlag) {
            two_ok = false;
            break;
        }
    }

    // two_ok = two_ok && cnt === 2;
    two_ok = two_ok && cnt === 2;

    if (two_ok) {
        // 两人个准备好了才开始准备数据
        //发一个简单的二维数组吧, 那么这个数据这就可以存放当前棋盘的状态, 每走一步, 都这样发给两人个客户端
        // 就实现了联网对战, 明白了吗, 因为你客户端已经有定义过数据, 所以服务就迁就一下客户端的格式

        //准备好是开始新的一局
        let newGame = new Game();
        newGame.initGame();
        rooms[roomId]["game"] = newGame;


        //同样的数据分别发给房间内的每个人
        for (let p in players) {
            let player = players[p];
            let conn = player.conn;
            //话说我们一定发字符串才行吗
            //那么也就是这个库要发字符串, 不代表其它库要发字符串
            // 同样, 我们做一个简单的客户端的路由
            // c 代表发给client 也就是客户端
            let camp = player.isRed ? 1 : -1;
            conn.sendText('c/qipan/' + rooms[roomId]["game"].toJSONString(player.isRed) + `@${camp}`);
        }
    }
}