<script setup>
import Index from "../pages/Index.vue";
const contactSocket = () => {
  if (window.WebSocket) {
    console.log('进来了');
    const ws = new WebSocket("ws:127.0.0.1:8181");
    //路由定义
    const Router_QiPan = 'c/qipan/';
    ws.onopen=function(){
      console.log('链接服务器成功');
      //这个id 为了简单可以让服务器进行自增
      //声明一个auto
      ws.send('/join/1:auto');//那这里怎么区分这两个玩家呢?
      //那么在什么时候准备呢?
      //理论上是我们界面上有个准备按钮, 点了按钮就准备
      //这里简化一下, 比较5秒后自动准备
      //这里强行等了5秒, 服务器数据还没下来呢, 就开始创建界面了
      //这是不对的, 所以我让创建界面在拿到数据之后
      //怎么做呢?
      setTimeout(()=>{
        ws.send('/zhunbei/1');
      }, 5 * 1000);
    }
    ws.onmessage=function(e){
      if(e.data.indexOf(Router_QiPan) !== -1){
        // 发送过来的是棋盘的数据, 
        let data_str = e.data.substring(Router_QiPan.length)
        // 转换成JSON 对象
        let qipan_data = JSON.parse(data_str);
        // 那么这个 qipan_data 怎么发个其它界面呢?
        // 这里为了简单我就把它存成一个全局的了
       
        globalThis.g_qipan_data = qipan_data;
        console.log("set g_qipan_data", globalThis.g_qipan_data);
      }

    }
    ws.onclose=function(){
      console.log('链接关闭');
    }
  }else{
    console.log('当前浏览器不支持');
  }
};
contactSocket()
</script>

<template>
  <main>
    <Index />
  </main>
</template>
