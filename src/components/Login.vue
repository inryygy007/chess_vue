<template>
  <div>
    <input type="text" v-model="account" />
    <button @click="login">登录</button>
  </div>
</template>
<script setup>
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router"
defineProps({});


const router = useRouter()
let account = ref("");
const contactSocket = () => {
  if (window.WebSocket) {
    console.log("进来了");
    const ws = new WebSocket("ws:127.0.0.1:8181");
    //简单起见 这个ws 存成全局
    globalThis.g_ws = ws;
    //路由定义
    const Router_QiPan = "c/qipan/";
    ws.onopen = function () {
      console.log("链接服务器成功");
      //ws.send(`/login/${account.value}`);
    };
    ws.onmessage = function (e) {
      if (e.data.indexOf(Router_QiPan) !== -1) {
        // 发送过来的是棋盘的数据,
        let data_str = e.data.substring(Router_QiPan.length);
        let data_arr = data_str.split('@');
        data_str = data_arr[0];
        let camp = parseInt(data_arr[1]);
        // 转换成JSON 对象
        let qipan_data = JSON.parse(data_str);
        // 那么这个 qipan_data 怎么发个其它界面呢?
        // 这里为了简单我就把它存成一个全局的了

        globalThis.g_qipan_data = qipan_data;
        globalThis.g_camp = camp;
        if(globalThis.beginGame){
          globalThis.beginGame();
        }
      } else if (e.data.indexOf("c/zouzi/") !== -1) {
        let func = globalThis.zouzi_func;
        if (func) {
          func(e);
        }
      } else if (e.data.indexOf("c/loginok") !== -1){
        // 切到选房间的页面
      }
    };
    
    ws.onclose = function () {
      console.log("链接关闭");
    };
  } else {
    console.log("当前浏览器不支持");
  }
};
const login = () => {
  // contactSocket()
  globalThis.g_ws.send(`/login/${account.value}`);
  // account.value('');//这一行报错了
  router.push('theHall')
};
contactSocket();
</script>
<style scoped></style>
