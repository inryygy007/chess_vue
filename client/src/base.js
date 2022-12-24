import { message, notification } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
import "ant-design-vue/es/notification/style/css";

export default {
  install(app) {
    // 挂载全局对象
    app.config.globalProperties.$message = message;
    app.config.globalProperties.$notification = notification;
  },
};
