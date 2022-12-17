var ws = require("nodejs-websocket");
const Game = require("./game")
const Piece = require("./piecc");
var g_conn = null;//这个不能为全局对象, 每加进来一个人就会创建一个这样的conn对象, 我们之后要用这个conn对象跟前端通信
var rooms = {};
var g_playerId = 0;

let piece = new Piece("j1", [1, 1], 1);
let t_game = new Game();
t_game.initGame();

let a = 100;

function hello(){
  g_conn.sendText("i am good");
}

function join(roomId, accountId, conn){
  rooms[roomId] = rooms[roomId] || {};
  // 存放玩家
  rooms[roomId]['players'] = rooms[roomId]['players'] || {};
  //初始化为准备状态false 
  // 这个准备状态应该放在玩家身上
  // 每个人都可以单独准备或者不准备
  if(!rooms[roomId]['players'][accountId]){
    rooms[roomId]['players'][accountId] = {
      accountId: accountId,
      conn: conn,
      zhunbeiFlag: false,
    }
  }
}

function zhunbei(roomId, accountId){
  // accountId暂时不用
  rooms[roomId].zhunbeiFlag = true;

  //发送数据
  let t_room = rooms[roomId];
  let players = t_room['players'];

  let readyBefore = false;
  for(let p in players){
    let player = players[p];
    if(player.zhunbeiFlag && player.accountId !== accountId){
      readyBefore = true;
      break;
    }
  }
  //
  //自动准备一下, 只准备一个
  for(let p in players){
    let player = players[p];
    if(player.accountId === accountId){
      player.zhunbeiFlag = true;
      player.isRed = !readyBefore;
    }
  }

  //如果两人都准备好了, 开始发数据
  let two_ok = true;
  let cnt = 0;
  for(let p in players){
    cnt++;
    if(!players[p].zhunbeiFlag){
      two_ok = false;
      break;
    }
  }

  // two_ok = two_ok && cnt === 2;
  two_ok = two_ok && cnt === 2;

  if(two_ok){
    // 两人个准备好了才开始准备数据
     //发一个简单的二维数组吧, 那么这个数据这就可以存放当前棋盘的状态, 每走一步, 都这样发给两人个客户端
     // 就实现了联网对战, 明白了吗, 因为你客户端已经有定义过数据, 所以服务就迁就一下客户端的格式

    //准备好是开始新的一局
    let newGame = new Game();
    newGame.initGame();
    rooms[roomId]["game"] = newGame;


    //同样的数据分别发给房间内的每个人
    for(let p in players){
      let player = players[p];
      let conn = player.conn;
      //话说我们一定发字符串才行吗
      //那么也就是这个库要发字符串, 不代表其它库要发字符串
      // 同样, 我们做一个简单的客户端的路由
      // c 代表发给client 也就是客户端
      let camp = player.isRed ? 1 : -1;
      conn.sendText('c/qipan/' + rooms[roomId]["game"].toJSONString(player.isRed) +`@${camp}`);
    }
  }
  
}

function zouzi(roomId, camp, needMovePiece, targetPos){
  let room = rooms[roomId];
  if(!room){
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
  if(redCamp){
    red_needMovePiece = needMovePiece;
    red_targetPos = targetPos;
    
    black_needMovePiece = copy_needMovePiece;
    black_targetPos = copy_targetPos;
  }else{
    red_needMovePiece = copy_needMovePiece;
    red_targetPos = copy_targetPos;

    black_needMovePiece = needMovePiece;
    black_targetPos = targetPos;
  }

  // 服务器也不干别的, 把收到的数据 发给房间里的两人个玩家
  let players = room['players'];
  for(let p in players){
    let player = players[p];
    let conn = player.conn;
    let isRed = player.isRed;
    let n = isRed? red_needMovePiece : black_needMovePiece;
    let t = isRed? red_targetPos : black_targetPos;
    conn.sendText(`c/zouzi/${n}@${t}@${camp}`);
  }
}

//接下来把棋局的数据发给两个客户端就行了
const Join_Rote = '/join/';
const Zhunbei_Rote = '/zhunbei/';
const Zouzi_Rote = '/zouzi/';
const Login_Rote = '/login/';

// Scream server example: "hi" -> "HI!!!"
ws.createServer(function (conn) {
  g_conn = conn;
  //收到客户端数据的回调方法
  conn.on("text", function (data) {
    // 把客户端发送过来的信息在发回去
    if(data === 'hello'){
      hello();
    }else if(data.indexOf('/join/') !== -1 ){
      let substr = data.substring('/join/'.length);
      let sub_arr = substr.split(":");
      let room_id = sub_arr[0];
      conn.room_id = room_id;
      let account_id = conn.playerId;
      join(room_id, account_id, conn);
    }else if(data.indexOf(Zhunbei_Rote) !== -1 ){
      zhunbei(conn.room_id, conn.playerId);
    }else if(data.indexOf(Zouzi_Rote) !== -1 ){
      //这里因为json 用了:, 所以不能用这个来划分 
      let substr = data.substring(Zouzi_Rote.length);
      let sub_arr = substr.split("@");
      let room_id = conn.room_id;
      let camp = sub_arr[0];
      let needMovePiece = sub_arr[1];
      let targetPiece = sub_arr[2];

      // zhunbei(room_id);
      zouzi(room_id, parseInt(camp), needMovePiece, targetPiece);
      let a = 100;
    }else if(data.indexOf(Login_Rote) !== -1 ){
      let substr = data.substring(Zouzi_Rote.length);
      let sub_arr = substr.split("@");
      let id = sub_arr[0];
      // 必须要先login
      conn.playerId = id;
      conn.sendText('c/loginok');
    }
  });
  // 关闭服务器的回调方法
  conn.on("close", function (e) {
    console.log(e, "服务端链接关闭");
    let roomId = conn.room_id;
    delete rooms[roomId];
  });
  conn.on("error", function (e) {
    console.log("服务端异常");
  });
}).listen(8181, () => {
  console.log("启动成功");
});
