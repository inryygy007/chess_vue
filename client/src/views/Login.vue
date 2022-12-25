<script setup>
import { StepBackwardOutlined, UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { defineProps, ref, reactive, getCurrentInstance, computed } from "vue";
import { useRouter } from "vue-router";
// console.log(import.meta.env.VITE_BASIC_URL);
const router = useRouter();
// let account = ref("");
const formState = reactive({
  username: "",
  password: "",
  remember: true,
});
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});

const { proxy } = getCurrentInstance();
const info = () => {
  proxy.$message.info("This is a normal message");
};

const openNotification = () => {
  proxy.$notification.open({
    message: "Notification Title",
    description:
      "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

const contactSocket = () => {
  if (window.WebSocket) {
    console.log("进来了");
    const ws = new WebSocket("ws:127.0.0.1:8182");
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
        let data_arr = data_str.split("@");
        data_str = data_arr[0];
        let camp = parseInt(data_arr[1]);
        // 转换成JSON 对象
        let qipan_data = JSON.parse(data_str);
        // 那么这个 qipan_data 怎么发个其它界面呢?
        // 这里为了简单我就把它存成一个全局的了

        globalThis.g_qipan_data = qipan_data;
        globalThis.g_camp = camp;
        if (globalThis.beginGame) {
          globalThis.beginGame();
        }
      } else if (e.data.indexOf("c/zouzi/") !== -1) {
        let func = globalThis.zouzi_func;
        if (func) {
          func(e);
        }
      } else if (e.data.indexOf("c/loginok") !== -1) {
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
  router.push("theHall");
};
contactSocket();
</script>
<template>
  <div class="login-parent">
    <div class="login-child">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">记得我</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">忘记了密码</a>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            Log in
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>

  <!-- <div>
    <input type="text" v-model="account" />
    <button @click="login">登录</button>
  </div> -->
</template>

<style lang="scss" scoped>
.login-parent {
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;

  .login-child {
    max-width: 1280px;
    margin: 0 auto;
    text-align: center;
    .login-form {
      max-width: 300px;
    }
    .login-form-forgot {
      float: right;
    }
    .login-form-button {
      width: 100%;
    }
  }
}
</style>
