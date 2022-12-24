import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import base from "./base";
const app = createApp(App);

app.use(router);
app.use(base);
app.mount("#app");
