var ws = require("nodejs-websocket");
const join = require("./handlers/join");
const leave = require("./handlers/leave");
const login = require("./handlers/login");
const zhunbei = require("./handlers/zhunbei");
const zouzi = require("./handlers/zouzi");
const { rooms } = require("./managers/roomMgr");
const listenPort = 8182;

const RouteHandler = {
  '/login/': login,
  '/join/': join,
  '/zhunbei/': zhunbei,
  '/zouzi/': zouzi,
  '/leave/': leave
}


// Scream server example: "hi" -> "HI!!!"
ws.createServer(function (conn) {
  //收到客户端数据的回调方法
  conn.on("text", async function (data) {
    let r1 = /\/\w+\//;
    let m = data.match(r1);
    if (m) {
      let router = m[0];
      let substr = data.substring(router.length);
      let sub_arr = substr.split("@");
      RouteHandler[router](conn, ...sub_arr);
      return;
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
}).listen(listenPort, () => {
  console.log(`启动成功, 端口号${listenPort}`);
});
