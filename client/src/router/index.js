import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import HomeView from "../views/HomeView.vue";
import TheHall from "../components/TheHall.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: () => import("../layout/Layout.vue"),
      component: HomeView,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: HomeView,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/theHall",
      name: "theHall",
      component: TheHall,
    },
  ],
});

export default router;
